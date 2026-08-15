import assert from "node:assert/strict";
import {
  capabilityRows, decideCapabilityGate, projectDeployment,
  projectVercelEnvironmentRows, runMode, verifyAccepted036LProjection,
} from "./prelaunch-provider-036K.mjs";
import {
  ACCEPTED_ALIASES, ACCEPTED_BINDING_CLASSES, ACCEPTED_DEPLOYMENT,
  ACCEPTED_SOURCE, CREDENTIAL_CLASSES,
} from "./prelaunch-readiness-036K.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
async function throwsCode(fn, code) {
  assertions += 1;
  await assert.rejects(fn, (error) => error?.code === code || error?.message === code);
}

const envRows = CREDENTIAL_CLASSES.map((key) => ({ key, target: ["production"], type: "sensitive", gitBranch: null }));
const projection = projectVercelEnvironmentRows(envRows);
equal(projection.length, 7);
for (const name of CREDENTIAL_CLASSES) check(projection.some((row) => row.class === name), name);
check(projection.every((row) => row.configured));
check(projection.every((row) => row.targets.join() === "production"));
check(projection.every((row) => row.branch === "unscoped"));
equal(projectVercelEnvironmentRows([{ key: "UNLISTED_SECRET", target: ["production"], type: "sensitive", gitBranch: null }]).length, 0);
await throwsCode(async () => projectVercelEnvironmentRows([{ key: "CRON_SECRET", target: ["production"], type: "sensitive", gitBranch: null, value: "forbidden" }]), "MATRIX_REFUSED");
await throwsCode(async () => projectVercelEnvironmentRows({}), "MATRIX_REFUSED");

const deployment = projectDeployment({ id: ACCEPTED_DEPLOYMENT, state: "READY", target: "production", meta: { githubCommitSha: ACCEPTED_SOURCE }, alias: [...ACCEPTED_ALIASES] });
equal(deployment.deployment, ACCEPTED_DEPLOYMENT);
equal(deployment.source, ACCEPTED_SOURCE);
equal(deployment.aliases.length, 5);
equal(deployment.state, "READY");
await throwsCode(async () => projectDeployment({ id: ACCEPTED_DEPLOYMENT, state: "READY", target: "production", meta: { githubCommitSha: ACCEPTED_SOURCE }, alias: [], creator: {} }), "MATRIX_REFUSED");

const caps = capabilityRows({ supabaseIndividualCreate: false, supabaseIndividualRevoke: false });
equal(caps.length, 7);
equal(caps[0].class, "SUPABASE_SERVICE_ROLE_KEY");
equal(caps[0].providerCreateSupported, false);
equal(caps[0].providerNativePredecessorOracle, false);
check(caps.every((row) => row.consumerClosureComplete === false));
const blocked = decideCapabilityGate(caps);
check(blocked.blockedClasses.includes("SUPABASE_SERVICE_ROLE_KEY"));
check(blocked.blockedClasses.includes("CRON_SECRET"));
equal(blocked.state, "prelaunch-readiness-blocked-clean");
equal(blocked.blockedClasses.length, 7);
equal(blocked.externalMutations, 0);
equal(blocked.residue, 0);

const readyRows = caps.map((row) => ({ ...row, consumerClosureComplete: true, providerCreateSupported: true, protectedInstallSupported: true, runtimeProbeSupported: true, providerNativePredecessorOracle: true, couplingSafe: true, preRevokeCompensationProven: true }));
equal(decideCapabilityGate(readyRows).state, "capability-ready");
equal(verifyAccepted036LProjection({ source: ACCEPTED_SOURCE, deployment: ACCEPTED_DEPLOYMENT, aliases: [...ACCEPTED_ALIASES], bindingClasses: [...ACCEPTED_BINDING_CLASSES] }), true);
await throwsCode(async () => verifyAccepted036LProjection({ source: "wrong", deployment: ACCEPTED_DEPLOYMENT, aliases: [...ACCEPTED_ALIASES], bindingClasses: [...ACCEPTED_BINDING_CLASSES] }), "PRODUCTION_IDENTITY_REFUSED");
equal((await runMode("self-test")).state, "pass");
equal((await runMode("capability-gate")).state, "prelaunch-readiness-blocked-clean");
await throwsCode(() => runMode("unknown"), "CLASS_REFUSED");

assert.equal(assertions, 36, `expected exactly 36 provider assertions, received ${assertions}`);
console.log(`Sprint 036K provider/controller assertions passed: ${assertions}/36.`);
