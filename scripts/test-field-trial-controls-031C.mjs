#!/usr/bin/env node
import assert from "node:assert/strict";
const LIMITS=Object.freeze({stables:2,horses:4,auth:3,commerce:0});
const accept=p=>Object.entries(LIMITS).every(([k,v])=>Number.isInteger(p[k])&&p[k]>=0&&p[k]<=v);
assert(accept({stables:2,horses:4,auth:3,commerce:0}));
assert(!accept({stables:3,horses:4,auth:3,commerce:0}));
assert(!accept({stables:2,horses:5,auth:3,commerce:0}));
assert(!accept({stables:2,horses:4,auth:4,commerce:0}));
assert(!accept({stables:2,horses:4,auth:3,commerce:1}));
console.log(JSON.stringify({harness:"031C",state:"pass",ceiling:LIMITS,overCeiling:"rejected",historicalControls:"unchanged"}));
