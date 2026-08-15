import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const PROJECTION_VERSION=1;
export const RAW_STDOUT_LIMIT=4194304;
export const PAGE_LIMIT=10;
export const ROW_LIMIT=200;
export const EXPECTED_VERCEL_VERSION="50.42.0";
export const EXPECTED_LIST_SOURCE_SHA256="8376a6d957c6fe20a9a1d4738000eb60a519bd079c70f0a82c9e7b59ba9ee367";
const top=["contextName","deployments","pagination"];
const rowKeys=["id","url","name","state","target","customEnvironment","createdAt","buildingAt","ready","creator","meta"];
const pageKeys=["count","next","prev"];
const states=new Set(["READY","ERROR","CANCELED","BUILDING","INITIALIZING","QUEUED"]);
const targets=new Set(["production","preview"]);
const fail=code=>{throw new Error(code);};
const record=v=>v!==null&&typeof v==="object"&&!Array.isArray(v);
function exact(v,allowed,required,code="INVENTORY_JSON_REFUSED"){
  if(!record(v))fail(code);
  const keys=Object.keys(v);
  if(keys.some(k=>!allowed.includes(k))||required.some(k=>!keys.includes(k)))fail(code);
}
const timestamp=v=>Number.isSafeInteger(v)&&v>=0;
export function isStrictDeploymentHostname(v){
  if(typeof v!=="string"||v.length>253||v!==v.toLowerCase()||!v.endsWith(".vercel.app")||/[:/?#]/.test(v))return false;
  return v.split(".").every(x=>x.length>0&&x.length<=63&&/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(x));
}
function opaque(r,k){
  if(!Object.prototype.hasOwnProperty.call(r,k))return;
  const v=r[k];
  if(v!==null&&!record(v))fail("INVENTORY_PROTECTED_CONTAINER_REFUSED");
}
export function projectDeploymentListPayload(v){
  exact(v,top,top);
  if(typeof v.contextName!=="string"||!v.contextName||!Array.isArray(v.deployments))fail("INVENTORY_JSON_REFUSED");
  exact(v.pagination,pageKeys,pageKeys);
  const {count,next,prev}=v.pagination;
  if(!Number.isSafeInteger(count)||count<0||count>20||count!==v.deployments.length)fail("INVENTORY_PAGINATION_REFUSED");
  for(const c of [next,prev])if(c!==null&&(!Number.isSafeInteger(c)||c<0||String(c).length>16))fail("INVENTORY_PAGINATION_REFUSED");
  const seen=new Set();
  const rows=v.deployments.map(r=>{
    exact(r,rowKeys,["url","name","state","target","createdAt","ready"]);
    opaque(r,"creator");opaque(r,"meta");
    if(Object.prototype.hasOwnProperty.call(r,"id")&&(typeof r.id!=="string"||!/^dpl_[A-Za-z0-9]+$/.test(r.id)))fail("INVENTORY_ID_REFUSED");
    if(!isStrictDeploymentHostname(r.url)||seen.has(r.url))fail("INVENTORY_HOSTNAME_REFUSED");
    seen.add(r.url);
    if(typeof r.name!=="string"||!r.name||r.name.length>255)fail("INVENTORY_JSON_REFUSED");
    if(typeof r.state!=="string"||!states.has(r.state))fail("INVENTORY_STATE_REFUSED");
    if(r.target!==null&&(typeof r.target!=="string"||!targets.has(r.target)))fail("INVENTORY_TARGET_REFUSED");
    if(Object.prototype.hasOwnProperty.call(r,"customEnvironment")&&r.customEnvironment!==null)fail("INVENTORY_CUSTOM_ENVIRONMENT_REFUSED");
    if(!timestamp(r.createdAt)||!timestamp(r.ready)||(Object.prototype.hasOwnProperty.call(r,"buildingAt")&&!timestamp(r.buildingAt)))fail("INVENTORY_TIMESTAMP_REFUSED");
    return {deploymentHost:r.url,stateClass:r.state,targetClass:r.target===null?"preview":r.target,createdAt:r.createdAt};
  });
  return {projectionVersion:1,rows,pagination:{count,next,prev}};
}
export function parseAndProjectRaw(raw){
  if(!Buffer.isBuffer(raw))fail("INVENTORY_RAW_TYPE_REFUSED");
  if(raw.length<1||raw.length>RAW_STDOUT_LIMIT)fail("INVENTORY_RAW_SIZE_REFUSED");
  let value;
  try{value=JSON.parse(raw.toString("utf8"));}catch{fail("INVENTORY_RAW_JSON_REFUSED");}
  try{return projectDeploymentListPayload(value);}finally{value=undefined;}
}
export function validateSanitizedProjection(v){
  exact(v,["projectionVersion","rows","pagination"],["projectionVersion","rows","pagination"],"PROJECTION_CONTRACT_REFUSED");
  if(v.projectionVersion!==1||!Array.isArray(v.rows))fail("PROJECTION_VERSION_REFUSED");
  exact(v.pagination,pageKeys,pageKeys,"PROJECTION_CONTRACT_REFUSED");
  if(!Number.isSafeInteger(v.pagination.count)||v.pagination.count<0||v.pagination.count>20||v.pagination.count!==v.rows.length)fail("PROJECTION_CONTRACT_REFUSED");
  for(const c of [v.pagination.next,v.pagination.prev])if(c!==null&&(!Number.isSafeInteger(c)||c<0||String(c).length>16))fail("PROJECTION_CONTRACT_REFUSED");
  const seen=new Set();
  for(const r of v.rows){
    exact(r,["deploymentHost","stateClass","targetClass","createdAt"],["deploymentHost","stateClass","targetClass","createdAt"],"PROJECTION_CONTRACT_REFUSED");
    if(!isStrictDeploymentHostname(r.deploymentHost)||seen.has(r.deploymentHost)||!states.has(r.stateClass)||!targets.has(r.targetClass)||!timestamp(r.createdAt))fail("PROJECTION_CONTRACT_REFUSED");
    seen.add(r.deploymentHost);
  }
  return v;
}
async function once(fetchPage){
  const rows=[],hosts=new Set(),cursors=new Set();let next=null,first;
  for(let p=0;p<PAGE_LIMIT;p+=1){
    const page=validateSanitizedProjection(await fetchPage(next));if(!first)first=page;
    for(const r of page.rows){if(hosts.has(r.deploymentHost)||rows.length>=ROW_LIMIT)fail("INVENTORY_SNAPSHOT_REFUSED");hosts.add(r.deploymentHost);rows.push(r);}
    if(page.pagination.next===null)return {first,rows,pageCount:p+1};
    const cursor=String(page.pagination.next);if(cursors.has(cursor))fail("INVENTORY_SNAPSHOT_REFUSED");cursors.add(cursor);next=page.pagination.next;
  }
  fail("INVENTORY_SNAPSHOT_REFUSED");
}
const sameHead=(a,b)=>JSON.stringify(a.rows)===JSON.stringify(b.rows)&&JSON.stringify(a.pagination)===JSON.stringify(b.pagination);
export async function walkStableInventory(fetchPage){
  for(let restartCount=0;restartCount<=1;restartCount+=1){
    const walk=await once(fetchPage),head=validateSanitizedProjection(await fetchPage(null));
    if(sameHead(walk.first,head))return {rows:walk.rows,pageCount:walk.pageCount,restartCount,headStable:true};
  }
  fail("INVENTORY_SNAPSHOT_REFUSED");
}
function captured(exe,args,limit,shell=false){
  return new Promise((resolve,reject)=>{
    const child=spawn(exe,args,{cwd:process.cwd(),env:{...process.env,NO_UPDATE_NOTIFIER:"1"},windowsHide:true,stdio:["ignore","pipe","pipe"],shell});
    const out=[];let bytes=0,errBytes=0,bad=false;
    const timer=setTimeout(()=>{bad=true;child.kill();},60000);
    child.stdout.on("data",chunk=>{bytes+=chunk.length;if(bytes>limit){bad=true;child.kill();}else out.push(chunk);});
    child.stderr.on("data",chunk=>{errBytes+=chunk.length;if(errBytes>1048576){bad=true;child.kill();}});
    child.on("error",()=>{clearTimeout(timer);reject(new Error("INVENTORY_PROCESS_REFUSED"));});
    child.on("close",code=>{clearTimeout(timer);if(bad||code!==0)reject(new Error("INVENTORY_PROCESS_REFUSED"));else resolve(Buffer.concat(out));});
  });
}
function quote(v){
  if(typeof v!=="string"||!v||/["&|<>^%!\r\n]/.test(v))fail("INVENTORY_VECTOR_REFUSED");
  return '"'+v+'"';
}
export function buildValidatedShellCommand(command,args){
  if(!Array.isArray(args)||args.length<1)fail("INVENTORY_VECTOR_REFUSED");
  return [command,...args].map(quote).join(" ");
}
function installedCommand(){
  if(process.platform!=="win32"||typeof process.env.APPDATA!=="string")fail("INVENTORY_PROCESS_REFUSED");
  const command=join(process.env.APPDATA,"npm","vercel.cmd");
  const source=join(process.env.APPDATA,"npm","node_modules","vercel","dist","commands","list","index.js");
  if(createHash("sha256").update(readFileSync(source)).digest("hex")!==EXPECTED_LIST_SOURCE_SHA256)fail("INVENTORY_SOURCE_REFUSED");
  return command;
}
async function vercel(command,args,limit){
  const shell=process.env.ComSpec;
  if(typeof shell!=="string"||!/[\\/]cmd\.exe$/i.test(shell))fail("INVENTORY_PROCESS_REFUSED");
  const commandLine=buildValidatedShellCommand(command,args);
  return captured(commandLine,[],limit,shell);
}
export async function runLiveProjection(argv){
  let mode,next=null;
  if(argv.length===2&&argv[0]==="--mode"&&["full","owned"].includes(argv[1]))mode=argv[1];
  else if(argv.length===4&&argv[0]==="--mode"&&["full","owned"].includes(argv[1])&&argv[2]==="--next"&&/^[0-9]{1,16}$/.test(argv[3])){mode=argv[1];next=argv[3];}
  else fail("INVENTORY_VECTOR_REFUSED");
  const command=installedCommand();
  const version=(await vercel(command,["--version"],4096)).toString("utf8").trim().replace(/^Vercel CLI\s+/i,"");
  if(version!==EXPECTED_VERCEL_VERSION)fail("INVENTORY_CLI_VERSION_REFUSED");
  const args=mode==="owned"?["list","--meta","pp_sprint=029W","--format","json","--no-color"]:["list","--format","json","--no-color"];
  if(next!==null)args.push("--next",next);
  const raw=await vercel(command,args,RAW_STDOUT_LIMIT);
  try{return parseAndProjectRaw(raw);}finally{raw.fill(0);}
}
async function main(){
  try{process.stdout.write(JSON.stringify(await runLiveProjection(process.argv.slice(2)))+"\n");}
  catch(error){const code=error instanceof Error&&/^[A-Z0-9_]+$/.test(error.message)?error.message:"INVENTORY_PROJECTOR_REFUSED";process.stderr.write(code+"\n");process.exitCode=1;}
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1])await main();