import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { exerciseComposedProvider036RForTest } from "./provider-authority-reader-036P.mjs";

let count = 0;
const ok = (v, m) => { assert.ok(v, m); count += 1; };
const equal = (a, b, m) => { assert.deepEqual(a, b, m); count += 1; };
const root = process.cwd();
const wrapper = path.join(root, "scripts", "Invoke-ProviderAuthorityCompletion036R.ps1");
const reader = path.join(root, "scripts", "provider-authority-reader-036P.mjs");
const ledgerPath = path.join(root, "evidence", "professional-engineering", "036R-resend-domain-bound-five-provider-authority-completion", "external-ledger.json");



const apex = "precisionperformance.com.au";
const responses = [
  { object:"list",has_more:false,data:[{id:"d_exact",name:apex,status:"verified",created_at:"now",region:"us-east-1",capabilities:{sending:"enabled",receiving:"disabled"}}] },
  { object:"domain",id:"d_exact",name:apex,status:"verified",created_at:"now",region:"us-east-1",capabilities:{sending:"enabled",receiving:"disabled"},records:[
    {record:"SPF",name:"send",type:"TXT",ttl:"Auto",status:"verified",value:"v=spf1 include:amazonses.com ~all"},
    {record:"SPF",name:"send",type:"MX",ttl:"Auto",status:"verified",value:"feedback-smtp.us-east-1.amazonses.com",priority:10},
    {record:"DKIM",name:"resend._domainkey",type:"TXT",ttl:"Auto",status:"verified",value:"p=public-material"},
    {record:"Tracking",name:"links",type:"CNAME",ttl:"Auto",status:"verified",value:"tracking.resend.com"},
  ]},
];
let httpCalls = 0, dnsCalls = 0, keyCalls = 0;
const prefixTransport = { async http(url){ httpCalls += 1; if(url.includes("api-keys"))keyCalls += 1; return {ok:true,status:200,text:JSON.stringify(responses.shift())}; }, async dns(tuple){ dnsCalls += 1; if(dnsCalls === 2)throw new Error("fixture-dns-failure"); return tuple.type === "TXT" ? [[tuple.value]] : [{exchange:tuple.value,priority:tuple.priority}]; } };
let prefixError;
try { await exerciseComposedProvider036RForTest("resend",{credential:"fixture-opaque",expected:{}},prefixTransport); } catch(error){ prefixError=error; }
equal(prefixError?.code,"RESEND_DNS_READ_REFUSED","tuple-N DNS failure sanitized");
equal([prefixError?.context?.requests,httpCalls],[2,2],"exact provider prefix is two list/detail reads");
equal([prefixError?.context?.dnsReads,dnsCalls],[2,2],"exact DNS prefix retains failing tuple N");
equal(keyCalls,0,"key reads do not occur after DNS failure");
const successResponses=[{object:"list",has_more:false,data:[{id:"d_exact",name:apex,status:"verified",created_at:"now",region:"us-east-1",capabilities:{sending:"enabled",receiving:"disabled"}}]},{object:"domain",id:"d_exact",name:apex,status:"verified",created_at:"now",region:"us-east-1",capabilities:{sending:"enabled",receiving:"disabled"},records:[{record:"DKIM",name:"resend._domainkey",type:"TXT",ttl:"Auto",status:"verified",value:"p=public-material"},{record:"Tracking",name:"links",type:"CNAME",ttl:"Auto",status:"pending",value:"tracking.resend.com"}]},{object:"list",has_more:false,data:[{id:"key_1",name:"smtp",created_at:"now",last_used_at:null}]}];
const success=await exerciseComposedProvider036RForTest("resend",{credential:"fixture-opaque",expected:{}},{async http(){return {ok:true,status:200,text:JSON.stringify(successResponses.shift())}},async dns(tuple){return [[tuple.value]]}});
equal(prefixError?.name,"Domain036RError","DNS failure preserves domain error class");
equal(responses.length,0,"no unread pre-key provider responses remain");
equal(success.projection.authorityBound,true,"tracking-inclusive authority binds");
equal(success.projection.operations,["domains","domainDetail","keys","dns"],"corrected Resend operation set");
equal(success.projection.facts.dnsMatched,true,"public DNS equality projected");
equal(success.projection.facts.domains,1,"exhausted domain count projected");
equal(success.projection.facts.keys,1,"exhausted key count projected");
equal(success.requests,3,"tracking-inclusive composed provider request count"); equal(success.dnsReads,1,"tracking excluded from DNS authority reads"); equal(success.projection.facts.dnsTuples,1,"one authority tuple projected");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
equal(ledger.sprint, "036R-resend-domain-bound-five-provider-authority-completion", "ledger sprint");
equal(ledger.outcome, "resend-domain-bound-five-provider-authority-blocked-clean", "initial fallback truth");
equal(ledger.targetMet, false, "initial target false");
equal(ledger.provider.requests, 4, "historical provider baseline");
equal(ledger.provider.dnsReads, 0, "DNS baseline zero");
equal([ledger.provider.writes, ledger.provider.mutations, ledger.provider.businessEffects, ledger.provider.residue], [0, 0, 0, 0], "actions and residue zero");
equal(ledger.sessions.length, 0, "no protected session");
equal(ledger.authorities.map((row) => row.provider), ["vercel", "supabase", "resend", "stripe", "railway"], "authority order");
equal(ledger.capabilityRows.length, 7, "seven rows");
equal(ledger.acceptance.length, 40, "forty AC rows");

