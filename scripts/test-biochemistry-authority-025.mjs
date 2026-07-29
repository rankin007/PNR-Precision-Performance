import assert from "node:assert/strict";
import {
  calculatePhAverage,
  classifyBiochemistryScore,
  convertConductivityToC,
  generateBiochemistryRecommendations,
  scoreBiochemistryReadings,
  validateBiochemistryThresholdSet,
} from "../lib/domain/biochemistry.ts";

const lookupRows = [
  { lookupType: "carbs", exactReading: 2.5, lossFraction: 0.7767 },
  { lookupType: "ph_average", exactReading: 6.5, lossFraction: 0.3167 },
  { lookupType: "salts", exactReading: 14.3, lossFraction: 0.1089 },
  { lookupType: "urea", exactReading: 2.5, lossFraction: 0.56 },
];

const raw = {
  carbsReading: 2.5,
  phSaliva: 6.4,
  phUrine: 6.6,
  conductivityRawMeterValue: 10,
  ureaReading: 2.5,
};
const scored = scoreBiochemistryReadings(raw, lookupRows);
assert.equal(scored.scoringStatus, "scored");
assert.deepEqual(scored.rawReadings, raw, "all five raw measurements remain in the snapshot");
assert.equal(calculatePhAverage(raw.phSaliva, raw.phUrine), 6.5);
assert.equal(convertConductivityToC(raw.conductivityRawMeterValue), 14.3);
assert.deepEqual(Object.keys(scored.losses).sort(), ["carbs", "phAverage", "salts", "urea"]);

const validThresholds = {
  scoreKind: "hydration",
  sourceDocument: "synthetic Sprint 025 structural fixture",
  sourceVersion: "test-only-v1",
  thresholds: [
    { zone: "red", minScore: 0, maxScore: 0.499999, label: "Synthetic red" },
    { zone: "amber", minScore: 0.5, maxScore: 0.699999, label: "Synthetic amber" },
    { zone: "green", minScore: 0.7, maxScore: 1, label: "Synthetic green" },
  ],
};
assert.equal(validateBiochemistryThresholdSet("hydration", validThresholds).valid, true);
for (const [score, zone] of [[0, "red"], [0.499999, "red"], [0.5, "amber"], [0.699999, "amber"], [0.7, "green"], [1, "green"]]) {
  assert.equal(classifyBiochemistryScore("hydration", score, validThresholds).zone, zone);
}

for (const [name, thresholds, issue] of [
  ["gap", [{ zone: "red", minScore: 0, maxScore: 0.4 }, { zone: "amber", minScore: 0.5, maxScore: 0.7 }, { zone: "green", minScore: 0.700001, maxScore: 1 }], "gapped_ranges"],
  ["overlap", [{ zone: "red", minScore: 0, maxScore: 0.5 }, { zone: "amber", minScore: 0.5, maxScore: 0.7 }, { zone: "green", minScore: 0.700001, maxScore: 1 }], "overlapping_ranges"],
  ["inverted", [{ zone: "red", minScore: 0, maxScore: 0.4 }, { zone: "amber", minScore: 0.400001, maxScore: 0.3 }, { zone: "green", minScore: 0.300001, maxScore: 1 }], "inverted_range"],
  ["non-finite", [{ zone: "red", minScore: 0, maxScore: Number.POSITIVE_INFINITY }, { zone: "amber", minScore: 0.5, maxScore: 0.7 }, { zone: "green", minScore: 0.700001, maxScore: 1 }], "non_finite_bound"],
  ["missing", [{ zone: "red", minScore: 0, maxScore: 0.499999 }, { zone: "green", minScore: 0.5, maxScore: 1 }], "missing_zone"],
]) {
  const set = { ...validThresholds, thresholds };
  const validation = validateBiochemistryThresholdSet("hydration", set);
  assert.equal(validation.valid, false, `${name} set must be invalid`);
  assert.ok(validation.issues.some((candidate) => candidate.code === issue));
  assert.equal(classifyBiochemistryScore("hydration", 0.6, set).zoneStatus, "blocked");
}

assert.equal(classifyBiochemistryScore("hydration", 0.5, undefined).blockers[0]?.reason, "missing_threshold_set");
assert.equal(classifyBiochemistryScore("hydration", -0.000001, validThresholds).blockers[0]?.reason, "score_outside_thresholds");

const snapshotRule = {
  ruleId: "synthetic-snapshot-rule",
  category: "hydration",
  scoreKind: "hydration",
  zone: "amber",
  level: 3,
  status: "active",
  content: "Synthetic informational prompt; not production advice.",
  sourceDocument: "synthetic Sprint 025 structural fixture",
  sourceVersion: "test-only-v1",
};
const amber = classifyBiochemistryScore("hydration", 0.5, validThresholds);
const generated = generateBiochemistryRecommendations([amber], [snapshotRule], ["hydration"]);
assert.equal(generated.status, "generated");
snapshotRule.content = "Changed after snapshot generation";
assert.equal(generated.recommendations[0]?.content, "Synthetic informational prompt; not production advice.");
assert.equal(generateBiochemistryRecommendations([amber], [], ["hydration"]).status, "unavailable");

console.log("Sprint 025 biochemistry authority structural tests passed.");
