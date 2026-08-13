import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { CLASSES, SOURCE, DiscoveryError } from "./provider-authority-projections-036O.mjs";

const fail = (code, context) => { const error=new DiscoveryError(code);if(context)error.context=Object.freeze(context);throw error; };
export const PHASES = Object.freeze(["local", "source", "vercel", "supabase", "resend", "stripe", "railway", "reconcile", "close"]);
export const REACHABILITY = Object.freeze(["required", "not-reachable-proven", "unknown-blocking"]);
export const SINKS = Object.freeze(["browser-client", "pkce-callback", "middleware-session-refresh", "server-client", "admin-client", "trainer-sign-in", "auth-session", "portal", "dashboard", "horse", "cron-enquiry", "stripe-webhook", "external-email", "railway", "accepted-live-deployment", "addressable-deployment"]);
const SOURCE_GRAPHS = new WeakSet();
const FALLBACK_MANIFESTS = new WeakSet();
const MAX_FILES = 5000, MAX_BLOB_BYTES = 524288, MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const CODE = /\.(?:[cm]?[jt]sx?|json|sql)$/i;
const ADMIT = /^(?:app|lib|components|supabase\/(?:functions|migrations))\//;
const ROOT = /^(?:middleware\.ts|vercel\.json)$/;
const EXCLUDE = /^(?:docs|planning|evidence|references|scripts)\/|(^|\/)(?:tests?|__tests__|fixtures?)(\/|$)|(^|\/)(?:test|spec)[.-]/i;
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", "/index.ts", "/index.tsx", "/index.js"];
const EXACT_ROW_KEYS = Object.freeze(["class", "authority", "consumerCount", "graphComplete", "providerEvidence", "paginationComplete", "reachability", "replacement", "installTargets", "readback", "predecessorAction", "predecessorOracle", "manualUiRequired", "laterMutation"]);
const CAPABILITIES = Object.freeze({
  SUPABASE_SERVICE_ROLE_KEY:["Supabase","modern secret key create/select or legacy dashboard replacement","server/admin provider targets","provider metadata or harmless admin auth","delete/revoke exact key","independent metadata absence or auth rejection"],
  CRON_SECRET:["Vercel","generate replacement","Vercel environment targets","protected route non-mutating rejection","remove predecessor binding","old-route rejection"],
  ENQUIRY_ABUSE_HMAC_SECRET:["Vercel","generate replacement","Vercel environment targets","enquiry preflight authentication only","remove predecessor binding","binding and deployment absence"],
  PUBLIC_ENQUIRY_SMTP_PASS:["Resend/Vercel","create/select restricted SMTP credential","Vercel environment targets","metadata authentication without send","delete predecessor key","key metadata absence or auth rejection"],
  STRIPE_SECRET_KEY:["Stripe/Vercel","create restricted key","Vercel environment targets","account retrieval","expire/delete predecessor","exact key absence or harmless auth rejection"],
  STRIPE_WEBHOOK_SECRET:["Stripe/Vercel","roll endpoint secret","Vercel environment target","webhook metadata only","expire predecessor","no non-business rejection oracle established"],
  RAILWAY_API_TOKEN:["Railway/Vercel","create scoped token","Railway/Vercel install target","bounded GraphQL query","revoke predecessor","readback absence or auth rejection"]
});