const run = (mode) => spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", wrapper, "-Mode", mode], { cwd: root, encoding: "utf8", windowsHide: true, timeout: 120000 });
const self = run("SelfTest");
const selfResult = JSON.parse(self.stdout.trim());
equal(self.status, 0, "SelfTest exits zero");
ok(self.stdout.includes('"assertions":100') && self.stdout.includes('"providerReads":0') && self.stdout.includes('"dnsReads":0'), "SelfTest sanitized counters");
ok(!/re_[A-Za-z0-9]{8,}|sbp_|sk_live_|whsec_/.test(self.stdout + self.stderr), "SelfTest no protected reflection");
equal(selfResult.historyAccepted, [true, true, true], "empty exact and normalized current invocation history accepted");
equal(selfResult.historyRefused, [true, true, true, true, true, true], "multiple other chained extra wrong and malformed histories refused");
equal(selfResult.historyCounters, [0, 0, 0], "history validation makes no provider DNS or credential request");
const capability = run("CapabilityGate");
equal([selfResult.deadlineTimeout,selfResult.promptDelayPaused], [true,true], "silent timeout and prompt-paused active budget pass");
equal(selfResult.deadlineCleanup, true, "timed-out child is reaped");
equal(selfResult.testPersistenceRefused, true, "TEST/LIVE persistence counterfeit refused");
equal(selfResult.atomicBeforeRepair, true, "before-replace fault repaired");
equal(selfResult.atomicAfterRepair, true, "after-replace fault repaired");
equal(selfResult.atomicMarkdownRepair, true, "Markdown fault repaired");
ok([0, 2].includes(capability.status), "CapabilityGate finite exit");
ok(capability.stdout.includes('"providerReads":0') && capability.stdout.includes('"dnsReads":0'), "CapabilityGate makes no read");
const redirected = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", wrapper, "-Mode", "ProtectedReadOnly"], { cwd: root, input: "", encoding: "utf8", windowsHide: true, timeout: 30000 });
ok(redirected.status !== 0, "redirected protected mode refuses");
ok(!fs.readdirSync(path.dirname(ledgerPath)).some((name) => /^\.036r-next-|^\.036r-backup-/.test(name)), "no owned evidence residue");

assert.equal(count, 40, "exact transport assertion arithmetic");
console.log(`provider-authority-transport-036R ${count}/40 PASS`);
