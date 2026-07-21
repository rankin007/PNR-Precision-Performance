#!/usr/bin/env node

export const EXPECTED_REF = "uvskssaecdhxcgytkasc";
export const OLD_REF = "tagnbgkroihagjmvehlx";
export const ACTORS = Object.freeze(["ADMIN", "TRAINER_A", "TRAINER_B", "MANAGER_A", "VET_X", "CONSULTANT_X", "HAND_A", "OWNER_A", "OWNER_B", "SUSPENDED"]);
export const LIMITS = Object.freeze({authIdentities:10,appUsers:10,profiles:10,primaryRoles:10,stables:2,horses:4,ownerships:2,assignments:10,biochemistryTests:4,comments:12,storageObjects:0});
const RUN_RE = /^021H-RLS-\d{8}-\d{2}$/;
const RETIRED = new Set(["020G-RLS-20260720-01", "021E-RLS-20260720-01"]);
const MUTATING = new Set(["identities", "fixtures", "revocation", "cleanup"]);
const CONFIRM = Object.freeze({identities:"CONFIRM-021H-IDENTITIES",fixtures:"CONFIRM-021H-FIXTURES",revocation:"CONFIRM-021H-REVOCATION",cleanup:"CONFIRM-021H-CLEANUP"});

export class HarnessError extends Error { constructor(code) { super(code); this.code = code; } }

export function parseArgs(argv) {
  const values = new Map();
  for (const arg of argv) {
    if (!arg.startsWith("--") || !arg.includes("=")) throw new HarnessError("INVALID_ARGUMENT");
    const [key, ...rest] = arg.slice(2).split("=");
    if (values.has(key)) throw new HarnessError("DUPLICATE_ARGUMENT");
    values.set(key, rest.join("="));
  }
  for (const key of values.keys()) if (!["mode","run-id","confirm","self-test"].includes(key)) throw new HarnessError("UNKNOWN_ARGUMENT");
  return {mode:values.get("mode")||"preflight",runId:values.get("run-id")||null,confirm:values.get("confirm")||null,selfTest:values.get("self-test")==="true"};
}

export function exactTarget(raw) {
  let url;
  try { url = new URL(raw); } catch { throw new HarnessError("CANDIDATE_URL_INVALID"); }
  if (url.protocol !== "https:" || url.hostname !== `${EXPECTED_REF}.supabase.co` || url.pathname !== "/" || url.username || url.password || url.port) {
    if (url.hostname === `${OLD_REF}.supabase.co`) throw new HarnessError("OLD_PROJECT_REFUSED");
    throw new HarnessError("UNEXPECTED_CANDIDATE_REFUSED");
  }
  return url.origin;
}

export function guard({mode,runId,confirm}) {
  if (runId && RETIRED.has(runId)) throw new HarnessError("RETIRED_RUN_REFUSED");
  if (runId && !RUN_RE.test(runId)) throw new HarnessError("INVALID_RUN_ID");
  if (mode !== "preflight" && !runId) throw new HarnessError("FRESH_RUN_ID_REQUIRED");
  if (MUTATING.has(mode) && confirm !== CONFIRM[mode]) throw new HarnessError("MODE_CONFIRMATION_REQUIRED");
}

export function identities(runId) {
  if (!RUN_RE.test(runId) || RETIRED.has(runId)) throw new HarnessError("INVALID_RUN_ID");
  return Object.fromEntries(ACTORS.map(actor => [actor, `${runId.toLowerCase()}-${actor.toLowerCase()}@precision-performance.invalid`]));
}

export function checkCounts(counts) {
  for (const [key, limit] of Object.entries(LIMITS)) {
    if (!Number.isInteger(counts[key]) || counts[key] < 0) throw new HarnessError("INVALID_COUNT_PLAN");
    if (counts[key] > limit) throw new HarnessError(`CEILING_REFUSED_${key}`);
  }
  return true;
}

export function cleanupPlan({counts,directAnchors,unambiguousOwnership,authLast}) {
  checkCounts(counts);
  if (!directAnchors || !unambiguousOwnership || !authLast) throw new HarnessError("AMBIGUOUS_CLEANUP_REFUSED");
  if (counts.storageObjects !== 0) throw new HarnessError("STORAGE_OBJECT_REFUSED");
  return ["comments","biochemistryTests","assignments","ownerships","horses","stables","primaryRoles","profiles","appUsers","authIdentities"];
}

export async function compensate(adapter, ledger, runId) {
  for (const item of [...ledger].reverse()) {
    if (!item.anchor?.startsWith(`${runId}:`)) throw new HarnessError("COMPENSATION_ANCHOR_REFUSED");
    if (await adapter.remove(item) !== 1) throw new HarnessError("PARTIAL_COMPENSATION_FAILED");
  }
  return true;
}

export function verifySession(session, expectedIssuer, expectedAlias) {
  if (!session || session.issuer !== expectedIssuer || session.alias !== expectedAlias || session.fabricated) throw new HarnessError("GENUINE_SESSION_VERIFICATION_FAILED");
  return true;
}

