export const BIOCHEMISTRY_FORMULA_VERSION = "biochemistry-score-v1";
export const BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT = "Reading Tables v1.csv";
export const BIOCHEMISTRY_LOOKUP_SOURCE_VERSION = "v1";
export const CONDUCTIVITY_TO_C_MULTIPLIER = 1.43;
export const BIOCHEMISTRY_UPLOAD_MAX_BYTES = 2 * 1024 * 1024;
export const BIOCHEMISTRY_NUMERIC_SCALE = 6;

export type BiochemistryLookupType = "carbs" | "ph_average" | "salts" | "urea";
export type BiochemistryScoringStatus = "scored" | "blocked" | "unscored";
export type BiochemistryTimeOfDay = "am" | "pm" | "unspecified";
export type BiochemistryAccessRole = "trainer" | "staff" | "vet" | "owner";
export type BiochemistryAccessLevel = "read" | "write" | "manage";
export type BiochemistryUploadCategory = "pdf" | "csv" | "png" | "jpg" | "jpeg" | "photo";

export type BiochemistryRawReadings = {
  carbsReading: number;
  phSaliva: number;
  phUrine: number;
  conductivityRawMeterValue: number;
  ureaReading: number;
};

export type BiochemistryDerivedReadings = {
  phAverage: number;
  conductivityConvertedCValue: number;
};

export type BiochemistryLookupRow = {
  lookupType: BiochemistryLookupType;
  exactReading: number | string;
  exactReadingText?: string;
  lossFraction: number | string;
  lossPercentText?: string;
  sourceDocument?: typeof BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT;
  sourceVersion?: typeof BIOCHEMISTRY_LOOKUP_SOURCE_VERSION;
};

export type BiochemistryLossSnapshot = {
  lookupType: BiochemistryLookupType;
  exactReading: number;
  exactReadingText: string;
  lossFraction: number;
  lossPercentText: string;
  sourceDocument: typeof BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT;
  sourceVersion: typeof BIOCHEMISTRY_LOOKUP_SOURCE_VERSION;
};

export type BiochemistryScoreSnapshot = {
  formulaVersion: typeof BIOCHEMISTRY_FORMULA_VERSION;
  lookupSourceDocument: typeof BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT;
  lookupSourceVersion: typeof BIOCHEMISTRY_LOOKUP_SOURCE_VERSION;
  rawReadings: BiochemistryRawReadings;
  derivedReadings: BiochemistryDerivedReadings;
  losses: {
    carbs?: BiochemistryLossSnapshot;
    phAverage?: BiochemistryLossSnapshot;
    salts?: BiochemistryLossSnapshot;
    urea?: BiochemistryLossSnapshot;
  };
  hydrationScoreEnergyLoss?: number;
  hydrationScore?: number;
  healthScoreEnergyLoss?: number;
  healthScore?: number;
  scoringStatus: BiochemistryScoringStatus;
  scoringBlockers: Array<{
    lookupType: BiochemistryLookupType;
    exactReading: number;
    reason: "missing_exact_lookup";
  }>;
};

export type BiochemistryScoredResult = BiochemistryScoreSnapshot & {
  scoringStatus: "scored";
  losses: Required<BiochemistryScoreSnapshot["losses"]>;
  hydrationScoreEnergyLoss: number;
  hydrationScore: number;
  healthScoreEnergyLoss: number;
  healthScore: number;
  scoringBlockers: [];
};

export type BiochemistryBlockedResult = BiochemistryScoreSnapshot & {
  scoringStatus: "blocked";
  scoringBlockers: NonNullable<BiochemistryScoreSnapshot["scoringBlockers"]>;
};

export type BiochemistryScoringResult = BiochemistryScoredResult | BiochemistryBlockedResult;

type LookupIndex = Map<string, BiochemistryLossSnapshot>;

export function calculatePhAverage(phSaliva: number, phUrine: number) {
  return normalizeBiochemistryNumber((phSaliva + phUrine) / 2);
}

export function convertConductivityToC(rawMeterValue: number) {
  return normalizeBiochemistryNumber(rawMeterValue * CONDUCTIVITY_TO_C_MULTIPLIER);
}

export function calculateHydrationScoreEnergyLoss(carbsLoss: number, saltsLoss: number) {
  return normalizeBiochemistryNumber((carbsLoss + saltsLoss) / 2);
}

export function calculateHydrationScore(hydrationScoreEnergyLoss: number) {
  return normalizeBiochemistryNumber(1 - hydrationScoreEnergyLoss);
}

