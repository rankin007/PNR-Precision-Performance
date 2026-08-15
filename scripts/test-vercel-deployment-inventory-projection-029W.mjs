import {
  PAGE_LIMIT,
  PROJECTION_VERSION,
  RAW_STDOUT_LIMIT,
  ROW_LIMIT,
  buildValidatedShellCommand,
  isStrictDeploymentHostname,
  parseAndProjectRaw,
  projectDeploymentListPayload,
  runLiveProjection,
  validateSanitizedProjection,
  walkStableInventory,
} from "./vercel-deployment-inventory-projection-029W.mjs";

let assertions = 0;
function check(value, message) {
  assertions += 1;
  if (!value) throw new Error(message);
}
function throwsCode(fn, code, secret = "") {
  let caught;
  try { fn(); } catch (error) { caught = error; }
  check(caught instanceof Error && caught.message === code && (!secret || !caught.message.includes(secret)), code);
}
async function rejectsCode(fn, code) {
  let caught;
  try { await fn(); } catch (error) { caught = error; }
  check(caught instanceof Error && caught.message === code, code);
}

const host = "pnr-precision-performance-synthetic-rankin007s-projects.vercel.app";
const baseRow = { url: host, name: "pnr-precision-performance", state: "READY", target: null, createdAt: 1, ready: 2 };
const payload = (rows, pagination = { count: rows.length, next: null, prev: null }) => ({ contextName: "rankin007s-projects", deployments: rows, pagination });
const sanitized = (rows, pagination = { count: rows.length, next: null, prev: null }) => ({ projectionVersion: 1, rows, pagination });
const cleanRow = (deploymentHost = host, stateClass = "READY") => ({ deploymentHost, stateClass, targetClass: "preview", createdAt: 1 });

check(PROJECTION_VERSION === 1, "projection version");
check(RAW_STDOUT_LIMIT === 4194304, "raw ceiling");
check(PAGE_LIMIT === 10 && ROW_LIMIT === 200, "walk limits");
check(buildValidatedShellCommand("C:/Program Files/vercel.cmd", ["--version"]) === '"C:/Program Files/vercel.cmd" "--version"', "fixed shell command");
throwsCode(() => buildValidatedShellCommand("C:\\vercel.cmd", ["list&whoami"]), "INVENTORY_VECTOR_REFUSED");
throwsCode(() => buildValidatedShellCommand("C:\\vercel.cmd", []), "INVENTORY_VECTOR_REFUSED");
check(isStrictDeploymentHostname(host), "strict hostname accepted");
for (const bad of [
  "HTTPS://x.vercel.app", "https://x.vercel.app", "X.vercel.app", "x.vercel.app/path",
  "x.vercel.app?x=1", "x.vercel.app#x", "x.vercel.app:443", "-x.vercel.app",
  "x-.vercel.app", "x.example.com", "x..vercel.app",
]) check(!isStrictDeploymentHostname(bad), "bad hostname refused: " + bad);

const shapeOne = projectDeploymentListPayload(payload([{ ...baseRow, id: "dpl_Synthetic", buildingAt: 1, creator: { uid: "SECRET_CREATOR" }, meta: { pp_sprint: "SECRET_META" } }]));
check(shapeOne.projectionVersion === 1, "version returned");
check(shapeOne.rows.length === 1 && shapeOne.rows[0].deploymentHost === host, "hostname projected");
check(!JSON.stringify(shapeOne).includes("SECRET_CREATOR") && !JSON.stringify(shapeOne).includes("SECRET_META"), "protected values absent");
check(Object.keys(shapeOne.rows[0]).join(",") === "deploymentHost,stateClass,targetClass,createdAt", "closed row");
const shapeTwo = projectDeploymentListPayload(payload([{ ...baseRow, target: "production", buildingAt: 1 }]));
check(shapeTwo.rows[0].targetClass === "production", "production shape");
const shapeThree = projectDeploymentListPayload(payload([{ ...baseRow, creator: null, meta: null }]));
check(shapeThree.rows[0].targetClass === "preview", "missing id shape");

