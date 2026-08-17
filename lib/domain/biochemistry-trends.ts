export const TREND_RANGE_OPTIONS = [30, 90, 365] as const;
export const TREND_TIME_FILTERS = ["am", "pm", "both", "all"] as const;
export const TREND_SCORE_VIEWS = ["none", "hydration", "biochemistry", "both"] as const;
export const TREND_PH_VIEWS = ["none", "urine", "saliva", "both"] as const;
export const TREND_PAGE_SIZE = 500;

export type TrendRangeDays = (typeof TREND_RANGE_OPTIONS)[number];
export type TrendTimeFilter = (typeof TREND_TIME_FILTERS)[number];
export type TrendScoreView = (typeof TREND_SCORE_VIEWS)[number];
export type TrendPhView = (typeof TREND_PH_VIEWS)[number];
export type TrendScoringStatus = "scored" | "blocked" | "unscored";
export type TrendTimeOfDay = "am" | "pm" | "unspecified";

export type TrendPreferenceConfig = {
  scoreView: TrendScoreView;
  phView: TrendPhView;
  showCarbohydrate: boolean;
  showConductivity: boolean;
  timeFilter: TrendTimeFilter;
  rangeDays: TrendRangeDays;
};

export type TrendPreference = TrendPreferenceConfig & {
  id: string;
  label: string;
  isDefault: boolean;
};

export const DEFAULT_TREND_PREFERENCE: TrendPreferenceConfig = {
  scoreView: "both",
  phView: "both",
  showCarbohydrate: false,
  showConductivity: false,
  timeFilter: "both",
  rangeDays: 90,
};

export type BiochemistryTrendRow = {
  id: string;
  horseId: string;
  testDate: string;
  timeOfDay: TrendTimeOfDay;
  scoringStatus: TrendScoringStatus;
  hydrationScore: number | null;
  healthScore: number | null;
  carbsReading: number;
  phUrine: number;
  phSaliva: number;
  conductivityRawMeterValue: number;
  formulaVersion: string;
  lookupSourceDocument: string;
  lookupSourceVersion: string;
};

export type RawBiochemistryTrendRow = {
  id: unknown;
  horse_id: unknown;
  test_date: unknown;
  time_of_day: unknown;
  scoring_status: unknown;
  hydration_score: unknown;
  health_score: unknown;
  carbs_reading: unknown;
  ph_urine: unknown;
  ph_saliva: unknown;
  conductivity_raw_meter_value: unknown;
  formula_version: unknown;
  lookup_source_document: unknown;
  lookup_source_version: unknown;
};

export type TrendPage = {
  data: RawBiochemistryTrendRow[] | null;
  count: number | null;
  error: unknown;
};

export type TrendPageLoader = (input: {
  pass: 1 | 2;
  offset: number;
  limit: number;
  horseId: string;
  startDate: string;
  endDate: string;
}) => Promise<TrendPage>;

export type TrendHistoryResult =
  | { availability: "selection-required"; selectedHorseId: null }
  | { availability: "unavailable"; selectedHorseId: string | null; error: string }
  | {
      availability: "available";
      selectedHorseId: string;
      rows: BiochemistryTrendRow[];
      totalCount: number;
      startDate: string;
      endDate: string;
    };

export type ScoreMetric = "hydrationScore" | "healthScore";
export type TrendChartGroup = "scores" | "ph" | "carbohydrate" | "conductivity";