export function calculateHealthScoreEnergyLoss(
  carbsLoss: number,
  phAverageLoss: number,
  saltsLoss: number,
  ureaLoss: number,
) {
  return normalizeBiochemistryNumber((carbsLoss + phAverageLoss + saltsLoss + ureaLoss) / 4);
}

export function calculateHealthScore(healthScoreEnergyLoss: number) {
  return normalizeBiochemistryNumber(1 - healthScoreEnergyLoss);
}

export function normalizeBiochemistryNumber(value: number | string) {
  const numericValue = typeof value === "number" ? value : Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) {
    throw new Error("Biochemistry numeric values must be finite numbers.");
  }

  return Number(numericValue.toFixed(BIOCHEMISTRY_NUMERIC_SCALE));
}

export function getExactLookupKey(lookupType: BiochemistryLookupType, exactReading: number | string) {
  return `${lookupType}:${normalizeBiochemistryNumber(exactReading).toFixed(BIOCHEMISTRY_NUMERIC_SCALE)}`;
}

export function buildBiochemistryLookupIndex(rows: BiochemistryLookupRow[]) {
  return rows.reduce<LookupIndex>((index, row) => {
    const exactReading = normalizeBiochemistryNumber(row.exactReading);
    const lossFraction = normalizeBiochemistryNumber(row.lossFraction);

    index.set(getExactLookupKey(row.lookupType, exactReading), {
      lookupType: row.lookupType,
      exactReading,
      exactReadingText: row.exactReadingText ?? String(row.exactReading),
      lossFraction,
      lossPercentText: row.lossPercentText ?? `${normalizeBiochemistryNumber(lossFraction * 100)}%`,
      sourceDocument: row.sourceDocument ?? BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
      sourceVersion: row.sourceVersion ?? BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
    });

    return index;
  }, new Map());
}

export function scoreBiochemistryReadings(
  rawReadings: BiochemistryRawReadings,
  lookupRowsOrIndex: BiochemistryLookupRow[] | LookupIndex,
): BiochemistryScoringResult {
  const lookupIndex = Array.isArray(lookupRowsOrIndex)
    ? buildBiochemistryLookupIndex(lookupRowsOrIndex)
    : lookupRowsOrIndex;
  const derivedReadings = {
    phAverage: calculatePhAverage(rawReadings.phSaliva, rawReadings.phUrine),
    conductivityConvertedCValue: convertConductivityToC(rawReadings.conductivityRawMeterValue),
  } satisfies BiochemistryDerivedReadings;

  const carbs = resolveExactLoss(lookupIndex, "carbs", rawReadings.carbsReading);
  const phAverage = resolveExactLoss(lookupIndex, "ph_average", derivedReadings.phAverage);
  const salts = resolveExactLoss(lookupIndex, "salts", derivedReadings.conductivityConvertedCValue);
  const urea = resolveExactLoss(lookupIndex, "urea", rawReadings.ureaReading);

  const scoringBlockers = [carbs, phAverage, salts, urea]
    .filter((result): result is Extract<typeof result, { found: false }> => !result.found)
    .map((result) => ({
      lookupType: result.lookupType,
      exactReading: result.exactReading,
      reason: "missing_exact_lookup" as const,
    }));

  const snapshotBase = {
    formulaVersion: BIOCHEMISTRY_FORMULA_VERSION,
    lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
    lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
    rawReadings,
    derivedReadings,
    losses: {
      carbs: carbs.loss,
      phAverage: phAverage.loss,
      salts: salts.loss,
      urea: urea.loss,
    },
    scoringBlockers,
  } satisfies Omit<BiochemistryScoreSnapshot, "scoringStatus">;

  if (scoringBlockers.length > 0 || !carbs.loss || !phAverage.loss || !salts.loss || !urea.loss) {
    return {
      ...snapshotBase,
      scoringStatus: "blocked",
    };
  }

  const hydrationScoreEnergyLoss = calculateHydrationScoreEnergyLoss(
    carbs.loss.lossFraction,
    salts.loss.lossFraction,
  );
  const healthScoreEnergyLoss = calculateHealthScoreEnergyLoss(
    carbs.loss.lossFraction,
    phAverage.loss.lossFraction,
    salts.loss.lossFraction,
    urea.loss.lossFraction,
  );

  return {
    ...snapshotBase,
    losses: {
      carbs: carbs.loss,
      phAverage: phAverage.loss,
      salts: salts.loss,
      urea: urea.loss,
    },
    hydrationScoreEnergyLoss,
    hydrationScore: calculateHydrationScore(hydrationScoreEnergyLoss),
    healthScoreEnergyLoss,
    healthScore: calculateHealthScore(healthScoreEnergyLoss),
    scoringStatus: "scored",
    scoringBlockers: [],
  };
}