const runText = (run, args) => { try { return run("git", args, { encoding:"utf8", stdio:["ignore","pipe","ignore"] }).toString(); } catch { fail("SOURCE_OBJECT_REFUSED"); } };
const blob = (file, run) => { const text=runText(run,["show",`${SOURCE}:${file}`]); const bytes=Buffer.byteLength(text); if(bytes>MAX_BLOB_BYTES) fail("SOURCE_BOUNDS_REFUSED"); return {file,text,bytes,sha256:createHash("sha256").update(text).digest("hex")}; };
const admitted = (file) => CODE.test(file) && !EXCLUDE.test(file) && (ADMIT.test(file)||ROOT.test(file));
const imports = (text) => { const out=[]; const patterns=[/(?:import|export)\s+(?:[^"']*?\s+from\s*)?["']([^"']+)["']/g,/import\(\s*["']([^"']+)["']\s*\)/g,/require\(\s*["']([^"']+)["']\s*\)/g]; for(const re of patterns)for(const m of text.matchAll(re))if((m[1].startsWith(".")||m[1].startsWith("@/"))&&(!path.posix.extname(m[1])||/\.(?:[cm]?[jt]sx?|json)$/i.test(m[1])))out.push(m[1]); return [...new Set(out)]; };
const resolveLocal = (from, spec, fileSet) => { const base=spec.startsWith("@/")?spec.slice(2):path.posix.normalize(path.posix.join(path.posix.dirname(from),spec)); const found=EXTENSIONS.map(x=>base+x).filter(x=>fileSet.has(x)); if(found.length>1)fail("SOURCE_IMPORT_AMBIGUOUS",{from,spec,candidates:Object.freeze(found)});return found[0]??null; };
const sinkKinds = (file, text) => { const out=[]; if(/app\/auth\/callback\/route\./.test(file))out.push("pkce-callback","auth-session"); if(file==="middleware.ts"||/supabase\/middleware/.test(file))out.push("middleware-session-refresh","auth-session"); if(/supabase\/admin/.test(file))out.push("admin-client","server-client"); if(/supabase\/(?:server|client)/.test(file))out.push(file.includes("client")?"browser-client":"server-client"); if(/app\/\(portal\)\/portal/.test(file))out.push("portal"); if(/dashboard/.test(file))out.push("dashboard"); if(/horses?/.test(file))out.push("horse"); if(/api\/internal\/(?:evidence|enquiries)|cron/i.test(file))out.push("cron-enquiry"); if(/stripe\/webhook/.test(file))out.push("stripe-webhook"); if(/enquir|resend|smtp/i.test(file))out.push("external-email"); if(/railway/i.test(text)||file==="vercel.json")out.push("railway"); return [...new Set(out)]; };
const envRoots = (text, className) => { const escaped=className.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); const exact=new RegExp(`process\\.env(?:\\.${escaped}|\\[["']${escaped}["']\\])`); const dynamic=/process\.env\s*\[[^"'][^\]]*\]/.test(text); return {exact:exact.test(text),dynamic}; };

export function buildSourceGraph(run=execFileSync){
  const listed=runText(run,["ls-tree","-r","--name-only",SOURCE]).split(/\r?\n/).filter(Boolean);
  if(listed.length>MAX_FILES)fail("SOURCE_BOUNDS_REFUSED");
  const files=listed.filter(admitted).sort(), fileSet=new Set(files), records=new Map(); let total=0;
  for(const file of files){const item=blob(file,run);total+=item.bytes;if(total>MAX_TOTAL_BYTES)fail("SOURCE_BOUNDS_REFUSED");records.set(file,item)}
  const forward=new Map(files.map(x=>[x,[]])), reverse=new Map(files.map(x=>[x,[]])), unresolved=[];
  for(const file of files)for(const spec of imports(records.get(file).text)){const target=resolveLocal(file,spec,fileSet);if(!target){unresolved.push(Object.freeze({from:file,spec}));continue}forward.get(file).push(target);reverse.get(target).push(file)}
  const rows=CLASSES.map(className=>{
    const roots=[];let dynamic=false;for(const file of files){const hit=envRoots(records.get(file).text,className);if(hit.exact){if(/^\s*["']use client["']/.test(records.get(file).text))fail("CLIENT_SECRET_BOUNDARY_REFUSED");roots.push(file)}if(hit.dynamic)dynamic=true}
    const visited=new Set(roots),queue=[...roots];while(queue.length){for(const dependent of reverse.get(queue.shift())??[])if(!visited.has(dependent)){visited.add(dependent);queue.push(dependent)}}
    const consumers=[...visited].sort().map(file=>Object.freeze({path:file,sha256:records.get(file).sha256,sinks:Object.freeze(sinkKinds(file,records.get(file).text))}));
    return Object.freeze({class:className,sourceExcluded:roots.length===0,dynamicEnvironment:dynamic,graphComplete:!dynamic&&unresolved.length===0,roots:Object.freeze(roots),consumers:Object.freeze(consumers)});
  });
  const graph=Object.freeze({gitObject:SOURCE,fileCount:files.length,totalBytes:total,graphHash:createHash("sha256").update(JSON.stringify({rows,unresolved})).digest("hex"),classes:Object.freeze(rows),unresolvedImports:Object.freeze(unresolved),complete:unresolved.length===0&&rows.every(x=>x.graphComplete),providerDeploymentSinksResolved:false});SOURCE_GRAPHS.add(graph);return graph;
}

export function buildFallbackManifest(graph){if(!SOURCE_GRAPHS.has(graph))fail("SOURCE_GRAPH_REFUSED");const rows=CLASSES.map(className=>{const source=graph.classes.find(x=>x.class===className),c=CAPABILITIES[className];return Object.freeze({class:className,authority:c[0],consumerCount:source.consumers.length,graphComplete:source.graphComplete,providerEvidence:false,paginationComplete:false,reachability:"unknown-blocking",replacement:c[1],installTargets:c[2],readback:c[3],predecessorAction:c[4],predecessorOracle:c[5],manualUiRequired:className==="STRIPE_WEBHOOK_SECRET",laterMutation:"blocked"})});const manifest=Object.freeze({sourceGraphHash:graph.graphHash,rows:Object.freeze(rows),providerEvidence:false});FALLBACK_MANIFESTS.add(manifest);return manifest}
export function validateManifest(manifest){if(!FALLBACK_MANIFESTS.has(manifest)||manifest.providerEvidence!==false||!Array.isArray(manifest.rows)||manifest.rows.length!==7)fail("MANIFEST_REFUSED");manifest.rows.forEach((row,i)=>{if(Object.keys(row).sort().join("|")!==[...EXACT_ROW_KEYS].sort().join("|")||row.class!==CLASSES[i]||!REACHABILITY.includes(row.reachability)||row.reachability!=="unknown-blocking"||row.providerEvidence!==false||row.paginationComplete!==false)fail("MANIFEST_REFUSED")});return manifest}
export function classifyOutcome(manifest){validateManifest(manifest);return "provider-authority-discovery-blocked-clean"}
export function createController(){let index=-1,closed=false;const ledger=[];return Object.freeze({advance(phase,projection={}){if(closed||PHASES[index+1]!==phase)fail("PHASE_ORDER_REFUSED");if(!projection||typeof projection!=="object"||Array.isArray(projection)||Object.keys(projection).some(k=>/(secret|token|password|raw|value)/i.test(k)))fail("PROJECTION_REFUSED");index++;if(phase==="close")closed=true;const entry=Object.freeze({phase,code:`${phase.toUpperCase()}_LOCAL`,providerReads:0,actions:0,mutations:0,residue:0});ledger.push(entry);return entry},snapshot(){return Object.freeze({phase:index<0?"not-started":PHASES[index],ledger:Object.freeze([...ledger]),providerReads:0,externalActions:0,mutations:0,residue:0})}})}
if(process.argv[2]==="--protected-child"){process.stderr.write("SANITIZED_CHILD_FAILURE\n");process.exitCode=1}