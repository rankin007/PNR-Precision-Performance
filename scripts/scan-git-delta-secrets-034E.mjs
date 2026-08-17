#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const MAX_BUFFER = 128 * 1024 * 1024;
const ZERO_OID = /^0+$/;
const REGULAR_MODES = new Set(["100644", "100755"]);

const DIRECT_PATTERNS = [
  ["private-key", /-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----/g],
  ["github-token", /\bgh[opusr]_[A-Za-z0-9]{20,}\b/g],
  ["gitlab-token", /\bglpat-[A-Za-z0-9_-]{20,}\b/g],
  ["slack-token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  ["aws-access-key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ["stripe-secret", /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["provider-token", /\b(?:vercel_pat_|sk-proj-)[A-Za-z0-9_-]{16,}\b/g],
  ["database-credential-url", /\b(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?):\/\/[^\s:/@]+:[^\s/@]+@[^\s/]+/gi],
  ["github-fine-grained-token", /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g],
  ["supabase-secret", /\b(?:sb_secret_|sbp_)[A-Za-z0-9._-]{16,}\b/g],
  ["resend-token", /\bre_[A-Za-z0-9]{20,}\b/g],
  ["stripe-webhook-secret", /\bwhsec_[A-Za-z0-9]{16,}\b/g],
  ["stripe-restricted-secret", /\brk_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["service-jwt", /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{16,}\b/g],
];

const RETAINED_SYNTHETIC_FIXTURE_FINDINGS = new Map([
  ["scripts/test-operational-readiness-033B.mjs\0" + "8eca4fa4348da043d2475d9e39bb90de96834950", new Set(["aws-access-key", "private-key"])],
  ["scripts/test-prelaunch-readiness-036K.mjs\0" + "bf380bd322efba4576012c84014f7e13ec7b0f41", new Set(["aws-access-key", "private-key"])],
]);

function stop(category, code = 1) {
  console.error(`SCAN_ERROR category=${category}`);
  process.exit(code);
}

function runGit(args, binary = false) {
  const result = spawnSync("git", args, {
    encoding: binary ? null : "utf8",
    maxBuffer: MAX_BUFFER,
    windowsHide: true,
  });
  if (result.error || result.status !== 0) stop("git-enumeration");
  return result.stdout;
}

function resolveCommit(revision) {
  const resolved = runGit(["rev-parse", "--verify", "--end-of-options", `${revision}^{commit}`]).trim();
  if (!/^[0-9a-f]{40}$/i.test(resolved)) stop("invalid-commit");
  return resolved.toLowerCase();
}

function rawEntries(args, commit = null) {
  const raw = runGit(args);
  const tokens = raw.split("\0");
  const entries = [];
  for (let index = 0; index < tokens.length; ) {
    const metadata = tokens[index++];
    if (!metadata) continue;
    const path = tokens[index++];
    if (path === undefined || path === "") stop("malformed-git-diff");
    const match = metadata.match(/^:(\d{6}) (\d{6}) ([0-9a-f]{40}) ([0-9a-f]{40}) ([A-Z])(?:\d+)?$/i);
    if (!match) stop("malformed-git-diff");
    entries.push({
      oldMode: match[1],
      newMode: match[2],
      oldOid: match[3].toLowerCase(),
      newOid: match[4].toLowerCase(),
      status: match[5].toUpperCase(),
      path: path.replaceAll("\\", "/"),
      commit,
    });
  }
  return entries;
}

function enumerateRange(baseInput, headInput) {
  const base = resolveCommit(baseInput);
  const head = resolveCommit(headInput);
  const ancestry = spawnSync("git", ["merge-base", "--is-ancestor", base, head], { windowsHide: true });
  if (ancestry.error || ancestry.status !== 0) stop("non-ancestral-range");
  const commits = runGit(["rev-list", "--reverse", `${base}..${head}`]).trim().split(/\r?\n/).filter(Boolean);
  const entries = [];
  for (const commit of commits) {
    const lineage = runGit(["rev-list", "--parents", "-n", "1", commit]).trim().split(/\s+/);
    if (lineage.length !== 2) stop("non-linear-range");
    entries.push(...rawEntries([
      "diff", "--raw", "--full-index", "--abbrev=40", "--no-renames", "-z", lineage[1], commit, "--",
    ], commit));
  }
  return { mode: "range", base, head, commits: commits.length, entries };
}

function enumerateStaged() {
  resolveCommit("HEAD");
  return {
    mode: "staged",
    commits: 0,
    entries: rawEntries(["diff", "--cached", "--raw", "--full-index", "--abbrev=40", "--no-renames", "-z", "--"]),
  };
}

function protectedFilename(path) {
  const basename = path.split("/").at(-1).toLowerCase();
  if (basename === ".env" || (basename.startsWith(".env.") && !/^\.env\.(?:example|sample|template)$/.test(basename))) {
    return "protected-env-file";
  }
  if (/^(?:credentials?|service-account(?:-key)?|token)\.json$/i.test(basename)) return "protected-credential-file";
  if (/^(?:id_rsa|id_ed25519)$/i.test(basename) || /\.(?:key|pem|p12|pfx)$/i.test(basename)) return "protected-key-file";
  return null;
}

function textFindings(text) {
  const findings = new Set();
  for (const [category, pattern] of DIRECT_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) findings.add(category);
  }
  return findings;
}

function allowedSyntheticFindings(path, oid) {
  return RETAINED_SYNTHETIC_FIXTURE_FINDINGS.get(`${path}\0${oid}`) ?? new Set();
}

function imageKind(bytes) {
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  return null;
}

function decodeText(bytes) {
  if (bytes.includes(0)) return null;
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
  let controls = 0;
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if ((code < 0x20 && code !== 0x09 && code !== 0x0a && code !== 0x0d) || code === 0x7f) controls += 1;
  }
  if (text.length > 0 && controls / text.length > 0.02) return null;
  return text;
}

function safePath(path) {
  return path.replace(/[\u0000-\u001f\u007f]/g, "?");
}

function inspect(selection) {
  const totals = {
    entries: selection.entries.length,
    blobs: 0,
    text: 0,
    expectedImages: 0,
    deletions: 0,
  };
  const findings = [];

  for (const entry of selection.entries) {
    if (entry.status === "D" || ZERO_OID.test(entry.newOid)) {
      totals.deletions += 1;
      continue;
    }
    if (!["A", "M", "T"].includes(entry.status)) {
      findings.push([entry.path, "unsupported-git-status"]);
      continue;
    }
    if (!REGULAR_MODES.has(entry.newMode)) {
      findings.push([entry.path, "unsupported-git-mode"]);
      continue;
    }

    const bytes = runGit(["cat-file", "blob", entry.newOid], true);
    totals.blobs += 1;
    const image = imageKind(bytes);
    if (image) {
      const expectedExtension = image === "png" ? /\.png$/i : /\.jpe?g$/i;
      if (entry.newMode === "100644" && entry.path.startsWith("evidence/") && expectedExtension.test(entry.path)) {
        totals.expectedImages += 1;
      } else {
        findings.push([entry.path, entry.newMode === "100755" ? "executable-binary" : "unexpected-image-binary"]);
      }
      continue;
    }

    const text = decodeText(bytes);
    if (text === null) {
      findings.push([entry.path, entry.newMode === "100755" ? "executable-binary" : "unknown-binary"]);
      continue;
    }
    totals.text += 1;

    const protectedCategory = protectedFilename(entry.path);
    if (protectedCategory) findings.push([entry.path, protectedCategory]);
    const allowedCategories = allowedSyntheticFindings(entry.path, entry.newOid);
    for (const category of textFindings(text)) {
      if (!allowedCategories.has(category)) findings.push([entry.path, category]);
    }
  }

  const unique = [...new Map(findings.map(([path, category]) => [`${path}\0${category}`, [path, category]])).values()]
    .sort(([leftPath, leftCategory], [rightPath, rightCategory]) => leftPath.localeCompare(rightPath) || leftCategory.localeCompare(rightCategory));

  console.log([
    "SCAN_SUMMARY",
    `mode=${selection.mode}`,
    `commits=${selection.commits}`,
    `entries=${totals.entries}`,
    `blobs=${totals.blobs}`,
    `text=${totals.text}`,
    `expected_images=${totals.expectedImages}`,
    `deletions=${totals.deletions}`,
    `findings=${unique.length}`,
  ].join(" "));
  for (const [path, category] of unique) console.error(`SCAN_FINDING path=${safePath(path)} category=${category}`);
  if (unique.length > 0) process.exitCode = 2;
}

const args = process.argv.slice(2);
if (args.length === 3 && args[0] === "--range") {
  inspect(enumerateRange(args[1], args[2]));
} else if (args.length === 1 && args[0] === "--staged") {
  inspect(enumerateStaged());
} else {
  stop("invalid-invocation");
}
