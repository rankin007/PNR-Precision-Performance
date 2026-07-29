#!/usr/bin/env node
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import { chromium } from "playwright-core";

const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT=34631, ORIGIN=`http://127.0.0.1:${PORT}`;
const TIMEOUT=30000;
const safe=(value)=>{const text=JSON.stringify(value);if(/@|eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_|access[_-]?token|refresh[_-]?token|cookie|password|otp|magic.?link|https?:\/\/[^" ]+\?.+=/i.test(text))throw new Error("OUTPUT_REFUSED");return value};
const bounded=(promise,code)=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error(code)),TIMEOUT))]);
const portFree=()=>new Promise(resolve=>{const s=net.createServer();s.once("error",()=>resolve(false));s.listen(PORT,"127.0.0.1",()=>s.close(()=>resolve(true)))});
assert(await portFree());
const server=http.createServer((req,res)=>{const marker=/pp031b=([^;]+)/.exec(req.headers.cookie||"")?.[1]||"none";res.writeHead(200,{"content-type":"text/html","cache-control":"no-store"});res.end(`<main><h1>transport</h1><p id="marker">${marker}</p></main>`)});
await bounded(new Promise((resolve,reject)=>{server.once("error",reject);server.listen(PORT,"127.0.0.1",resolve)}),"SERVER_TIMEOUT");
let browser;
const contexts=[];
try{
 browser=await bounded(chromium.launch({executablePath:CHROME,headless:true,args:["--no-first-run","--disable-extensions","--disable-sync"]}),"LAUNCH_TIMEOUT");
 for(const actor of ["ADMIN","WRITER","READONLY"]){
  const context=await browser.newContext();contexts.push(context);
  await context.addCookies([{name:"pp031b",value:actor,domain:"127.0.0.1",path:"/",sameSite:"Lax",secure:false,httpOnly:true}]);
  const page=await context.newPage();await bounded(page.goto(ORIGIN,{waitUntil:"load"}),"NAV_TIMEOUT");
  assert.equal(await page.locator("#marker").textContent(),actor);
 }
 for(let i=0;i<contexts.length;i++){const page=contexts[i].pages()[0];assert.equal(await page.locator("#marker").textContent(),["ADMIN","WRITER","READONLY"][i])}
 await contexts[1].clearCookies();await contexts[1].pages()[0].reload();assert.equal(await contexts[1].pages()[0].locator("#marker").textContent(),"none");
 assert.throws(()=>safe({result:"token-shaped",value:"eyJabcdefghijklmnop.qrstuvwxyz012345"}));
 assert.throws(()=>safe({result:"email",value:"actor@example.invalid"}));
}finally{
 for(const context of contexts.reverse())await context.close().catch(()=>{});
 await browser?.close().catch(()=>{});
 await new Promise(resolve=>server.close(resolve));
}
assert(await portFree());
console.log(JSON.stringify(safe({harness:"031B",state:"pass",checks:9,actors:3,isolation:"pass",revocation:"pass",redaction:"pass",timeout:"bounded",processes:0})));
