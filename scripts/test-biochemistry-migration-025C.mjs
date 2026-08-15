import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFile } from "node:fs/promises";

const migration = await readFile(new URL("../supabase/migrations/0024_versioned_four_loss_biochemistry_scoring.sql", import.meta.url), "utf8");
const legacy = await readFile(new URL("../supabase/migrations/0009_biochemistry_test_data_model.sql", import.meta.url));
const fixture = JSON.parse(await readFile(new URL("../references/fixtures/biochemistry-loss-tables-v3.json", import.meta.url), "utf8"));
let passed = 0;
function check(condition, label) {
  assert.ok(condition, label);
  passed += 1;
}

const SOURCE_DOCUMENT = "HORSE Energy Loss Version 3 no urea or age.xlsx";
const SOURCE_VERSION = "v3";
const round6 = (value) => Number(value.toFixed(6));
const effectiveC = (raw) => Math.min(Math.floor((Math.round(raw * 100) * 143 + 50) / 100) / 100, 80);
const idFor = (row) => `${row.lookupType}:${row.exactReading}`;
const lookups = new Map(fixture.rows.map((row) => [idFor(row), { ...row, id: idFor(row) }]));
const lookup = (type, reading) => lookups.get(`${type}:${reading}`);
const clone = (value) => JSON.parse(JSON.stringify(value));

function validateStructuralSnapshot(snapshot, lookupRecords = lookups) {
  if (snapshot.formulaVersion === "biochemistry-score-v1") {
    return snapshot.phAverage !== null
      && snapshot.ureaReading !== null
      && snapshot.conductivityConvertedCValue === snapshot.conductivityRawMeterValue * 1.43;
  }
  if (snapshot.formulaVersion !== "biochemistry-score-v2" || snapshot.scoringStatus !== "scored") return false;
  if (snapshot.lookupSourceDocument !== SOURCE_DOCUMENT || snapshot.lookupSourceVersion !== SOURCE_VERSION) return false;
  if (snapshot.phAverage !== null || snapshot.ureaReading !== null) return false;
  if (snapshot.carbsReading < 0 || snapshot.carbsReading > 15) return false;
  if (snapshot.phUrine < 4.8 || snapshot.phUrine > 9 || snapshot.phSaliva < 4.8 || snapshot.phSaliva > 9) return false;
  if (snapshot.conductivityRawMeterValue < 0 || snapshot.conductivityRawMeterValue > 99) return false;
  if (snapshot.conductivityConvertedCValue !== effectiveC(snapshot.conductivityRawMeterValue)) return false;
  if (snapshot.carbsLookupReading > snapshot.carbsReading || snapshot.phUrineLookupReading > snapshot.phUrine || snapshot.phSalivaLookupReading > snapshot.phSaliva) return false;
  if (snapshot.conductivityLookupCValue > snapshot.conductivityConvertedCValue || snapshot.conductivityLookupCValue > 80) return false;
  const fractionFields = ["carbsLossFraction", "phUrineLossFraction", "phSalivaLossFraction", "saltsLossFraction", "hydrationScoreEnergyLoss", "hydrationScore", "healthScoreEnergyLoss", "healthScore"];
  if (!fractionFields.every((field) => snapshot[field] >= 0 && snapshot[field] <= 1)) return false;
  if (snapshot.scoringBlockers.length !== 0) return false;
  if (snapshot.hydrationScoreEnergyLoss !== round6((snapshot.carbsLossFraction + snapshot.saltsLossFraction) / 2)) return false;
  if (snapshot.hydrationScore !== round6(1 - snapshot.hydrationScoreEnergyLoss)) return false;
  if (snapshot.healthScoreEnergyLoss !== round6((snapshot.carbsLossFraction + snapshot.phUrineLossFraction + snapshot.phSalivaLossFraction + snapshot.saltsLossFraction) / 4)) return false;
  if (snapshot.healthScore !== round6(1 - snapshot.healthScoreEnergyLoss)) return false;

  const expected = [
    [snapshot.carbsLookupValueId, "carbs", snapshot.carbsLookupReading, snapshot.carbsLossFraction],
    [snapshot.phUrineLookupValueId, "ph_urine", snapshot.phUrineLookupReading, snapshot.phUrineLossFraction],
    [snapshot.phSalivaLookupValueId, "ph_saliva", snapshot.phSalivaLookupReading, snapshot.phSalivaLossFraction],
    [snapshot.saltsLookupValueId, "salts", snapshot.conductivityLookupCValue, snapshot.saltsLossFraction],
  ];
  return expected.every(([id, type, reading, loss]) => {
    const row = lookupRecords.get(id);
    return row?.lookupType === type
      && row.exactReading === reading
      && row.lossFraction === loss
      && row.sourceDocument === SOURCE_DOCUMENT
      && row.sourceVersion === SOURCE_VERSION;
  });
}

