#!/usr/bin/env node

import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";

const REF = "uvskssaecdhxcgytkasc";
const ENV_ROOT = "C:/tmp/pnr-023l-remote-application-and-hosted-proof";
const PREVIEW_HOST_PATTERN = /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/;

function fail(code) { const error = new Error(code); error.code = code; throw error; }
function envFile(path) { return Object.fromEntries(readFileSync(path, "utf8").split(/\r?\n/).map(line => line.match(/^([A-Z0-9_]+)=(.*)$/)).filter(Boolean).map(match => [match[1], match[2]])); }
function config() {
  const pub = envFile(`${ENV_ROOT}/.env.local`); const sec = envFile(`${ENV_ROOT}/.env.test.local`);
  const url = pub.NEXT_PUBLIC_SUPABASE_URL; const anon = pub.NEXT_PUBLIC_SUPABASE_ANON_KEY; const service = sec.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !service || new URL(url).hostname !== `${REF}.supabase.co`) fail("TARGET_REFUSED");
  return { url, anon, service };
}
async function allUsers(admin) { const records=[]; for(let page=1;page<=20;page+=1){const r=await admin.auth.admin.listUsers({page,perPage:1000});if(r.error)fail("AUTH_SEARCH_FAILED");records.push(...r.data.users);if(r.data.users.length<1000)return records;}fail("AUTH_SEARCH_BOUNDED"); }
async function removeTable(admin, table, ids) { if (!ids?.length) return; const r=await admin.from(table).delete().in("id",ids); if(r.error) fail(`CLEAN_${table.toUpperCase()}`); }