function resolveExactLoss(index: LookupIndex, lookupType: BiochemistryLookupType, exactReading: number) {
  const normalizedReading = normalizeBiochemistryNumber(exactReading);
  const loss = index.get(getExactLookupKey(lookupType, normalizedReading));

  if (loss) {
    return { found: true as const, lookupType, exactReading: normalizedReading, loss };
  }

  return { found: false as const, lookupType, exactReading: normalizedReading, loss: undefined };
}

export type BiochemistryScoreKind = "hydration" | "health";
export type BiochemistryScoreZone = "green" | "amber" | "red";
export type BiochemistryZoneStatus = "classified" | "blocked" | "unclassified";
export type BiochemistryRecommendationCategory =
  | "hydration"
  | "feed"
  | "supplements"
  | "water_timing_volume"
  | "other";
export type BiochemistryRecommendationRuleStatus = "draft" | "active" | "inactive";
export type BiochemistryRecommendationResultStatus = "generated" | "blocked" | "unavailable";
export type BiochemistryRecommendationLevel = 1 | 2 | 3 | 4 | 5;

export type BiochemistryZoneThreshold = {
  zone: BiochemistryScoreZone;
  minScore: number;
  maxScore: number;
  label?: string;
};

export type BiochemistryZoneThresholdSet = {
  scoreKind: BiochemistryScoreKind;
  sourceDocument: string;
  sourceVersion: string;
  thresholds: BiochemistryZoneThreshold[];
};

export type BiochemistryZoneSnapshot = {
  scoreKind: BiochemistryScoreKind;
  score?: number;
  zoneStatus: BiochemistryZoneStatus;
  zone?: BiochemistryScoreZone;
  label?: string;
  thresholdSourceDocument?: string;
  thresholdSourceVersion?: string;
  blockers: Array<{
    reason:
      | "scoring_blocked"
      | "missing_score"
      | "missing_threshold_set"
      | "incomplete_threshold_set"
      | "score_outside_thresholds";
    scoreKind: BiochemistryScoreKind;
  }>;
};

export type BiochemistryRecommendationRule = {
  ruleId: string;
  category: BiochemistryRecommendationCategory;
  scoreKind: BiochemistryScoreKind;
  zone: BiochemistryScoreZone;
  level: BiochemistryRecommendationLevel;
  status: BiochemistryRecommendationRuleStatus;
  content: string;
  sourceDocument: string;
  sourceVersion: string;
};

export type BiochemistryRecommendationSnapshot = {
  ruleId: string;
  category: BiochemistryRecommendationCategory;
  scoreKind: BiochemistryScoreKind;
  zone: BiochemistryScoreZone;
  level: BiochemistryRecommendationLevel;
  content: string;
  sourceDocument: string;
  sourceVersion: string;
};

export type BiochemistryRecommendationResult = {
  status: BiochemistryRecommendationResultStatus;
  recommendations: BiochemistryRecommendationSnapshot[];
  blockers: Array<{
    reason:
      | "zone_blocked"
      | "missing_active_rule"
      | "missing_active_rule_content";
    scoreKind?: BiochemistryScoreKind;
    zone?: BiochemistryScoreZone;
    category?: BiochemistryRecommendationCategory;
  }>;
};

export function classifyBiochemistryScore(
  scoreKind: BiochemistryScoreKind,
  score: number | undefined,
  thresholdSet?: BiochemistryZoneThresholdSet,
): BiochemistryZoneSnapshot {
  if (score === undefined) {
    return buildBlockedZone(scoreKind, "missing_score");
  }

  if (!thresholdSet) {
    return buildBlockedZone(scoreKind, "missing_threshold_set", score);
  }

  if (thresholdSet.scoreKind !== scoreKind || !hasCompleteZoneThresholds(thresholdSet)) {
    return buildBlockedZone(scoreKind, "incomplete_threshold_set", score, thresholdSet);
  }

  const normalizedScore = normalizeBiochemistryNumber(score);
  const threshold = thresholdSet.thresholds.find(
    (candidate) => normalizedScore >= normalizeBiochemistryNumber(candidate.minScore)
      && normalizedScore <= normalizeBiochemistryNumber(candidate.maxScore),
  );

  if (!threshold) {
    return buildBlockedZone(scoreKind, "score_outside_thresholds", normalizedScore, thresholdSet);
  }

  return {
    scoreKind,
    score: normalizedScore,
    zoneStatus: "classified",
    zone: threshold.zone,
    label: threshold.label,
    thresholdSourceDocument: thresholdSet.sourceDocument,
    thresholdSourceVersion: thresholdSet.sourceVersion,
    blockers: [],
  };
}