export function callbackUnchanged(siteUrl, callbacks) {
  if (siteUrl !== "https://precisionperformance.com.au" || callbacks.length !== 1 || callbacks[0] !== "https://precisionperformance.com.au/auth/callback") throw new HarnessError("HOSTED_CONFIG_CHANGED");
  return true;
}

export function safeOutput(value) {
  const text = JSON.stringify(value);
  if (/@|sb_(?:secret|publishable)_|eyJ[A-Za-z0-9_-]{20,}\.|access[_-]?token|refresh[_-]?token|auth[_-]?user|[0-9a-f]{8}-[0-9a-f-]{27,}/i.test(text)) throw new HarnessError("UNSAFE_OUTPUT_VALUE_REFUSED");
  return value;
}

export function clearProtected(container) {
  for (const key of Object.keys(container)) container[key] = null;
  if (Object.values(container).some(Boolean)) throw new HarnessError("PROTECTED_CLEAR_FAILED");
  return true;
}

export async function selfTests() {
  const checks=[]; const zeros=Object.fromEntries(Object.keys(LIMITS).map(k=>[k,0])); const fresh="021H-RLS-20260721-01";
  const test=async(name,fn)=>{let ok=false;try{ok=Boolean(await fn());}catch{}checks.push(`${name}:${ok?"pass":"fail"}`);if(!ok)throw new HarnessError(`SELF_TEST_FAILED_${name}`);};
  await test("default-non-mutating",()=>parseArgs([]).mode==="preflight");
  await test("old-target-refusal",()=>{try{exactTarget(`https://${OLD_REF}.supabase.co`);return false;}catch(e){return e.code==="OLD_PROJECT_REFUSED";}});
  await test("unexpected-target-refusal",()=>{try{exactTarget("https://other.supabase.co");return false;}catch(e){return e.code==="UNEXPECTED_CANDIDATE_REFUSED";}});
  await test("retired-run-refusal",()=>{try{guard({mode:"matrix",runId:"021E-RLS-20260720-01"});return false;}catch(e){return e.code==="RETIRED_RUN_REFUSED";}});
  await test("mutation-confirmation",()=>{try{guard({mode:"identities",runId:fresh,confirm:"wrong"});return false;}catch(e){return e.code==="MODE_CONFIRMATION_REQUIRED";}});
  await test("invalid-identity-domain-refusal",()=>Object.values(identities(fresh)).every(x=>x.endsWith(".invalid")));
  await test("ten-actor-isolation",()=>new Set(Object.values(identities(fresh))).size===10);
  await test("unsafe-output-refusal",()=>{try{safeOutput({value:"sb_secret_example"});return false;}catch(e){return e.code==="UNSAFE_OUTPUT_VALUE_REFUSED";}});
  await test("ceiling-refusal",()=>{try{checkCounts({...zeros,horses:5});return false;}catch(e){return e.code==="CEILING_REFUSED_horses";}});
  await test("ambiguity-refusal",()=>{try{cleanupPlan({counts:zeros,directAnchors:false,unambiguousOwnership:true,authLast:true});return false;}catch(e){return e.code==="AMBIGUOUS_CLEANUP_REFUSED";}});
  await test("auth-last-cleanup",()=>cleanupPlan({counts:zeros,directAnchors:true,unambiguousOwnership:true,authLast:true}).at(-1)==="authIdentities");
  await test("partial-compensation",async()=>{const seen=[];await compensate({remove:async x=>(seen.push(x.anchor),1)},[{anchor:`${fresh}:one`},{anchor:`${fresh}:two`}],fresh);return seen[0].endsWith(":two");});
  await test("hosted-config-immutability",()=>callbackUnchanged("https://precisionperformance.com.au",["https://precisionperformance.com.au/auth/callback"]));
  await test("genuine-session-check",()=>verifySession({issuer:`https://${EXPECTED_REF}.supabase.co/auth/v1`,alias:"ADMIN",fabricated:false},`https://${EXPECTED_REF}.supabase.co/auth/v1`,"ADMIN"));
  await test("protected-clearing",()=>clearProtected({publishable:"x",secret:"y",session:"z"}));
  return checks;
}

async function main(){const options=parseArgs(process.argv.slice(2));if(options.selfTest){process.stdout.write(JSON.stringify(safeOutput({harness:"021H",state:"passed",checks:await selfTests()}))+"\n");return;}guard(options);process.stdout.write(JSON.stringify(safeOutput({harness:"021H",mode:options.mode,state:"non-mutating",messageCode:"PROTECTED_ADAPTER_REQUIRED"}))+"\n");}
if (process.argv[1] && import.meta.url === new URL(`file:///${process.argv[1].replace(/\\/g,"/")}`).href) main().catch(error=>{process.stdout.write(JSON.stringify({harness:"021H",state:"stopped",messageCode:error.code||"UNEXPECTED_FAILURE"})+"\n");process.exitCode=1;});
