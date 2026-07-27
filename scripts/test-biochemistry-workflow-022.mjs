import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import {
  BIOCHEMISTRY_NOTES_LIMIT,
  EMPTY_BIOCHEMISTRY_CAPTURE_VALUES,
  biochemistryServerErrorMessage,
  timeOfDayLabel,
  validateBiochemistryCaptureValues,
} from "../components/ops/biochemistry-workflow-state.ts";
import {
  classifyBiochemistryScoringResult,
  generateBiochemistryRecommendations,
  scoreBiochemistryReadings,
} from "../lib/domain/biochemistry.ts";

function assertInvalid(input, fields) {
  const result = validateBiochemistryCaptureValues(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.deepEqual(result.errors.map((error) => error.field), fields);
  }
}

const baseValues = {
  horseId: "horse-demo",
  horseName: "Demo Horse",
  testDate: "2026-07-26",
  timeOfDay: "am",
  carbsReading: "2.5",
  phSaliva: "6.4",
  phUrine: "6.6",
  conductivityRawMeterValue: "10",
  ureaReading: "2.5",
  notes: "",
};

assertInvalid(EMPTY_BIOCHEMISTRY_CAPTURE_VALUES, [
  "horseId",
  "testDate",
  "carbsReading",
  "phSaliva",
  "phUrine",
  "conductivityRawMeterValue",
  "ureaReading",
]);

assertInvalid({ ...baseValues, carbsReading: "abc" }, ["carbsReading"]);
assertInvalid({ ...baseValues, ureaReading: "Infinity" }, ["ureaReading"]);
assertInvalid({ ...baseValues, notes: "x".repeat(BIOCHEMISTRY_NOTES_LIMIT + 1) }, ["notes"]);

const zeroAndDecimal = validateBiochemistryCaptureValues({
  ...baseValues,
  carbsReading: "0",
  phSaliva: "6.25",
  notes: "",
});
assert.equal(zeroAndDecimal.ok, true);
if (zeroAndDecimal.ok) {
  assert.equal(zeroAndDecimal.normalizedNumbers.carbsReading, 0);
  assert.equal(zeroAndDecimal.normalizedNumbers.phSaliva, 6.25);
  assert.equal(zeroAndDecimal.values.notes, "");
}

const valid = validateBiochemistryCaptureValues(baseValues);
assert.equal(valid.ok, true);
if (valid.ok) {
  assert.equal(valid.values.horseName, "Demo Horse");
  assert.equal(valid.values.timeOfDay, "am");
}

assert.equal(timeOfDayLabel("am"), "AM");
assert.equal(timeOfDayLabel("pm"), "PM");
assert.equal(timeOfDayLabel("unspecified"), "Unspecified");

assert.equal(
  biochemistryServerErrorMessage("horse-not-accessible"),
  "That horse is not available for biochemistry entry from this account.",
);
assert.equal(
  biochemistryServerErrorMessage("unknown-code"),
  "The biochemistry form could not be submitted yet.",
);

const lookupRows = [
  { lookupType: "carbs", exactReading: 2.5, lossFraction: 0.7767 },
  { lookupType: "ph_average", exactReading: 6.5, lossFraction: 0.3167 },
  { lookupType: "salts", exactReading: 14.3, lossFraction: 0.1089 },
  { lookupType: "urea", exactReading: 2.5, lossFraction: 0.56 },
];
const scored = scoreBiochemistryReadings({
  carbsReading: 2.5,
  phSaliva: 6.4,
  phUrine: 6.6,
  conductivityRawMeterValue: 10,
  ureaReading: 2.5,
}, lookupRows);
assert.equal(scored.scoringStatus, "scored");
const missingThresholdZones = classifyBiochemistryScoringResult(scored, []);
assert.equal(missingThresholdZones.hydration.zoneStatus, "blocked");
assert.equal(missingThresholdZones.hydration.blockers[0]?.reason, "missing_threshold_set");
const recommendations = generateBiochemistryRecommendations([
  missingThresholdZones.hydration,
  missingThresholdZones.health,
], []);
assert.equal(recommendations.status, "blocked");
assert.equal(recommendations.recommendations.length, 0);

const blocked = scoreBiochemistryReadings({
  carbsReading: 9.9,
  phSaliva: 6.4,
  phUrine: 6.6,
  conductivityRawMeterValue: 10,
  ureaReading: 2.5,
}, lookupRows);
assert.equal(blocked.scoringStatus, "blocked");
assert.equal(blocked.scoringBlockers[0]?.lookupType, "carbs");

const workflowSource = readFileSync("components/ops/biochemistry-capture-workflow.tsx", "utf8");
assert.match(workflowSource, /submittedRef/);
assert.match(workflowSource, /Submitting test\.\.\./);
assert.match(workflowSource, /Review test/);
assert.match(workflowSource, /No notes added/);
assert.doesNotMatch(workflowSource, /fixture-only/i);

console.log("Sprint 022 biochemistry workflow tests passed.");
