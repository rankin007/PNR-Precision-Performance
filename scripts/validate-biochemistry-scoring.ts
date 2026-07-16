import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type {
  BiochemistryLookupRow,
  BiochemistryLookupType,
  BiochemistryRawReadings,
} from "../lib/domain/biochemistry";

const biochemistryModulePath = "../lib/domain/biochemistry.ts";
const {
  calculatePhAverage,
  convertConductivityToC,
  scoreBiochemistryReadings,
} = await import(biochemistryModulePath);

type ScoredFixture = {
  rawReadings: BiochemistryRawReadings;
  expected: {
    phAverage: number;
    conductivityConvertedCValue: number;
    hydrationScoreEnergyLoss: number;
    hydrationScore: number;
    healthScoreEnergyLoss: number;
    healthScore: number;
  };
};

type BlockedFixture = {
  name: string;
  rawReadings: BiochemistryRawReadings;
  expectedMissingLookupType: BiochemistryLookupType;
};

type ScoringFixtureFile = {
  lookupRows: BiochemistryLookupRow[];
  scoredCase: ScoredFixture;
  blockedCases: BlockedFixture[];
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath = resolve(root, "references/fixtures/biochemistry-scoring-014.json");
const fixtureText = await readFile(fixturePath, "utf8");
const fixture = JSON.parse(fixtureText.replace(/^\uFEFF/, "")) as ScoringFixtureFile;

function assertNumber(actual: number | undefined, expected: number, label: string) {
  assert.equal(actual, expected, `${label}: expected ${expected}, received ${actual}`);
}

const scored = scoreBiochemistryReadings(fixture.scoredCase.rawReadings, fixture.lookupRows);
assert.equal(scored.scoringStatus, "scored", "fully matched fixture should score");
assertNumber(scored.derivedReadings.phAverage, fixture.scoredCase.expected.phAverage, "pH Average");
assertNumber(
  scored.derivedReadings.conductivityConvertedCValue,
  fixture.scoredCase.expected.conductivityConvertedCValue,
  "conductivity C conversion",
);
assertNumber(scored.hydrationScoreEnergyLoss, fixture.scoredCase.expected.hydrationScoreEnergyLoss, "Hydration Score Energy Loss");
assertNumber(scored.hydrationScore, fixture.scoredCase.expected.hydrationScore, "Hydration Score");
assertNumber(scored.healthScoreEnergyLoss, fixture.scoredCase.expected.healthScoreEnergyLoss, "Health Score Energy Loss");
assertNumber(scored.healthScore, fixture.scoredCase.expected.healthScore, "Health Score");

assertNumber(calculatePhAverage(6.4, 6.6), 6.5, "direct pH Average helper");
assertNumber(convertConductivityToC(10), 14.3, "direct conductivity helper");

for (const blockedCase of fixture.blockedCases) {
  const result = scoreBiochemistryReadings(blockedCase.rawReadings, fixture.lookupRows);
  assert.equal(result.scoringStatus, "blocked", `${blockedCase.name} should be blocked`);
  assert.ok(
    result.scoringBlockers.some((blocker: { lookupType: BiochemistryLookupType }) => blocker.lookupType === blockedCase.expectedMissingLookupType),
    `${blockedCase.name} should include missing ${blockedCase.expectedMissingLookupType} blocker`,
  );
  assert.equal(result.hydrationScore, undefined, `${blockedCase.name} should not return guessed Hydration Score`);
  assert.equal(result.healthScore, undefined, `${blockedCase.name} should not return guessed Health Score`);
}

console.log("Biochemistry scoring fixtures passed.");
