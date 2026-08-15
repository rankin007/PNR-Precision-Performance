#!/usr/bin/env node

import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import {
  ACCEPTED_ALIASES,
  ACCEPTED_BINDING_CLASSES,
  ACCEPTED_DEPLOYMENT,
  ACCEPTED_SOURCE,
  CREDENTIAL_CLASSES,
  assertPrivacySafe,
  sanitizeFailure,
  validateMechanismRows,
  validateProductionIdentity,
} from "./prelaunch-readiness-036K.mjs";

const MODES = new Set(["self-test", "capability-gate"]);

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

export function runCaptured({ command, args, input = null, maxBytes = 1024 * 1024 }) {
  if (!command || !Array.isArray(args) || args.some((value) => typeof value !== "string")) fail("PRIVACY_REFUSED");
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const child = spawn(command, args, { shell: false, windowsHide: true, stdio: ["pipe", "pipe", "pipe"] });
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    const append = (target, chunk) => {
      if (target === "stdout") stdout += chunk;
      else stderr += chunk;
      if (Buffer.byteLength(stdout) + Buffer.byteLength(stderr) > maxBytes) child.kill();
    };
    child.stdout.on("data", (chunk) => append("stdout", chunk));
    child.stderr.on("data", (chunk) => append("stderr", chunk));
    child.on("error", () => reject(Object.assign(new Error("UNEXPECTED"), { code: "UNEXPECTED" })));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    if (input === null) child.stdin.end();
    else child.stdin.end(input);
  });
}

export function projectVercelEnvironmentRows(rows) {
  if (!Array.isArray(rows)) fail("MATRIX_REFUSED");
  const allowed = new Set(["key", "target", "type", "gitBranch"]);
  const result = [];
  for (const row of rows) {
    if (!row || Object.keys(row).some((key) => !allowed.has(key)) || typeof row.key !== "string" || !Array.isArray(row.target) || typeof row.type !== "string") fail("MATRIX_REFUSED");
    if (!CREDENTIAL_CLASSES.includes(row.key) && !ACCEPTED_BINDING_CLASSES.includes(row.key)) continue;
    result.push({ class: row.key, configured: true, targets: [...row.target].sort(), type: row.type, branch: row.gitBranch === null ? "unscoped" : "scoped" });
  }
  return assertPrivacySafe(result);
}

export function projectDeployment(row) {
  const allowed = new Set(["id", "state", "target", "meta", "alias"]);
  if (!row || Object.keys(row).some((key) => !allowed.has(key))) fail("MATRIX_REFUSED");
  const source = row.meta?.githubCommitSha;
  if (typeof row.id !== "string" || typeof row.state !== "string" || typeof row.target !== "string" || typeof source !== "string" || !Array.isArray(row.alias)) fail("MATRIX_REFUSED");
  return { deployment: row.id, state: row.state, target: row.target, source, aliases: row.alias.map((value) => new URL(`https://${value}`).hostname) };
}

export function capabilityRows({ supabaseIndividualCreate, supabaseIndividualRevoke, otherProviderOracles = {} }) {
  return CREDENTIAL_CLASSES.map((name) => {
    const provider = name === "SUPABASE_SERVICE_ROLE_KEY"
      ? { create: supabaseIndividualCreate, revoke: supabaseIndividualRevoke }
      : otherProviderOracles[name] ?? { create: false, revoke: false };
    return {
      class: name,
      consumers: ["current-accepted", "all-addressable-inventory-required"],
      consumerClosureComplete: false,
      providerCreateSupported: provider.create === true,
      protectedInstallSupported: name !== "SUPABASE_SERVICE_ROLE_KEY" || provider.create === true,
      runtimeProbeSupported: true,
      providerNativePredecessorOracle: provider.revoke === true,
      couplingSafe: false,
      preRevokeCompensationProven: false,
    };
  });
}

export function decideCapabilityGate(rows) {
  const map = validateMechanismRows(rows);
  const blocked = [...map.values()].filter((row) => !(row.consumerClosureComplete && row.providerCreateSupported && row.protectedInstallSupported && row.runtimeProbeSupported && row.providerNativePredecessorOracle && row.couplingSafe && row.preRevokeCompensationProven)).map((row) => row.class);
  return assertPrivacySafe({ state: blocked.length ? "prelaunch-readiness-blocked-clean" : "capability-ready", blockedClasses: blocked, externalMutations: 0, residue: 0 });
}

export function verifyAccepted036LProjection(projection) {
  return validateProductionIdentity({
    source: projection.source,
    deployment: projection.deployment,
    aliases: projection.aliases,
    bindingClasses: projection.bindingClasses,
  });
}

export async function runMode(mode) {
  if (!MODES.has(mode)) fail("CLASS_REFUSED");
  if (mode === "self-test") {
    validateProductionIdentity({ source: ACCEPTED_SOURCE, deployment: ACCEPTED_DEPLOYMENT, aliases: [...ACCEPTED_ALIASES], bindingClasses: [...ACCEPTED_BINDING_CLASSES] });
    return { state: "pass", mode, protectedOutput: false, externalMutations: 0 };
  }
  // Installed Supabase CLI 2.109.1 exposes list/reveal but no individual create/revoke command.
  // Do not infer provider behavior; fail before provider reads or writes.
  return decideCapabilityGate(capabilityRows({ supabaseIndividualCreate: false, supabaseIndividualRevoke: false }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve()
    .then(() => runMode(process.argv[2] || "self-test"))
    .then((result) => process.stdout.write(`${JSON.stringify(assertPrivacySafe(result))}\n`))
    .catch((error) => {
      process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`);
      process.exitCode = 2;
    });
}