const carbs = lookup("carbs", 4.5);
const urine = lookup("ph_urine", 7.24);
const saliva = lookup("ph_saliva", 7.25);
const salts = lookup("salts", 26);
const hydrationEnergy = round6((carbs.lossFraction + salts.lossFraction) / 2);
const healthEnergy = round6((carbs.lossFraction + urine.lossFraction + saliva.lossFraction + salts.lossFraction) / 4);
const validV2 = {
  formulaVersion: "biochemistry-score-v2",
  scoringStatus: "scored",
  lookupSourceDocument: SOURCE_DOCUMENT,
  lookupSourceVersion: SOURCE_VERSION,
  phAverage: null,
  ureaReading: null,
  carbsReading: 4.5,
  phUrine: 7.24,
  phSaliva: 7.25,
  conductivityRawMeterValue: 18.18,
  conductivityConvertedCValue: 26,
  carbsLookupValueId: carbs.id,
  phUrineLookupValueId: urine.id,
  phSalivaLookupValueId: saliva.id,
  saltsLookupValueId: salts.id,
  carbsLookupReading: carbs.exactReading,
  phUrineLookupReading: urine.exactReading,
  phSalivaLookupReading: saliva.exactReading,
  conductivityLookupCValue: salts.exactReading,
  carbsLossFraction: carbs.lossFraction,
  phUrineLossFraction: urine.lossFraction,
  phSalivaLossFraction: saliva.lossFraction,
  saltsLossFraction: salts.lossFraction,
  hydrationScoreEnergyLoss: hydrationEnergy,
  hydrationScore: round6(1 - hydrationEnergy),
  healthScoreEnergyLoss: healthEnergy,
  healthScore: round6(1 - healthEnergy),
  scoringBlockers: [],
};

const legacyHash = crypto.createHash("sha256").update(legacy).digest("hex");
check(legacyHash === "b5de360d33c69f21c8967793afd66ca670a1fa32672ad60e7a47bd72f56982e3", "MIG-01 legacy migration unchanged");
check(["'carbs'", "'ph_average'", "'ph_urine'", "'ph_saliva'", "'salts'", "'urea'"].every((value) => migration.includes(value)), "MIG-02 lookup types widened");
const counts = Object.fromEntries(["carbs", "ph_urine", "ph_saliva", "salts"].map((type) => [type, fixture.rows.filter((row) => row.lookupType === type).length]));
check(counts.carbs === 151 && counts.ph_urine === 432 && counts.ph_saliva === 432 && counts.salts === 801 && fixture.rows.length === 1816 && migration.includes("'v3'"), "MIG-03 v3 seeds");
check(["carbs_lookup_reading", "ph_urine_lookup_value_id", "ph_urine_loss_fraction", "ph_saliva_lookup_value_id", "ph_saliva_loss_fraction", "conductivity_lookup_c_value"].every((value) => migration.includes(value)), "MIG-04 audit columns");
check(migration.includes("alter column ph_average drop not null") && migration.includes("alter column urea_reading drop not null"), "MIG-05 legacy-only fields nullable");
const validV1 = { formulaVersion: "biochemistry-score-v1", phAverage: 7.245, ureaReading: 12, conductivityRawMeterValue: 18.18, conductivityConvertedCValue: 18.18 * 1.43 };
check(migration.includes("formula_version = 'biochemistry-score-v1'") && validateStructuralSnapshot(validV1) && !validateStructuralSnapshot({ ...validV1, phAverage: null }), "MIG-06 executable valid v1 branch retained");
const wrongType = { ...clone(validV2), carbsLookupValueId: urine.id };
const wrongVersionLookups = new Map(lookups);
wrongVersionLookups.set(carbs.id, { ...carbs, sourceVersion: "v1" });
const wrongOrder = { ...clone(validV2), carbsLookupReading: 4.6 };
const wrongRange = { ...clone(validV2), carbsLossFraction: -0.1 };
const wrongFormula = { ...clone(validV2), healthScore: 0.5 };
const nullOutput = { ...clone(validV2), healthScore: null };
const structuralMarkers = [
  "carbs_reading between 0 and 15",
  "carbs_lookup_reading <= carbs_reading",
  "health_score is not null",
  "hydration_score_energy_loss = round((carbs_loss_fraction + salts_loss_fraction) / 2, 6)",
  "validate_biochemistry_v2_scored_snapshot",
  "lookup_type = 'ph_urine'",
  "source_version = 'v3'",
];
check(
  structuralMarkers.every((marker) => migration.includes(marker))
    && validateStructuralSnapshot(validV2)
    && !validateStructuralSnapshot(wrongType)
    && !validateStructuralSnapshot(validV2, wrongVersionLookups)
    && !validateStructuralSnapshot(wrongOrder)
    && !validateStructuralSnapshot(wrongRange)
    && !validateStructuralSnapshot(wrongFormula)
    && !validateStructuralSnapshot(nullOutput),
  "MIG-07 executable v2 consistency model rejects mixed-version, wrong-type, order, range, NULL-output and arithmetic snapshots",
);
const lower = migration.toLowerCase();
check(migration.includes("on conflict (lookup_type, exact_reading, source_version) do update") && !lower.includes("delete from public.biochemistry") && !lower.includes("update public.biochemistry_tests") && !["supabase db push", "deploy", "vercel"].some((value) => lower.includes(value)), "MIG-08 idempotent local-only migration");
assert.equal(passed, 8);
console.log("Sprint 025C migration/version assertions passed: 8/8.");