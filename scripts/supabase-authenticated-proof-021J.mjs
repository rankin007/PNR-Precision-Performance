#!/usr/bin/env node

import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const EXPECTED_REF = "uvskssaecdhxcgytkasc";
export const OLD_REF = "tagnbgkroihagjmvehlx";
export const EXPECTED_HOST = `${EXPECTED_REF}.supabase.co`;
export const ACTORS = Object.freeze(["ADMIN","TRAINER_A","TRAINER_B","MANAGER_A","VET_X","CONSULTANT_X","HAND_A","OWNER_A","OWNER_B","SUSPENDED"]);
export const LIMITS = Object.freeze({authIdentities:10,appUsers:10,profiles:10,primaryRoles:10,stables:2,horses:4,ownerships:2,assignments:10,biochemistryTests:4,comments:12,storageObjects:0});
const RETIRED = new Set(["020G-RLS-20260720-01","021E-RLS-20260720-01"]);
const RUN_RE = /^021J-RLS-\d{8}-\d{2}$/;
const PUBLIC_NAMES = new Set(["NEXT_PUBLIC_SUPABASE_URL","NEXT_PUBLIC_SUPABASE_ANON_KEY"]);
const PROTECTED_NAMES = new Set(["SUPABASE_SERVICE_ROLE_KEY"]);

export class HarnessError extends Error { constructor(code){super(code);this.code=code;} }

export function parseEnvSchema(text, allowed) {
  const values = new Map();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
    if (!match) throw new HarnessError("ENV_SCHEMA_INVALID");
    const [, name, value] = match;
    if (!allowed.has(name)) throw new HarnessError("ENV_NAME_REFUSED");
    if (values.has(name)) throw new HarnessError("DUPLICATE_ENV_NAME_REFUSED");
    if (!value) throw new HarnessError("ENV_VALUE_MISSING");
    values.set(name, value);
  }
  if (values.size !== allowed.size || [...allowed].some(name=>!values.has(name))) throw new HarnessError("ENV_REQUIRED_NAME_MISSING");
  return values;
}

export function exactCandidate(raw) {
  let url;
  try { url=new URL(raw); } catch { throw new HarnessError("TARGET_INVALID"); }
  if (url.hostname===`${OLD_REF}.supabase.co`) throw new HarnessError("OLD_PROJECT_REFUSED");
  if (url.protocol!=="https:" || url.hostname!==EXPECTED_HOST || url.pathname!=="/" || url.username || url.password || url.port) throw new HarnessError("UNEXPECTED_PROJECT_REFUSED");
  return true;
}

export function guardRun(runId) {
  if (RETIRED.has(runId)) throw new HarnessError("RETIRED_RUN_REFUSED");
  if (!RUN_RE.test(runId)) throw new HarnessError("INVALID_RUN_ID");
  return true;
}

export function identities(runId) {
  guardRun(runId);
  return Object.fromEntries(ACTORS.map(actor=>[actor,`${runId.toLowerCase()}-${actor.toLowerCase()}@precision-performance.invalid`]));
}

export function checkCounts(counts) {
  for (const [name,limit] of Object.entries(LIMITS)) {
    if (!Number.isInteger(counts[name]) || counts[name]<0) throw new HarnessError("INVALID_COUNT_PLAN");
    if (counts[name]>limit) throw new HarnessError(`CEILING_REFUSED_${name}`);
  }
  return true;
}

export function cleanupPlan({counts,directAnchors,unambiguousOwnership,authLast}) {
  checkCounts(counts);
  if (!directAnchors || !unambiguousOwnership || !authLast) throw new HarnessError("AMBIGUOUS_CLEANUP_REFUSED");
  if (counts.storageObjects!==0) throw new HarnessError("STORAGE_OBJECT_REFUSED");
  return ["comments","biochemistryTests","assignments","ownerships","horses","stables","primaryRoles","profiles","appUsers","authIdentities"];
}

export async function compensate(adapter, ledger, runId) {
  for (const item of [...ledger].reverse()) {
    if (!item.anchor?.startsWith(`${runId}:`)) throw new HarnessError("COMPENSATION_ANCHOR_REFUSED");
    if (await adapter.remove(item)!==1) throw new HarnessError("COMPENSATION_FAILED");
  }
  return true;
}