export function classifyBiochemistryScoringResult(
  scoringResult: BiochemistryScoringResult,
  thresholdSets: BiochemistryZoneThresholdSet[],
) {
  if (scoringResult.scoringStatus !== "scored") {
    return {
      hydration: buildBlockedZone("hydration", "scoring_blocked"),
      health: buildBlockedZone("health", "scoring_blocked"),
    };
  }

  return {
    hydration: classifyBiochemistryScore(
      "hydration",
      scoringResult.hydrationScore,
      thresholdSets.find((thresholdSet) => thresholdSet.scoreKind === "hydration"),
    ),
    health: classifyBiochemistryScore(
      "health",
      scoringResult.healthScore,
      thresholdSets.find((thresholdSet) => thresholdSet.scoreKind === "health"),
    ),
  };
}

export function generateBiochemistryRecommendations(
  zoneSnapshots: BiochemistryZoneSnapshot[],
  rules: BiochemistryRecommendationRule[],
  categories: BiochemistryRecommendationCategory[] = [
    "hydration",
    "feed",
    "supplements",
    "water_timing_volume",
    "other",
  ],
): BiochemistryRecommendationResult {
  const blockedZones = zoneSnapshots.filter((snapshot) => snapshot.zoneStatus !== "classified" || !snapshot.zone);

  if (blockedZones.length > 0) {
    return {
      status: "blocked",
      recommendations: [],
      blockers: blockedZones.map((snapshot) => ({
        reason: "zone_blocked",
        scoreKind: snapshot.scoreKind,
        zone: snapshot.zone,
      })),
    };
  }

  const activeRules = rules.filter((rule) => rule.status === "active");
  const recommendations: BiochemistryRecommendationSnapshot[] = [];
  const blockers: BiochemistryRecommendationResult["blockers"] = [];

  for (const snapshot of zoneSnapshots) {
    for (const category of categories) {
      const matchingRules = activeRules.filter(
        (rule) => rule.scoreKind === snapshot.scoreKind
          && rule.zone === snapshot.zone
          && rule.category === category,
      );

      if (matchingRules.length === 0) {
        blockers.push({
          reason: "missing_active_rule",
          scoreKind: snapshot.scoreKind,
          zone: snapshot.zone,
          category,
        });
        continue;
      }

      for (const rule of matchingRules) {
        if (rule.content.trim() === "") {
          blockers.push({
            reason: "missing_active_rule_content",
            scoreKind: rule.scoreKind,
            zone: rule.zone,
            category: rule.category,
          });
          continue;
        }

        recommendations.push({
          ruleId: rule.ruleId,
          category: rule.category,
          scoreKind: rule.scoreKind,
          zone: rule.zone,
          level: rule.level,
          content: rule.content,
          sourceDocument: rule.sourceDocument,
          sourceVersion: rule.sourceVersion,
        });
      }
    }
  }

  if (recommendations.length === 0 || blockers.length > 0) {
    return {
      status: recommendations.length > 0 ? "generated" : "unavailable",
      recommendations,
      blockers,
    };
  }

  return {
    status: "generated",
    recommendations,
    blockers: [],
  };
}

function buildBlockedZone(
  scoreKind: BiochemistryScoreKind,
  reason: BiochemistryZoneSnapshot["blockers"][number]["reason"],
  score?: number,
  thresholdSet?: BiochemistryZoneThresholdSet,
): BiochemistryZoneSnapshot {
  return {
    scoreKind,
    score: score === undefined ? undefined : normalizeBiochemistryNumber(score),
    zoneStatus: "blocked",
    thresholdSourceDocument: thresholdSet?.sourceDocument,
    thresholdSourceVersion: thresholdSet?.sourceVersion,
    blockers: [{ reason, scoreKind }],
  };
}

function hasCompleteZoneThresholds(thresholdSet: BiochemistryZoneThresholdSet) {
  const requiredZones: BiochemistryScoreZone[] = ["green", "amber", "red"];

  return requiredZones.every((zone) => {
    const threshold = thresholdSet.thresholds.find((candidate) => candidate.zone === zone);

    return Boolean(threshold)
      && Number.isFinite(threshold?.minScore)
      && Number.isFinite(threshold?.maxScore)
      && Number(threshold?.minScore) <= Number(threshold?.maxScore);
  });
}