const raw = Buffer.from(JSON.stringify(payload([baseRow])));
check(parseAndProjectRaw(raw).projectionVersion === 1, "raw parse");
throwsCode(() => parseAndProjectRaw(Buffer.alloc(0)), "INVENTORY_RAW_SIZE_REFUSED");
throwsCode(() => parseAndProjectRaw(Buffer.alloc(RAW_STDOUT_LIMIT + 1)), "INVENTORY_RAW_SIZE_REFUSED");
throwsCode(() => parseAndProjectRaw(Buffer.from("{")), "INVENTORY_RAW_JSON_REFUSED");
throwsCode(() => parseAndProjectRaw(Buffer.from(JSON.stringify(payload([baseRow])) + "TRAILING")), "INVENTORY_RAW_JSON_REFUSED");
throwsCode(() => parseAndProjectRaw("not-buffer"), "INVENTORY_RAW_TYPE_REFUSED");

throwsCode(() => projectDeploymentListPayload({ ...payload([baseRow]), extra: 1 }), "INVENTORY_JSON_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, extra: 1 }])), "INVENTORY_JSON_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, creator: "SECRET_CREATOR" }])), "INVENTORY_PROTECTED_CONTAINER_REFUSED", "SECRET_CREATOR");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, meta: ["SECRET_META"] }])), "INVENTORY_PROTECTED_CONTAINER_REFUSED", "SECRET_META");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, id: "bad" }])), "INVENTORY_ID_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, url: "X.vercel.app" }])), "INVENTORY_HOSTNAME_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([baseRow, { ...baseRow }])), "INVENTORY_HOSTNAME_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, state: "UNKNOWN" }])), "INVENTORY_STATE_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, target: "staging" }])), "INVENTORY_TARGET_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, customEnvironment: { id: "x" } }])), "INVENTORY_CUSTOM_ENVIRONMENT_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, createdAt: -1 }])), "INVENTORY_TIMESTAMP_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, ready: "2" }])), "INVENTORY_TIMESTAMP_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([{ ...baseRow, buildingAt: null }])), "INVENTORY_TIMESTAMP_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([baseRow], { count: 2, next: null, prev: null })), "INVENTORY_PAGINATION_REFUSED");
throwsCode(() => projectDeploymentListPayload(payload([baseRow], { count: 1, next: -1, prev: null })), "INVENTORY_PAGINATION_REFUSED");

check(validateSanitizedProjection(sanitized([cleanRow()])).rows.length === 1, "sanitized contract");
throwsCode(() => validateSanitizedProjection({ rows: [], pagination: { count: 0, next: null, prev: null } }), "PROJECTION_CONTRACT_REFUSED");
throwsCode(() => validateSanitizedProjection({ projectionVersion: 2, rows: [], pagination: { count: 0, next: null, prev: null } }), "PROJECTION_VERSION_REFUSED");
throwsCode(() => validateSanitizedProjection({ ...sanitized([]), extra: true }), "PROJECTION_CONTRACT_REFUSED");
throwsCode(() => validateSanitizedProjection(sanitized([{ ...cleanRow(), extra: true }])), "PROJECTION_CONTRACT_REFUSED");

let stableCalls = 0;
const stable = await walkStableInventory(async (next) => {
  stableCalls += 1;
  return next === null
    ? sanitized([cleanRow()], { count: 1, next: 2, prev: null })
    : sanitized([cleanRow("second.vercel.app")], { count: 1, next: null, prev: 1 });
});
check(stable.rows.length === 2 && stable.pageCount === 2, "stable walk");
check(stable.restartCount === 0 && stable.headStable && stableCalls === 3, "stable head proof");

let restartHeads = 0;
const restarted = await walkStableInventory(async (next) => {
  if (next !== null) return sanitized([], { count: 0, next: null, prev: 1 });
  restartHeads += 1;
  if (restartHeads === 2) return sanitized([cleanRow("changed.vercel.app")]);
  return sanitized([cleanRow()]);
});
check(restarted.restartCount === 1 && restarted.rows[0].deploymentHost === host, "one restart");

await rejectsCode(() => walkStableInventory(async () => sanitized([cleanRow()], { count: 1, next: 1, prev: null })), "INVENTORY_SNAPSHOT_REFUSED");
await rejectsCode(() => runLiveProjection([]), "INVENTORY_VECTOR_REFUSED");
await rejectsCode(() => runLiveProjection(["--mode", "bad"]), "INVENTORY_VECTOR_REFUSED");
await rejectsCode(() => runLiveProjection(["--mode", "full", "--next", "1&whoami"]), "INVENTORY_VECTOR_REFUSED");

if (assertions !== 57) throw new Error("Sprint 029W inventory projection assertion target changed: " + assertions + "/57");
console.log("Sprint 029W isolated inventory projection tests passed (" + assertions + "/" + assertions + ").");