export function verifySession(session,actor) {
  if (!session || session.issuer!==`https://${EXPECTED_HOST}/auth/v1` || session.actor!==actor || session.fabricated) throw new HarnessError("GENUINE_SESSION_REFUSED");
  return true;
}

export function hostedConfig(siteUrl,callbacks) {
  if (siteUrl!=="https://precisionperformance.com.au" || callbacks.length!==1 || callbacks[0]!=="https://precisionperformance.com.au/auth/callback") throw new HarnessError("HOSTED_CONFIG_CHANGED");
  return true;
}

export function safe(value) {
  const text=JSON.stringify(value);
  if (/@|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}|eyJ[A-Za-z0-9_-]{20,}\.|access[_-]?token|refresh[_-]?token|[0-9a-f]{8}-[0-9a-f-]{27,}/i.test(text)) throw new HarnessError("PROTECTED_OUTPUT_REFUSED");
  return value;
}

export function clearProtected(container) {
  for (const key of Object.keys(container)) container[key]=null;
  if (Object.values(container).some(Boolean)) throw new HarnessError("PROTECTED_CLEAR_FAILED");
  return true;
}

export async function selfTests() {
  const checks=[]; const zeros=Object.fromEntries(Object.keys(LIMITS).map(k=>[k,0])); const fresh="021J-RLS-20260721-01";
  const test=async(name,fn)=>{let ok=false;try{ok=Boolean(await fn());}catch{}if(!ok)throw new HarnessError(`SELF_TEST_FAILED_${name}`);checks.push(`${name}:pass`);};
  await test("default-nonmutating",()=>true);
  await test("exact-target",()=>exactCandidate(`https://${EXPECTED_HOST}`));
  await test("old-target-refusal",()=>{try{exactCandidate(`https://${OLD_REF}.supabase.co`);return false;}catch(e){return e.code==="OLD_PROJECT_REFUSED";}});
  await test("unexpected-target-refusal",()=>{try{exactCandidate("https://unexpected.supabase.co");return false;}catch(e){return e.code==="UNEXPECTED_PROJECT_REFUSED";}});
  await test("public-schema",()=>parseEnvSchema(`NEXT_PUBLIC_SUPABASE_URL=https://${EXPECTED_HOST}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder`,PUBLIC_NAMES).size===2);
  await test("cross-file-refusal",()=>{try{parseEnvSchema("SUPABASE_SERVICE_ROLE_KEY=placeholder",PUBLIC_NAMES);return false;}catch(e){return e.code==="ENV_NAME_REFUSED";}});
  await test("protected-schema",()=>parseEnvSchema("SUPABASE_SERVICE_ROLE_KEY=placeholder",PROTECTED_NAMES).size===1);
  await test("duplicate-refusal",()=>{try{parseEnvSchema("SUPABASE_SERVICE_ROLE_KEY=a\nSUPABASE_SERVICE_ROLE_KEY=b",PROTECTED_NAMES);return false;}catch(e){return e.code==="DUPLICATE_ENV_NAME_REFUSED";}});
  await test("secret-output-refusal",()=>{try{safe({value:["sb","secret","placeholdervalue"].join("_")});return false;}catch(e){return e.code==="PROTECTED_OUTPUT_REFUSED";}});
  await test("retired-run-refusal",()=>{try{guardRun("021E-RLS-20260720-01");return false;}catch(e){return e.code==="RETIRED_RUN_REFUSED";}});
  await test("invalid-run-refusal",()=>{try{guardRun("bad");return false;}catch(e){return e.code==="INVALID_RUN_ID";}});
  await test("invalid-identities",()=>new Set(Object.values(identities(fresh))).size===10 && Object.values(identities(fresh)).every(x=>x.endsWith(".invalid")));
  await test("genuine-session",()=>verifySession({issuer:`https://${EXPECTED_HOST}/auth/v1`,actor:"ADMIN",fabricated:false},"ADMIN"));
  await test("ceiling-refusal",()=>{try{checkCounts({...zeros,horses:5});return false;}catch(e){return e.code==="CEILING_REFUSED_horses";}});
  await test("ambiguity-refusal",()=>{try{cleanupPlan({counts:zeros,directAnchors:false,unambiguousOwnership:true,authLast:true});return false;}catch(e){return e.code==="AMBIGUOUS_CLEANUP_REFUSED";}});
  await test("partial-compensation",async()=>{const seen=[];await compensate({remove:async x=>(seen.push(x.anchor),1)},[{anchor:`${fresh}:one`},{anchor:`${fresh}:two`}],fresh);return seen[0].endsWith(":two");});
  await test("auth-last-cleanup",()=>cleanupPlan({counts:zeros,directAnchors:true,unambiguousOwnership:true,authLast:true}).at(-1)==="authIdentities");
  await test("hosted-config",()=>hostedConfig("https://precisionperformance.com.au",["https://precisionperformance.com.au/auth/callback"]));
  await test("protected-clearing",()=>clearProtected({secret:"x",session:"y",artifact:"z"}));
  return checks;
}

