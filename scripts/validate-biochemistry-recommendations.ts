import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type {
  BiochemistryLookupRow,
  BiochemistryRawReadings,
  BiochemistryRecommendationRule,
  BiochemistryZoneThresholdSet,
} from "../lib/domain/biochemistry";

const biochemistryModulePath = "../lib/domain/biochemistry.ts";
const {
  classifyBiochemistryScore,
  classifyBiochemistryScoringResult,
  generateBiochemistryRecommendations,
  scoreBiochemistryReadings,
} = await import(biochemistryModulePath);

type ScoringFixtureFile = {
  lookupRows: BiochemistryLookupRow[];
  scoredCase: { rawReadings: BiochemistryRawReadings };
  blockedCases: Array<{ rawReadings: BiochemistryRawReadings }>;
};

type RecommendationFixtureFile = {
  thresholdSets: BiochemistryZoneThresholdSet[];
  activeRules: BiochemistryRecommendationRule[];
  draftRules: BiochemistryRecommendationRule[];
  expected: {
    hydrationZone: string;
    healthZone: string;
    generatedRecommendationRuleId: string;
  };
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scoringFixture = await readJson<ScoringFixtureFile>(
  resolve(root, "references/fixtures/biochemistry-scoring-014.json"),
);
const recommendationFixture = await readJson<RecommendationFixtureFile>(
  resolve(root, "references/fixtures/biochemistry-recommendations-015.json"),
);

const scored = scoreBiochemistryReadings(
  scoringFixture.scoredCase.rawReadings,
  scoringFixture.lookupRows,
);
assert.equal(scored.scoringStatus, "scored", "Sprint 014 scored fixture should still score");

const zones = classifyBiochemistryScoringResult(scored, recommendationFixture.thresholdSets);
assert.equal(zones.hydration.zoneStatus, "classified", "hydration zone should classify with supplied fixture thresholds");
assert.equal(zones.hydration.zone, recommendationFixture.expected.hydrationZone);
assert.equal(zones.health.zoneStatus, "classified", "health zone should classify with supplied fixture thresholds");
assert.equal(zones.health.zone, recommendationFixture.expected.healthZone);
assert.equal(zones.hydration.thresholdSourceVersion, "fixture-only-v1");

const missingThreshold = classifyBiochemistryScore("hydration", scored.hydrationScore, undefined);
assert.equal(missingThreshold.zoneStatus, "blocked", "missing threshold set should block classification");
assert.equal(missingThreshold.blockers[0]?.reason, "missing_threshold_set");

const blockedScore = scoreBiochemistryReadings(
  scoringFixture.blockedCases[0].rawReadings,
  scoringFixture.lookupRows,
);
const blockedZones = classifyBiochemistryScoringResult(blockedScore, recommendationFixture.thresholdSets);
assert.equal(blockedZones.hydration.zoneStatus, "blocked", "blocked score should block hydration zone");
assert.equal(blockedZones.health.zoneStatus, "blocked", "blocked score should block health zone");

const generated = generateBiochemistryRecommendations(
  [zones.hydration],
  recommendationFixture.activeRules,
  ["hydration"],
);
assert.equal(generated.status, "generated", "active supplied fixture rule should generate a snapshot");
assert.equal(generated.recommendations[0]?.ruleId, recommendationFixture.expected.generatedRecommendationRuleId);
assert.equal(generated.recommendations[0]?.content.includes("Not production advice"), true);

const unavailable = generateBiochemistryRecommendations(
  [zones.health],
  recommendationFixture.draftRules,
  ["feed"],
);
assert.equal(unavailable.status, "unavailable", "draft-only rules should not generate trainer-facing advice");
assert.equal(unavailable.recommendations.length, 0);
assert.equal(unavailable.blockers[0]?.reason, "missing_active_rule");

const blockedRecommendation = generateBiochemistryRecommendations(
  [blockedZones.hydration],
  recommendationFixture.activeRules,
  ["hydration"],
);
assert.equal(blockedRecommendation.status, "blocked", "blocked zones should block recommendation generation");
assert.equal(blockedRecommendation.blockers[0]?.reason, "zone_blocked");

console.log("Biochemistry recommendation scaffold fixtures passed.");

async function readJson<T>(path: string) {
  const text = await readFile(path, "utf8");
  return JSON.parse(text.replace(/^\uFEFF/, "")) as T;
}
