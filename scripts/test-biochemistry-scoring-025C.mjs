import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  BIOCHEMISTRY_FORMULA_VERSION_V2,
  BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3,
  scoreBiochemistryReadingsV2,
} from "../lib/domain/biochemistry.ts";

const fixture = JSON.parse(await readFile(new URL("../references/fixtures/biochemistry-scoring-025C.json", import.meta.url), "utf8"));
const tables = JSON.parse(await readFile(new URL("../references/fixtures/biochemistry-loss-tables-v3.json", import.meta.url), "utf8"));
const rows = tables.rows;
let passed = 0;
function check(condition, label) {
  assert.ok(condition, label);
  passed += 1;
}

const example = scoreBiochemistryReadingsV2(fixture.workbookExample.rawReadings, rows);
check(example.formulaVersion === BIOCHEMISTRY_FORMULA_VERSION_V2 && example.lookupSourceVersion === BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3, "SCORE-01 versions");
check(example.losses.carbs?.exactReading === 4.5 && example.losses.carbs.lossFraction === 0.08, "SCORE-02 exact Carbohydrate");
const carbsFloor = scoreBiochemistryReadingsV2({ ...fixture.workbookExample.rawReadings, carbsReading: fixture.discriminatingCases.carbsFloor }, rows);
check(carbsFloor.losses.carbs?.exactReading === 4.5 && carbsFloor.losses.carbs.lossFraction === 0.08, "SCORE-03 Carbohydrate floor");
const below = scoreBiochemistryReadingsV2({ ...fixture.workbookExample.rawReadings, carbsReading: fixture.discriminatingCases.carbsBelowMinimum }, rows);
check(below.scoringStatus === "blocked" && below.scoringBlockers.some((item) => item.lookupType === "carbs" && item.reason === "below_minimum_lookup"), "SCORE-04 below minimum");
check(example.losses.phUrine?.exactReading === 7.24 && example.losses.phUrine.lossFraction === 0.082333, "SCORE-05 exact Urine pH");
check(example.losses.phSaliva?.exactReading === 7.25 && example.losses.phSaliva.lossFraction === 0.130333, "SCORE-06 exact Saliva pH");
check(example.losses.phUrine?.lossFraction !== example.losses.phSaliva?.lossFraction && !("phAverage" in example.losses), "SCORE-07 separate pH losses");
check(example.losses.salts?.exactReading === 26 && example.losses.salts.lossFraction === 0.080597, "SCORE-08 exact Salts");
const halfCentBoundary = scoreBiochemistryReadingsV2({ ...fixture.workbookExample.rawReadings, conductivityRawMeterValue: 26.50 }, rows);
check(
  example.derivedReadings.conductivityConvertedCValue === 26
    && halfCentBoundary.derivedReadings.conductivityConvertedCValue === 37.90
    && halfCentBoundary.losses.salts?.exactReading === 37.9,
  "SCORE-09 PostgreSQL-consistent half-up round before lookup",
);
const floor = scoreBiochemistryReadingsV2({ ...fixture.workbookExample.rawReadings, conductivityRawMeterValue: 18.17 }, rows);
check(floor.derivedReadings.conductivityConvertedCValue === 25.98 && floor.losses.salts?.exactReading === 25.9, "SCORE-10 converted-C floor");
const cap = scoreBiochemistryReadingsV2({ ...fixture.workbookExample.rawReadings, conductivityRawMeterValue: 56 }, rows);
check(cap.derivedReadings.conductivityConvertedCValue === 80 && cap.losses.salts?.exactReading === 80, "SCORE-11 cap boundary");
const maximum = scoreBiochemistryReadingsV2({ ...fixture.workbookExample.rawReadings, conductivityRawMeterValue: 99 }, rows);
check(maximum.scoringStatus === "scored" && maximum.losses.salts.exactReading === 80 && maximum.scoringBlockers.length === 0, "SCORE-12 maximum raw accepted");
check(maximum.rawReadings.conductivityRawMeterValue === 99 && maximum.derivedReadings.conductivityConvertedCValue === 80, "SCORE-13 raw/effective audit");
check(example.hydrationScoreEnergyLoss === 0.080299, "SCORE-14 Hydration energy loss");
check(example.hydrationScore === 0.919701, "SCORE-15 Hydration Score");
check(example.healthScoreEnergyLoss === 0.093316, "SCORE-16 Health energy loss");
check(example.healthScore === 0.906684, "SCORE-17 Health Score");
check(example.scoringStatus === "scored" && !("urea" in example.losses) && !("ureaReading" in example.rawReadings) && !("phAverage" in example.derivedReadings), "SCORE-18 no Urea or Average pH dependency");
assert.equal(passed, 18);
console.log("Sprint 025C scoring/transformation assertions passed: 18/18.");