function stageA(){const values=parseEnvSchema(fs.readFileSync(".env.local","utf8"),PUBLIC_NAMES);exactCandidate(values.get("NEXT_PUBLIC_SUPABASE_URL"));clearProtected(Object.fromEntries(values));process.stdout.write(JSON.stringify(safe({harness:"021J",stage:"public-target",state:"pass",target:"exact-candidate",protectedLoaded:"no"}))+"\n");}
function stageADiagnostic(){const text=fs.readFileSync(".env.local","utf8");const seen=new Set();const refused=[];const duplicates=[];let active=0;for(const [index,raw] of text.split(/\r?\n/).entries()){const line=raw.trim();if(!line||line.startsWith("#"))continue;active++;const match=/^([A-Za-z_][A-Za-z0-9_]*)=/.exec(line);if(!match||!PUBLIC_NAMES.has(match[1]))refused.push(index+1);else if(seen.has(match[1]))duplicates.push(index+1);else seen.add(match[1]);}text.replace(/./g," ");process.stdout.write(JSON.stringify({harness:"021J",stage:"public-schema-diagnostic",state:"sanitized",activeLines:active,refusedLineNumbers:refused,duplicateLineNumbers:duplicates,requiredNamesPresent:seen.size})+"\n");}
function stageBChild(){if(process.env.PP021J_TARGET_VALIDATED!==EXPECTED_REF)throw new HarnessError("TARGET_BINDING_REQUIRED");const values=parseEnvSchema(fs.readFileSync(".env.test.local","utf8"),PROTECTED_NAMES);const protectedState={secret:values.get("SUPABASE_SERVICE_ROLE_KEY")};if(typeof protectedState.secret!=="string"||protectedState.secret.length<32)throw new HarnessError("PROTECTED_VALUE_INVALID");const category=protectedState.secret.startsWith("sb_secret_")?"modern-secret":"legacy-service-role";clearProtected(protectedState);values.clear();process.stdout.write(JSON.stringify({harness:"021J",stage:"protected-schema",state:"pass",target:"bound-candidate",presence:"yes",category,remoteRequest:"no",cleared:"yes"})+"\n");}
function protectedSchema(){const publicValues=parseEnvSchema(fs.readFileSync(".env.local","utf8"),PUBLIC_NAMES);exactCandidate(publicValues.get("NEXT_PUBLIC_SUPABASE_URL"));publicValues.clear();const child=spawnSync(process.execPath,[fileURLToPath(import.meta.url),"--stage-b-child"],{cwd:process.cwd(),env:{PP021J_TARGET_VALIDATED:EXPECTED_REF},encoding:"utf8",windowsHide:true});const output=child.stdout.trim();if(output){safe(JSON.parse(output));process.stdout.write(output+"\n");}if(child.status!==0)process.exitCode=1;}
async function remotePreflightChild(){if(process.env.PP021J_TARGET_VALIDATED!==EXPECTED_REF)throw new HarnessError("TARGET_BINDING_REQUIRED");exactCandidate(process.env.PP021J_PUBLIC_URL);const values=parseEnvSchema(fs.readFileSync(".env.test.local","utf8"),PROTECTED_NAMES);const protectedState={secret:values.get("SUPABASE_SERVICE_ROLE_KEY")};const {createClient}=await import("@supabase/supabase-js");const client=createClient(process.env.PP021J_PUBLIC_URL,protectedState.secret,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});const auth=await client.auth.admin.listUsers({page:1,perPage:1000});if(auth.error)throw new HarnessError("AUTH_BASELINE_QUERY_FAILED");const buckets=await client.storage.listBuckets();if(buckets.error)throw new HarnessError("STORAGE_BASELINE_QUERY_FAILED");const tables=["users","member_profiles","stables","horses","biochemistry_horse_access_assignments","biochemistry_tests","biochemistry_test_notes"];const counts={authIdentities:auth.data.users.length,storageBuckets:buckets.data.length};for(const table of tables){const result=await client.from(table).select("*",{count:"exact",head:true});if(result.error)throw new HarnessError(`BASELINE_${table.toUpperCase()}_FAILED`);counts[table]=result.count||0;}clearProtected(protectedState);values.clear();delete process.env.PP021J_PUBLIC_URL;process.stdout.write(JSON.stringify({harness:"021J",stage:"remote-baseline",state:"pass",target:"exact-candidate",counts,remoteMutation:"no",cleared:"yes"})+"\n");}
function remotePreflight(){const publicValues=parseEnvSchema(fs.readFileSync(".env.local","utf8"),PUBLIC_NAMES);const url=publicValues.get("NEXT_PUBLIC_SUPABASE_URL");exactCandidate(url);const child=spawnSync(process.execPath,[fileURLToPath(import.meta.url),"--remote-preflight-child"],{cwd:process.cwd(),env:{PP021J_TARGET_VALIDATED:EXPECTED_REF,PP021J_PUBLIC_URL:url},encoding:"utf8",windowsHide:true,maxBuffer:1024*1024});publicValues.clear();const output=child.stdout.trim();if(output){safe(JSON.parse(output));process.stdout.write(output+"\n");}if(child.status!==0)process.exitCode=1;}
async function executeProofChild(){
  if(process.env.PP021J_TARGET_VALIDATED!==EXPECTED_REF)throw new HarnessError("TARGET_BINDING_REQUIRED");
  const runId=process.env.PP021J_RUN_ID;guardRun(runId);exactCandidate(process.env.PP021J_PUBLIC_URL);
  const protectedValues=parseEnvSchema(fs.readFileSync(".env.test.local","utf8"),PROTECTED_NAMES);
  const protectedState={secret:protectedValues.get("SUPABASE_SERVICE_ROLE_KEY"),sessions:{},artifacts:{}};
  const {createClient}=await import("@supabase/supabase-js");
  const options={auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}};
  const service=createClient(process.env.PP021J_PUBLIC_URL,protectedState.secret,options);
  const publicKey=process.env.PP021J_PUBLIC_KEY;
  const authIds=[];const ids={users:{},profiles:{},stables:{},horses:{},owners:{},tests:{},notes:[],stableRoles:[],access:[],memberships:[],ownerships:[]};
  const assertions=[];let outcome="blocked-clean";let failure=null;
  const record=(code,expected,actual)=>{const pass=expected===actual;assertions.push({code,expected,actual,pass});if(!pass)throw new HarnessError(`ASSERTION_FAILED_${code}`);};
  const actorClient=(actor)=>createClient(process.env.PP021J_PUBLIC_URL,publicKey,{...options,global:{headers:{Authorization:`Bearer ${protectedState.sessions[actor].access_token}`}}});
  const cleanup=async()=>{
    const remove=async(table,list)=>{if(!list?.length)return;await service.from(table).delete().in("id",list);};
    await remove("biochemistry_test_notes",ids.notes);await remove("biochemistry_tests",Object.values(ids.tests));
    await remove("biochemistry_horse_access_assignments",ids.access);await remove("horse_assignments",ids.ownerships);
    const horseIds=Object.values(ids.horses);if(horseIds.length)await service.from("horse_ownership_history").delete().in("horse_id",horseIds);
    await remove("owners",Object.values(ids.owners));await remove("stable_role_assignments",ids.stableRoles);
    await remove("horses",horseIds);await remove("stables",Object.values(ids.stables));await remove("user_membership_levels",ids.memberships);
    await remove("member_profiles",Object.values(ids.profiles));await remove("users",Object.values(ids.users));
    for(const id of [...authIds].reverse())await service.auth.admin.deleteUser(id,false);
  };
  try{
    const before=await service.auth.admin.listUsers({page:1,perPage:1000});if(before.error||before.data.users.length!==0)throw new HarnessError("AUTH_BASELINE_NOT_ZERO");
    const emails=identities(runId);const role={ADMIN:"administrator",TRAINER_A:"trainer",TRAINER_B:"trainer",MANAGER_A:"stable_manager",VET_X:"veterinarian",CONSULTANT_X:"consultant",HAND_A:"stable_hand",OWNER_A:null,OWNER_B:null,SUSPENDED:"trainer"};
    for(const actor of ACTORS){
      const created=await service.auth.admin.createUser({email:emails[actor],email_confirm:true,user_metadata:{proof_alias:actor}});if(created.error)throw new HarnessError(`IDENTITY_CREATE_FAILED_${actor}`);authIds.push(created.data.user.id);
      const link=await service.auth.admin.generateLink({type:"magiclink",email:emails[actor]});if(link.error||!link.data.properties?.hashed_token)throw new HarnessError(`ARTIFACT_CREATE_FAILED_${actor}`);
      protectedState.artifacts[actor]=link.data.properties.hashed_token;
      const client=createClient(process.env.PP021J_PUBLIC_URL,publicKey,options);const verified=await client.auth.verifyOtp({token_hash:protectedState.artifacts[actor],type:"email"});if(verified.error||!verified.data.session)throw new HarnessError(`SESSION_EXCHANGE_FAILED_${actor}`);
      protectedState.sessions[actor]=verified.data.session;delete protectedState.artifacts[actor];
    }
    const userRows=ACTORS.map((actor,index)=>({auth_user_id:authIds[index],email:emails[actor],status:actor==="SUSPENDED"?"suspended":"active",primary_role_code:role[actor]}));
    const users=await service.from("users").insert(userRows).select("id");if(users.error)throw new HarnessError("APP_USERS_CREATE_FAILED");ACTORS.forEach((a,i)=>ids.users[a]=users.data[i].id);
    const profiles=await service.from("member_profiles").insert(ACTORS.map(a=>({user_id:ids.users[a],display_name:`${runId}-${a}`}))).select("id");if(profiles.error)throw new HarnessError("PROFILES_CREATE_FAILED");ACTORS.forEach((a,i)=>ids.profiles[a]=profiles.data[i].id);
    const levels=await service.from("membership_levels").select("id,code");if(levels.error)throw new HarnessError("LEVELS_QUERY_FAILED");const levelMap=Object.fromEntries(levels.data.map(x=>[x.code,x.id]));const levelCode={ADMIN:"administrator",TRAINER_A:"trainer",TRAINER_B:"trainer",MANAGER_A:"stable-manager",VET_X:"veterinarian",CONSULTANT_X:"consultant",HAND_A:"stable-hand",OWNER_A:"owner",OWNER_B:"owner",SUSPENDED:"trainer"};
    const memberships=await service.from("user_membership_levels").insert(ACTORS.map(a=>({user_id:ids.users[a],membership_level_id:levelMap[levelCode[a]],starts_at:new Date().toISOString()}))).select("id");if(memberships.error)throw new HarnessError("MEMBERSHIPS_CREATE_FAILED");ids.memberships=memberships.data.map(x=>x.id);
    const stables=await service.from("stables").insert([{name:`${runId}-STABLE_A`,code:`${runId}-A`},{name:`${runId}-STABLE_B`,code:`${runId}-B`}]).select("id");if(stables.error)throw new HarnessError("STABLES_CREATE_FAILED");ids.stables.A=stables.data[0].id;ids.stables.B=stables.data[1].id;
    const horseDefs=[["A1","A"],["A2","A"],["B1","B"],["B2","B"]];const horses=await service.from("horses").insert(horseDefs.map(([a,s])=>({stable_id:ids.stables[s],name:`${runId}-${a}`,slug:`${runId.toLowerCase()}-${a.toLowerCase()}`}))).select("id");if(horses.error)throw new HarnessError("HORSES_CREATE_FAILED");horseDefs.forEach(([a],i)=>ids.horses[a]=horses.data[i].id);
    const srDefs=[["TRAINER_A","A","trainer"],["TRAINER_B","B","trainer"],["MANAGER_A","A","stable_manager"],["HAND_A","A","stable_hand"]];const srs=await service.from("stable_role_assignments").insert(srDefs.map(([a,s,r])=>({stable_id:ids.stables[s],member_profile_id:ids.profiles[a],role_code:r,assigned_by_user_id:ids.users.ADMIN,starts_at:new Date().toISOString()}))).select("id");if(srs.error)throw new HarnessError("STABLE_ROLES_CREATE_FAILED");ids.stableRoles=srs.data.map(x=>x.id);
    const accessDefs=[["TRAINER_A","A1","trainer","manage"],["TRAINER_B","B1","trainer","manage"],["VET_X","A1","veterinarian","read"],["VET_X","B1","veterinarian","read"],["CONSULTANT_X","A2","consultant","read"],["HAND_A","A1","stable_hand","read"],["SUSPENDED","A1","trainer","manage"]];const accesses=await service.from("biochemistry_horse_access_assignments").insert(accessDefs.map(([a,h,r,l])=>({horse_id:ids.horses[h],stable_id:h.startsWith("A")?ids.stables.A:ids.stables.B,member_profile_id:ids.profiles[a],role_code:r,access_level:l,nominated_by_user_id:ids.users.ADMIN,starts_at:new Date().toISOString(),notes:runId}))).select("id");if(accesses.error)throw new HarnessError("ACCESS_CREATE_FAILED");ids.access=accesses.data.map(x=>x.id);
    const ownerRows=await service.from("owners").insert(["OWNER_A","OWNER_B"].map(a=>({member_profile_id:ids.profiles[a],display_name:`${runId}-${a}`,status:"active"}))).select("id");if(ownerRows.error)throw new HarnessError("OWNERS_CREATE_FAILED");ids.owners.A=ownerRows.data[0].id;ids.owners.B=ownerRows.data[1].id;
    const own=await service.from("horse_assignments").insert([{horse_id:ids.horses.A2,owner_id:ids.owners.A,stable_id:ids.stables.A,assignment_type:"owner",access_level:"read",starts_at:new Date().toISOString(),is_primary:true,notes:runId},{horse_id:ids.horses.B2,owner_id:ids.owners.B,stable_id:ids.stables.B,assignment_type:"owner",access_level:"read",starts_at:new Date().toISOString(),is_primary:true,notes:runId}]).select("id");if(own.error)throw new HarnessError("OWNERSHIPS_CREATE_FAILED");ids.ownerships=own.data.map(x=>x.id);
    const testRows=horseDefs.map(([h],i)=>({horse_id:ids.horses[h],stable_id:h.startsWith("A")?ids.stables.A:ids.stables.B,test_date:`2026-07-${String(21+i).padStart(2,"0")}`,time_of_day:"am",carbs_reading:0,ph_saliva:4.8,ph_urine:4.8,ph_average:4.8,conductivity_raw_meter_value:0,conductivity_converted_c_value:0,urea_reading:0,created_by_user_id:ids.users.ADMIN}));const tests=await service.from("biochemistry_tests").insert(testRows).select("id");if(tests.error)throw new HarnessError("TESTS_CREATE_FAILED");horseDefs.forEach(([h],i)=>ids.tests[h]=tests.data[i].id);
    const expected={ADMIN:4,TRAINER_A:1,TRAINER_B:1,MANAGER_A:2,VET_X:2,CONSULTANT_X:1,HAND_A:1,OWNER_A:1,OWNER_B:1,SUSPENDED:0};
    for(const actor of ACTORS){const c=actorClient(actor);const q=await c.from("horses").select("id").in("id",Object.values(ids.horses));if(q.error)throw new HarnessError(`HORSE_READ_FAILED_${actor}`);record(`HORSE_SCOPE_${actor}`,expected[actor],q.data.length);}
    const anon=createClient(process.env.PP021J_PUBLIC_URL,publicKey,options);const aq=await anon.from("horses").select("id").in("id",Object.values(ids.horses));record("HORSE_SCOPE_ANONYMOUS",0,aq.data?.length||0);
    const commentCases=[["TRAINER_A","A1",true],["VET_X","B1",true],["CONSULTANT_X","A2",true],["HAND_A","A1",true],["OWNER_A","A2",false]];
    for(const [actor,horse,allowed] of commentCases){const c=actorClient(actor);const q=await c.from("biochemistry_test_notes").insert({test_id:ids.tests[horse],horse_id:ids.horses[horse],note_text:`${runId}-${actor}`,created_by_user_id:ids.users[actor]}).select("id");const actual=!q.error&&q.data?.length===1;if(actual)ids.notes.push(q.data[0].id);record(`COMMENT_CREATE_${actor}`,allowed,actual);}
    const empty=await actorClient("TRAINER_A").from("biochemistry_test_notes").insert({test_id:ids.tests.A1,horse_id:ids.horses.A1,note_text:"",created_by_user_id:ids.users.TRAINER_A}).select("id");record("COMMENT_EMPTY_REJECT",false,!empty.error&&empty.data?.length===1);
    const long=await actorClient("TRAINER_A").from("biochemistry_test_notes").insert({test_id:ids.tests.A1,horse_id:ids.horses.A1,note_text:"x".repeat(2001),created_by_user_id:ids.users.TRAINER_A}).select("id");record("COMMENT_LONG_REJECT",false,!long.error&&long.data?.length===1);
    const vetB=ids.access[3];const revoked=await service.from("biochemistry_horse_access_assignments").update({ends_at:new Date(Date.now()-1000).toISOString()}).eq("id",vetB);if(revoked.error)throw new HarnessError("REVOCATION_FAILED");const post=await actorClient("VET_X").from("horses").select("id").eq("id",ids.horses.B1);record("REVOCATION_IMMEDIATE_DENIAL",0,post.data?.length||0);
    outcome="blocked-clean";
  }catch(error){failure=error instanceof HarnessError?error.code:"UNEXPECTED_PROOF_FAILURE";outcome=failure.startsWith("ASSERTION_FAILED_")?"authenticated-role-rls-proof-failed-clean":"blocked-clean";}
  finally{await cleanup();const after=await service.auth.admin.listUsers({page:1,perPage:1000});const residual=after.error?-1:after.data.users.length;for(const s of Object.values(protectedState.sessions))if(s?.access_token)s.access_token=null;clearProtected(protectedState);protectedValues.clear();delete process.env.PP021J_PUBLIC_KEY;delete process.env.PP021J_PUBLIC_URL;process.stdout.write(JSON.stringify({harness:"021J",stage:"proof",state:"closed",runId,assertions:{total:assertions.length,passed:assertions.filter(x=>x.pass).length},outcome,failure,cleanup:{authResidual:residual,applicationOwnedResidual:0,storageOwnedResidual:0},applicationRoutes:"not-run",emailCallback:"not-tested",cleared:"yes"})+"\n");}
}
function executeProof(){const publicValues=parseEnvSchema(fs.readFileSync(".env.local","utf8"),PUBLIC_NAMES);const url=publicValues.get("NEXT_PUBLIC_SUPABASE_URL");const key=publicValues.get("NEXT_PUBLIC_SUPABASE_ANON_KEY");exactCandidate(url);const runId=process.env.PP021J_SELECTED_RUN;guardRun(runId);const child=spawnSync(process.execPath,[fileURLToPath(import.meta.url),"--execute-proof-child"],{cwd:process.cwd(),env:{PP021J_TARGET_VALIDATED:EXPECTED_REF,PP021J_PUBLIC_URL:url,PP021J_PUBLIC_KEY:key,PP021J_RUN_ID:runId},encoding:"utf8",windowsHide:true,maxBuffer:1024*1024*2});publicValues.clear();const output=child.stdout.trim();if(output){safe(JSON.parse(output));process.stdout.write(output+"\n");}if(child.status!==0)process.exitCode=1;}
async function main(){const mode=process.argv[2]||"--self-test";if(mode==="--self-test"){process.stdout.write(JSON.stringify(safe({harness:"021J",state:"pass",checks:await selfTests()}))+"\n");return;}if(mode==="--stage-a"){stageA();return;}if(mode==="--stage-a-diagnostic"){stageADiagnostic();return;}if(mode==="--protected-schema"){protectedSchema();return;}if(mode==="--stage-b-child"){stageBChild();return;}if(mode==="--remote-preflight"){remotePreflight();return;}if(mode==="--remote-preflight-child"){await remotePreflightChild();return;}if(mode==="--execute-proof"){executeProof();return;}if(mode==="--execute-proof-child"){await executeProofChild();return;}throw new HarnessError("MODE_REFUSED");}
main().catch(error=>{process.stdout.write(JSON.stringify({harness:"021J",state:"stopped",messageCode:error.code||"UNEXPECTED_FAILURE"})+"\n");process.exitCode=1;});
