import assert from "node:assert/strict";
import { createPkce, buildAuthorizationUrl, validateCallback, validateTokenResponse, classifyTokenFailure, GMAIL_READONLY } from "./gmail-oauth-035I.mjs";
import { buildGetRequest, buildListRequest, classifyGmailMessages, derivePlusAddress, gmailFetch, parseMessage } from "./gmail-mailbox-035I.mjs";

const random = (length) => Buffer.alloc(length, 7); const pkce = createPkce(random);
assert.match(pkce.challenge, /^[A-Za-z0-9_-]+$/); assert.notEqual(pkce.verifier, pkce.challenge);
const redirectUri="http://127.0.0.1:49123/oauth/callback";
const auth=buildAuthorizationUrl({clientId:"fixture-client",redirectUri,challenge:pkce.challenge,state:pkce.state});
assert.equal(auth.searchParams.get("scope"),GMAIL_READONLY); assert.equal(auth.searchParams.get("code_challenge_method"),"S256"); assert.equal(auth.searchParams.get("response_type"),"code");
assert.throws(()=>buildAuthorizationUrl({clientId:"x",redirectUri:"http://localhost:1/oauth/callback",challenge:"x",state:"x"}),/REDIRECT/);
assert.equal(validateCallback({callbackUrl:`${redirectUri}?code=fixture-code&state=${pkce.state}`,expectedState:pkce.state,redirectUri}),"fixture-code");
for(const url of [`${redirectUri}?code=x&state=wrong`,`${redirectUri}?error=denied&state=${pkce.state}`,`http://127.0.0.1:49124/oauth/callback?code=x&state=${pkce.state}`]) assert.throws(()=>validateCallback({callbackUrl:url,expectedState:pkce.state,redirectUri}));
const token=validateTokenResponse({access_token:"fixture-access",refresh_token:"fixture-refresh",token_type:"Bearer",expires_in:3600,scope:GMAIL_READONLY},{requireRefresh:true}); assert.equal(token.scope,GMAIL_READONLY);
assert.throws(()=>validateTokenResponse({access_token:"x",token_type:"Bearer",expires_in:1,scope:`${GMAIL_READONLY} https://mail.google.com/`}),/SCOPE/);
assert.equal(classifyTokenFailure({error:"invalid_grant"},false),"reauthorization-required"); assert.equal(classifyTokenFailure({error:"invalid_grant"},true),"cleanup-only");

assert.equal(derivePlusAddress("Runner@Test.Invalid","035i-run-abc123"),"runner+035i-run-abc123@test.invalid"); assert.throws(()=>derivePlusAddress("runner+old@test.invalid","035i-run-abc123"));
const list=new URL(buildListRequest({sender:"sender@test.invalid",afterEpochSeconds:100,maxResults:5}).url); assert.equal(list.pathname,"/gmail/v1/users/me/messages"); assert.equal(list.searchParams.get("includeSpamTrash"),"false"); assert.equal(list.searchParams.get("maxResults"),"5"); assert.throws(()=>buildListRequest({sender:"x",afterEpochSeconds:1,maxResults:11}));
const get=new URL(buildGetRequest("fixture_id").url); assert.equal(get.searchParams.get("format"),"full"); assert.throws(()=>buildGetRequest("bad/id"));
const enc=(v)=>Buffer.from(v).toString("base64url"); const payload={mimeType:"multipart/alternative",headers:[{name:"To",value:"runner+035i-run-abc123@test.invalid"},{name:"From",value:"sender@test.invalid"},{name:"Subject",value:"Your code"}],parts:[{mimeType:"text/plain",body:{data:enc("Code 012345")}}]};
const message={id:"fixture_id",internalDate:"150000",payload}; assert.equal(parseMessage(message).body,"Code 012345");
assert.deepEqual(classifyGmailMessages([message],{recipient:"runner+035i-run-abc123@test.invalid",sender:"sender@test.invalid",since:100000,until:200000}),{classification:"intended-otp",code:"012345"});
for(const mutant of [{...message,internalDate:"1"},{...message,payload:{...payload,parts:[{mimeType:"text/html",body:{data:enc("012345 https://test.invalid")}}]}},{...message,payload:{...payload,headers:[...payload.headers,{name:"To",value:"other@test.invalid"}]}}]) assert.notEqual(classifyGmailMessages([mutant],{recipient:"runner+035i-run-abc123@test.invalid",sender:"sender@test.invalid",since:100000,until:200000}).classification,"intended-otp");
let called; await gmailFetch(async(url,init)=>{called={url,init};return{ok:true,json:async()=>({messages:[]})}},"fixture-access",buildListRequest({sender:"sender@test.invalid",afterEpochSeconds:100})); assert.equal(called.init.headers.Authorization,"Bearer fixture-access"); assert(!called.url.includes("fixture-access"));
await assert.rejects(()=>gmailFetch(()=>{},"x",{method:"POST",url:"https://gmail.googleapis.com/gmail/v1/users/me/messages"}),/ENDPOINT/);
console.log(JSON.stringify({state:"pass",checks:35,scope:"gmail-readonly-only",gmailMutations:0,liveActions:0}));
