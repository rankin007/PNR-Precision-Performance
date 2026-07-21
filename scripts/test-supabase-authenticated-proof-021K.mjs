import assert from "node:assert/strict";
import "./supabase-authenticated-proof-021K.mjs";
const {spawnSync}=await import("node:child_process");const r=spawnSync(process.execPath,["scripts/supabase-authenticated-proof-021K.mjs","--self-test"],{encoding:"utf8",windowsHide:true});assert.equal(r.status,0);const out=JSON.parse(r.stdout);assert.equal(out.checks.length,12);assert.ok(out.checks.every(x=>x.endsWith(":pass")));process.stdout.write("021K harness self-tests passed (12/12).\n");
