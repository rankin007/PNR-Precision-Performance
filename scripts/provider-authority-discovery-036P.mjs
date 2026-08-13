import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";

export const SOURCE = "bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570";
export const MANAGER_PATH = "components/ops/test-evidence-manager.tsx";
export const MANAGER_BLOB = "65d74be5a3f701ae9133bf353348b3253f36feef";
export const CLASSES = Object.freeze([
  "SUPABASE_SERVICE_ROLE_KEY",
  "CRON_SECRET",
  "ENQUIRY_ABUSE_HMAC_SECRET",
  "PUBLIC_ENQUIRY_SMTP_PASS",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RAILWAY_API_TOKEN",
]);

const MAX_FILES = 5000;
const MAX_FILE_BYTES = 1024 * 1024;
const MAX_TOTAL_BYTES = 24 * 1024 * 1024;
const ALLOWED_ROOT = /^(?:app|components|lib|supabase\/(?:functions|migrations))\//;
const ROOT_FILE = /^(?:middleware\.[cm]?[jt]sx?|vercel\.json)$/i;
const CODE_FILE = /\.(?:[cm]?[jt]sx?|json|sql)$/i;
const TEST_DIRECTORY = /(^|\/)(?:tests?|__tests__)(\/|$)/i;
const TEST_SUFFIX = /\.(?:test|spec)\.[cm]?[jt]sx?$/i;
const EXTENSIONS = Object.freeze(["", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", "/index.ts", "/index.tsx", "/index.js"]);
const GRAPH_BRAND = new WeakSet();

export class Discovery036PError extends Error {
  constructor(code, context) {
    super(code);
    this.code = code;
    if (context) this.context = Object.freeze(context);
  }
}

const fail = (code, context) => { throw new Discovery036PError(code, context); };
const git = (run, args, encoding = null) => {
  try {
    return run("git", args, { encoding, stdio: ["ignore", "pipe", "ignore"], maxBuffer: 32 * 1024 * 1024 });
  } catch {
    fail("SOURCE_GIT_REFUSED");
  }
};

export function isConventionalTestPath(file) {
  return TEST_DIRECTORY.test(file) || TEST_SUFFIX.test(file);
}

export function isAdmittedSourcePath(file) {
  return CODE_FILE.test(file) && !isConventionalTestPath(file) && (ALLOWED_ROOT.test(file) || ROOT_FILE.test(file));
}

function parseTree(raw) {
  const fields = Buffer.isBuffer(raw) ? raw.toString("utf8").split("\0") : String(raw).split("\0");
  const rows = [];
  for (const field of fields) {
    if (!field) continue;
    const match = /^(\d{6}) (blob|tree) ([0-9a-f]{40})\t(.+)$/.exec(field);
    if (!match) fail("SOURCE_TREE_PARSE_REFUSED");
    if (match[2] !== "blob") continue;
    rows.push(Object.freeze({ mode: match[1], blob: match[3], path: match[4].replaceAll("\\", "/") }));
  }
  if (rows.length > MAX_FILES) fail("SOURCE_FILE_CEILING_REFUSED");
  return rows;
}

function importSpecifiers(text) {
  const result = new Set();
  const patterns = [
    /(?:import|export)\s+(?:[^"']*?\s+from\s*)?["']([^"']+)["']/g,
    /import\(\s*["']([^"']+)["']\s*\)/g,
    /require\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const expression of patterns) {
    for (const match of text.matchAll(expression)) {
      const local = match[1].startsWith("./") || match[1].startsWith("../") || match[1].startsWith("@/");
      const extension = path.posix.extname(match[1]);
      if (local && (!extension || /\.(?:[cm]?[jt]sx?|json)$/i.test(extension))) result.add(match[1]);
    }
  }
  return [...result];
}

function resolveImport(from, specifier, files) {
  const base = specifier.startsWith("@/")
    ? specifier.slice(2)
    : path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
  const matches = EXTENSIONS.map((suffix) => `${base}${suffix}`).filter((candidate) => files.has(candidate));
  if (matches.length > 1) fail("SOURCE_IMPORT_AMBIGUOUS", { from, specifier, candidates: Object.freeze(matches) });
  return matches[0] ?? null;
}

function secretUse(text, className) {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const exact = new RegExp(`process\\.env(?:\\.${escaped}|\\[["']${escaped}["']\\])`);
  return { exact: exact.test(text), dynamic: /process\.env\s*\[[^"'][^\]]*\]/.test(text) };
}

function clientModule(text) {
  return /^\s*["']use client["'];?/m.test(text);
}

export function buildAcceptedSourceGraph(run = execFileSync) {
  const tree = parseTree(git(run, ["ls-tree", "-r", "-z", "--full-tree", SOURCE]));
  const accepted = tree.filter((entry) => isAdmittedSourcePath(entry.path)).sort((a, b) => a.path.localeCompare(b.path));
  const byPath = new Map(accepted.map((entry) => [entry.path, entry]));
  const content = new Map();
  let totalBytes = 0;
  for (const entry of accepted) {
    const bytes = Buffer.from(git(run, ["cat-file", "blob", entry.blob]));
    if (bytes.length > MAX_FILE_BYTES) fail("SOURCE_FILE_BYTES_REFUSED", { path: entry.path });
    totalBytes += bytes.length;
    if (totalBytes > MAX_TOTAL_BYTES) fail("SOURCE_TOTAL_BYTES_REFUSED");
    content.set(entry.path, bytes.toString("utf8"));
  }
  const manager = byPath.get(MANAGER_PATH);
  if (!manager || manager.mode !== "100644" || manager.blob !== MANAGER_BLOB) fail("SOURCE_MANAGER_REFUSED");

  const files = new Set(byPath.keys());
  const reverse = new Map([...files].map((file) => [file, []]));
  const edges = [];
  const unresolved = [];
  for (const file of files) {
    for (const specifier of importSpecifiers(content.get(file))) {
      const target = resolveImport(file, specifier, files);
      if (!target) {
        unresolved.push(Object.freeze({ from: file, specifier }));
        continue;
      }
      edges.push(Object.freeze({ from: file, to: target }));
      reverse.get(target).push(file);
    }
  }

  const classes = CLASSES.map((className) => {
    const roots = [];
    let dynamic = false;
    for (const file of files) {
      const use = secretUse(content.get(file), className);
      if (use.exact) {
        if (clientModule(content.get(file))) fail("CLIENT_SECRET_REFUSED", { className, file });
        roots.push(file);
      }
      dynamic ||= use.dynamic;
    }
    const visited = new Set(roots);
    const queue = [...roots];
    while (queue.length) {
      for (const dependent of reverse.get(queue.shift()) ?? []) {
        if (!visited.has(dependent)) {
          visited.add(dependent);
          queue.push(dependent);
        }
      }
    }
    return Object.freeze({
      class: className,
      roots: Object.freeze([...roots].sort()),
      consumers: Object.freeze([...visited].sort()),
      sourceExcluded: roots.length === 0,
      dynamicEnvironment: dynamic,
      complete: !dynamic && unresolved.length === 0,
    });
  });

  const canonical = {
    source: SOURCE,
    files: accepted.map(({ path: file, mode, blob }) => ({ path: file, mode, blob })),
    edges,
    unresolved,
    classes,
  };
  const graph = Object.freeze({
    source: SOURCE,
    fileCount: accepted.length,
    totalBytes,
    manager: Object.freeze({ path: MANAGER_PATH, mode: manager.mode, blob: manager.blob }),
    edges: Object.freeze(edges),
    unresolved: Object.freeze(unresolved),
    classes: Object.freeze(classes),
    complete: unresolved.length === 0 && classes.every((row) => row.complete),
    graphHash: createHash("sha256").update(JSON.stringify(canonical)).digest("hex"),
  });
  GRAPH_BRAND.add(graph);
  return graph;
}

export function assertAcceptedSourceGraph(graph) {
  if (!GRAPH_BRAND.has(graph) || graph.source !== SOURCE || graph.manager.blob !== MANAGER_BLOB) fail("SOURCE_GRAPH_AUTHORITY_REFUSED");
  return graph;
}

export function sourceClassMap(graph) {
  assertAcceptedSourceGraph(graph);
  return Object.freeze(Object.fromEntries(graph.classes.map((row) => [row.class, row])));
}