export type ScoreSegment = {
  formulaVersion: string;
  sourceVersion: string;
  points: Array<{ row: BiochemistryTrendRow; value: number }>;
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isOneOf<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function parseFiniteNumber(value: unknown) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function parseTrendRange(value: unknown): TrendRangeDays {
  const parsed = typeof value === "number" ? value : Number(value);
  return TREND_RANGE_OPTIONS.includes(parsed as TrendRangeDays) ? (parsed as TrendRangeDays) : 90;
}

export function parseTrendTimeFilter(value: unknown): TrendTimeFilter {
  return isOneOf(value, TREND_TIME_FILTERS) ? value : "both";
}

export function getBrisbaneDateKey(reference = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Brisbane",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(reference);
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

export function deriveTrendDateBounds(rangeDays: TrendRangeDays, reference = new Date()) {
  const endDate = getBrisbaneDateKey(reference);
  const start = new Date(`${endDate}T00:00:00.000Z`);
  start.setUTCDate(start.getUTCDate() - (rangeDays - 1));
  return { startDate: start.toISOString().slice(0, 10), endDate };
}

export function resolveAccessibleHorseId(accessibleHorseIds: readonly string[], hint: unknown) {
  if (typeof hint !== "string" || hint.length === 0) return null;
  return accessibleHorseIds.includes(hint) ? hint : null;
}

function normalizeTrendRow(raw: RawBiochemistryTrendRow, horseId: string, startDate: string, endDate: string) {
  const carbsReading = parseFiniteNumber(raw.carbs_reading);
  const phUrine = parseFiniteNumber(raw.ph_urine);
  const phSaliva = parseFiniteNumber(raw.ph_saliva);
  const conductivity = parseFiniteNumber(raw.conductivity_raw_meter_value);
  const hydrationScore = raw.hydration_score === null ? null : parseFiniteNumber(raw.hydration_score);
  const healthScore = raw.health_score === null ? null : parseFiniteNumber(raw.health_score);

  if (
    typeof raw.id !== "string"
    || typeof raw.horse_id !== "string"
    || raw.horse_id !== horseId
    || !isIsoDate(raw.test_date)
    || raw.test_date < startDate
    || raw.test_date > endDate
    || !isOneOf(raw.time_of_day, ["am", "pm", "unspecified"] as const)
    || !isOneOf(raw.scoring_status, ["scored", "blocked", "unscored"] as const)
    || carbsReading === null
    || phUrine === null
    || phSaliva === null
    || conductivity === null
    || (raw.hydration_score !== null && hydrationScore === null)
    || (raw.health_score !== null && healthScore === null)
    || typeof raw.formula_version !== "string"
    || typeof raw.lookup_source_document !== "string"
    || typeof raw.lookup_source_version !== "string"
  ) {
    return null;
  }

  return {
    id: raw.id,
    horseId: raw.horse_id,
    testDate: raw.test_date,
    timeOfDay: raw.time_of_day,
    scoringStatus: raw.scoring_status,
    hydrationScore,
    healthScore,
    carbsReading,
    phUrine,
    phSaliva,
    conductivityRawMeterValue: conductivity,
    formulaVersion: raw.formula_version,
    lookupSourceDocument: raw.lookup_source_document,
    lookupSourceVersion: raw.lookup_source_version,
  } satisfies BiochemistryTrendRow;
}

function compareRowsDescending(left: BiochemistryTrendRow, right: BiochemistryTrendRow) {
  if (left.testDate !== right.testDate) return left.testDate > right.testDate ? -1 : 1;
  if (left.timeOfDay !== right.timeOfDay) return left.timeOfDay > right.timeOfDay ? -1 : 1;
  if (left.id !== right.id) return left.id > right.id ? -1 : 1;
  return 0;
}

function fingerprintRows(rows: readonly BiochemistryTrendRow[]) {
  return JSON.stringify(rows.map((row) => [
    row.id,
    row.horseId,
    row.testDate,
    row.timeOfDay,
    row.scoringStatus,
    row.hydrationScore,
    row.healthScore,
    row.carbsReading,
    row.phUrine,
    row.phSaliva,
    row.conductivityRawMeterValue,
    row.formulaVersion,
    row.lookupSourceDocument,
    row.lookupSourceVersion,
  ]));
}

async function loadHistoryPass(input: {
  pass: 1 | 2;
  horseId: string;
  startDate: string;
  endDate: string;
  loadPage: TrendPageLoader;
}) {
  const rows: BiochemistryTrendRow[] = [];
  const ids = new Set<string>();
  let expectedCount: number | null = null;

  do {
    const page = await input.loadPage({
      pass: input.pass,
      offset: rows.length,
      limit: TREND_PAGE_SIZE,
      horseId: input.horseId,
      startDate: input.startDate,
      endDate: input.endDate,
    });
    if (page.error || !Array.isArray(page.data) || typeof page.count !== "number" || !Number.isInteger(page.count) || page.count < 0) return null;
    if (page.data.length > TREND_PAGE_SIZE) return null;
    if (expectedCount === null) expectedCount = page.count;
    if (page.count !== expectedCount) return null;

    for (const raw of page.data) {
      const row = normalizeTrendRow(raw, input.horseId, input.startDate, input.endDate);
      if (!row || ids.has(row.id)) return null;
      if (rows.length > 0 && compareRowsDescending(rows[rows.length - 1], row) >= 0) return null;
      ids.add(row.id);
      rows.push(row);
    }

    if (page.data.length === 0 && rows.length < expectedCount) return null;
    if (rows.length > expectedCount) return null;
  } while (expectedCount === null || rows.length < expectedCount);

  return expectedCount === rows.length ? { rows, count: expectedCount, fingerprint: fingerprintRows(rows) } : null;
}

export async function loadCompleteTrendHistory(input: {
  accessibleHorseIds: readonly string[];
  horseHint: unknown;
  rangeDays: TrendRangeDays;
  reference?: Date;
  loadPage: TrendPageLoader;
}): Promise<TrendHistoryResult> {
  const selectedHorseId = resolveAccessibleHorseId(input.accessibleHorseIds, input.horseHint);
  if (!selectedHorseId) return { availability: "selection-required", selectedHorseId: null };

  const bounds = deriveTrendDateBounds(input.rangeDays, input.reference);
  try {
    const first = await loadHistoryPass({ pass: 1, horseId: selectedHorseId, ...bounds, loadPage: input.loadPage });
    const second = await loadHistoryPass({ pass: 2, horseId: selectedHorseId, ...bounds, loadPage: input.loadPage });
    if (!first || !second || first.count !== second.count || first.fingerprint !== second.fingerprint) {
      return { availability: "unavailable", selectedHorseId, error: "Trend history could not be loaded completely." };
    }
    return {
      availability: "available",
      selectedHorseId,
      rows: first.rows,
      totalCount: first.count,
      ...bounds,
    };
  } catch {
    return { availability: "unavailable", selectedHorseId, error: "Trend history could not be loaded completely." };
  }
}

export function filterTrendRows(rows: readonly BiochemistryTrendRow[], filter: TrendTimeFilter) {
  const unspecifiedCount = rows.filter((row) => row.timeOfDay === "unspecified").length;
  if (filter === "all") return { rows: [...rows], excludedUnspecifiedCount: 0 };
  if (filter === "both") {
    return { rows: rows.filter((row) => row.timeOfDay === "am" || row.timeOfDay === "pm"), excludedUnspecifiedCount: unspecifiedCount };
  }
  return { rows: rows.filter((row) => row.timeOfDay === filter), excludedUnspecifiedCount: unspecifiedCount };
}

export function buildScoreSegments(rows: readonly BiochemistryTrendRow[], metric: ScoreMetric) {
  const segments: ScoreSegment[] = [];
  let current: ScoreSegment | null = null;
  for (const row of [...rows].reverse()) {
    const value = row.scoringStatus === "scored" ? row[metric] : null;
    if (value === null) {
      current = null;
      continue;
    }
    if (!current || current.formulaVersion !== row.formulaVersion || current.sourceVersion !== row.lookupSourceVersion) {
      current = { formulaVersion: row.formulaVersion, sourceVersion: row.lookupSourceVersion, points: [] };
      segments.push(current);
    }
    current.points.push({ row, value });
  }
  return segments;
}

export function getVisibleChartGroups(config: TrendPreferenceConfig) {
  const groups: TrendChartGroup[] = [];
  if (config.scoreView !== "none") groups.push("scores");
  if (config.phView !== "none") groups.push("ph");
  if (config.showCarbohydrate) groups.push("carbohydrate");
  if (config.showConductivity) groups.push("conductivity");
  return groups;
}

export function validateTrendPreferenceConfig(input: unknown): TrendPreferenceConfig | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  const rangeDays = Number(value.rangeDays);
  if (
    !isOneOf(value.scoreView, TREND_SCORE_VIEWS)
    || !isOneOf(value.phView, TREND_PH_VIEWS)
    || typeof value.showCarbohydrate !== "boolean"
    || typeof value.showConductivity !== "boolean"
    || !isOneOf(value.timeFilter, TREND_TIME_FILTERS)
    || !TREND_RANGE_OPTIONS.includes(rangeDays as TrendRangeDays)
  ) return null;
  const config = {
    scoreView: value.scoreView,
    phView: value.phView,
    showCarbohydrate: value.showCarbohydrate,
    showConductivity: value.showConductivity,
    timeFilter: value.timeFilter,
    rangeDays: rangeDays as TrendRangeDays,
  };
  const groupCount = getVisibleChartGroups(config).length;
  return groupCount >= 1 && groupCount <= 2 ? config : null;
}

export function validateTrendPreferenceLabel(input: unknown) {
  if (typeof input !== "string" || input !== input.trim() || input.length < 1 || input.length > 40) return null;
  return input;
}

export function formatTrendValue(value: number | null, metric: "hydration" | "biochemistry" | "carbohydrate" | "ph" | "conductivity") {
  if (value === null) return "Not scored";
  if (metric === "hydration" || metric === "biochemistry") return `${(value * 100).toFixed(1)}%`;
  if (metric === "carbohydrate") return `${value.toFixed(1)}%`;
  if (metric === "conductivity") return `${value.toFixed(2)} mS/cm`;
  return value.toFixed(2);
}

export function timeOfDayLabel(value: TrendTimeOfDay) {
  if (value === "am") return "AM";
  if (value === "pm") return "PM";
  return "Unspecified";
}