async function prepare(statePath, preview) {
  if (!statePath || existsSync(statePath)) fail("STATE_PATH_REFUSED");
  const previewUrl=new URL(preview); if(previewUrl.protocol!=="https:"||!PREVIEW_HOST_PATTERN.test(previewUrl.hostname)||previewUrl.pathname!=="/")fail("PREVIEW_REFUSED");
  const protectedConfig=config(); const run=`035D-MANUAL-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const local=`manual-${randomBytes(8).toString("hex")}+${run.toLowerCase()}`; let email=[local,"example.invalid"].join("@");
  const admin=createClient(protectedConfig.url,protectedConfig.service,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
  const owned={auth:[],users:[],profiles:[],memberships:[],stables:[],horses:[],access:[],tests:[]}; let accessToken=null,refreshToken=null,artifact=null;
  try {
    const before=await allUsers(admin); if(before.some(u=>u.user_metadata?.synthetic_run===run)||before.some(u=>(u.email||"").toLowerCase()===email.toLowerCase()))fail("OWNERSHIP_OPENING_REFUSED");
    let r=await admin.auth.admin.createUser({email,email_confirm:true,user_metadata:{synthetic_run:run,synthetic_purpose:"manual-trainer-preview"}}); if(r.error||!r.data.user?.email_confirmed_at)fail("AUTH_CREATE_FAILED"); const authId=r.data.user.id;owned.auth.push(authId);
    r=await admin.from("users").insert({auth_user_id:authId,email,status:"active",primary_role_code:"trainer"}).select("id").single();if(r.error)fail("APP_USER_CREATE");const userId=r.data.id;owned.users.push(userId);
    r=await admin.from("member_profiles").insert({user_id:userId,display_name:"Synthetic Trainer Preview",is_active:true}).select("id").single();if(r.error)fail("PROFILE_CREATE");const profileId=r.data.id;owned.profiles.push(profileId);
    const level=await admin.from("membership_levels").select("id").eq("code","trainer").single();if(level.error)fail("LEVEL_QUERY");
    r=await admin.from("user_membership_levels").insert({user_id:userId,membership_level_id:level.data.id,starts_at:new Date().toISOString()}).select("id").single();if(r.error)fail("MEMBERSHIP_CREATE");owned.memberships.push(r.data.id);
    r=await admin.from("stables").insert({name:`Synthetic Preview Stable ${run}`,code:`S35D${run.slice(-6)}`,status:"active"}).select("id").single();if(r.error)fail("STABLE_CREATE");const stableId=r.data.id;owned.stables.push(stableId);
    for(const [suffix,status,score] of [["Assigned","unscored",null],["Wrong Horse","scored",0.5]]){r=await admin.from("horses").insert({stable_id:stableId,name:`Synthetic ${suffix} ${run}`,slug:`${run.toLowerCase()}-${suffix.toLowerCase().replaceAll(" ","-")}`,status:"active",breed:"Synthetic",colour:"Synthetic"}).select("id").single();if(r.error)fail("HORSE_CREATE");owned.horses.push(r.data.id);if(suffix==="Assigned"){const horseId=r.data.id;let q=await admin.from("biochemistry_horse_access_assignments").insert({horse_id:horseId,stable_id:stableId,member_profile_id:profileId,role_code:"trainer",access_level:"manage",nominated_by_user_id:userId,starts_at:new Date().toISOString()}).select("id").single();if(q.error)fail("ACCESS_CREATE");owned.access.push(q.data.id);q=await admin.from("biochemistry_tests").insert({horse_id:horseId,stable_id:stableId,test_date:"2026-07-30",time_of_day:"am",carbs_reading:1,ph_saliva:7,ph_urine:7,ph_average:7,conductivity_raw_meter_value:1,conductivity_converted_c_value:1.43,urea_reading:1,scoring_status:status,scoring_blockers:[],health_score:score,created_by_user_id:userId,updated_by_user_id:userId}).select("id").single();if(q.error)fail("TEST_CREATE");owned.tests.push(q.data.id);}}
    r=await admin.auth.admin.generateLink({type:"magiclink",email});if(r.error||!r.data.properties?.hashed_token)fail("SESSION_ARTIFACT_CREATE");artifact=r.data.properties.hashed_token;
    const client=createClient(protectedConfig.url,protectedConfig.anon,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});r=await client.auth.verifyOtp({token_hash:artifact,type:"email"});artifact=null;if(r.error||!r.data.session||r.data.user?.id!==authId)fail("ORDINARY_SESSION_CREATE");accessToken=r.data.session.access_token;refreshToken=r.data.session.refresh_token;
    const known=await allUsers(admin);const exact=known.filter(u=>u.id===authId&&u.user_metadata?.synthetic_run===run);if(exact.length!==1)fail("OWNERSHIP_VERIFY_FAILED");
    writeFileSync(statePath,JSON.stringify({project:REF,run,preview,owned,accessToken,refreshToken,sessionUser:authId,storage:0}),{encoding:"utf8",flag:"wx",mode:0o600});
    process.stdout.write(`${JSON.stringify({state:"prepared",application:owned.users.length+owned.profiles.length+owned.memberships.length+owned.stables.length+owned.horses.length+owned.access.length+owned.tests.length,auth:1,storage:0,emailSent:false,ordinarySession:true})}\n`);
  } catch(error) {
    try{await removeTable(admin,"biochemistry_tests",owned.tests);await removeTable(admin,"biochemistry_horse_access_assignments",owned.access);await removeTable(admin,"horses",owned.horses);await removeTable(admin,"stables",owned.stables);await removeTable(admin,"user_membership_levels",owned.memberships);await removeTable(admin,"member_profiles",owned.profiles);await removeTable(admin,"users",owned.users);for(const id of owned.auth)await admin.auth.admin.deleteUser(id,false);}catch{}
    throw error;
  } finally {email="";artifact=null;accessToken=null;refreshToken=null;protectedConfig.service=null;protectedConfig.anon=null;}
}

async function cleanup(statePath) {
  if(!statePath||!existsSync(statePath))fail("STATE_MISSING");const state=JSON.parse(readFileSync(statePath,"utf8"));if(state.project!==REF||!state.run?.startsWith("035D-MANUAL-")||state.storage!==0)fail("STATE_REFUSED");
  const protectedConfig=config();const admin=createClient(protectedConfig.url,protectedConfig.service,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});const o=state.owned;
  await removeTable(admin,"biochemistry_tests",o.tests);await removeTable(admin,"biochemistry_horse_access_assignments",o.access);await removeTable(admin,"horses",o.horses);await removeTable(admin,"stables",o.stables);await removeTable(admin,"user_membership_levels",o.memberships);await removeTable(admin,"member_profiles",o.profiles);await removeTable(admin,"users",o.users);
  const known=await allUsers(admin);const ownedAuth=known.filter(u=>u.id===o.auth[0]&&u.user_metadata?.synthetic_run===state.run);if(ownedAuth.length!==1)fail("AUTH_OWNERSHIP_REFUSED");const removed=await admin.auth.admin.deleteUser(o.auth[0],false);if(removed.error)fail("AUTH_DELETE_FAILED");
  const after=await allUsers(admin);if(after.some(u=>u.id===o.auth[0]))fail("AUTH_DELETE_VERIFY_FAILED");unlinkSync(statePath);protectedConfig.service=null;protectedConfig.anon=null;process.stdout.write(`${JSON.stringify({state:"clean",application:0,auth:0,storage:0,authLast:true})}\n`);
}

function selfTest(){const output=JSON.stringify({state:"pass",checks:["exact-preview-only","admin-confirmed-no-email","ordinary-session-only","synthetic-data-only","wrong-horse-fixture","protected-state","dependency-cleanup","auth-last"]});if(/@|eyJ|[0-9a-f]{8}-[0-9a-f]{4}/i.test(output))fail("SELF_PROTECTED_OUTPUT");process.stdout.write(`${output}\n`);}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const mode=process.argv[2]||"--self-test";Promise.resolve(mode==="--self-test"?selfTest():mode==="--prepare"?prepare(process.argv[3],process.argv[4]):mode==="--cleanup"?cleanup(process.argv[3]):fail("MODE_REFUSED")).catch(error=>{process.stdout.write(`${JSON.stringify({state:"failed-sanitized",code:/^[A-Z0-9_]+$/.test(error.code||error.message)?(error.code||error.message):"UNEXPECTED"})}\n`);process.exitCode=2;});}
