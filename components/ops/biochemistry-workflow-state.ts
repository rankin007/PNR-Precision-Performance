import type { BiochemistryTimeOfDay } from "@/lib/domain/biochemistry";

export const BIOCHEMISTRY_NOTES_LIMIT = 2000;
export const BIOCHEMISTRY_TIME_ZONE = "Australia/Brisbane";
export type BiochemistryHorseOption = { id: string; name: string };

export function biochemistryNoteRequiresReview(notes: string) {
  return notes.trim().length > 0;
}

export function canSubmitBiochemistryNote(notes: string, reviewConfirmed: boolean) {
  return !biochemistryNoteRequiresReview(notes) || reviewConfirmed;
}

export type BiochemistryWorkflowStage = "capture" | "review" | "submitting";
export type BiochemistryCaptureValues = {
  horseId: string;
  horseName: string;
  testDate: string;
  timeOfDay: BiochemistryTimeOfDay;
  carbsReading: string;
  phSaliva: string;
  phUrine: string;
  conductivityRawMeterValue: string;
  notes: string;
};
export type BiochemistryFieldName = keyof BiochemistryCaptureValues;
export type BiochemistryValidationErrorCode =
  | "required" | "invalid-number" | "non-finite-number" | "out-of-range" | "invalid-precision" | "notes-too-long";
export type BiochemistryFieldError = {
  field: BiochemistryFieldName;
  code: BiochemistryValidationErrorCode;
  message: string;
};
export type BiochemistryNumericField = "carbsReading" | "phSaliva" | "phUrine" | "conductivityRawMeterValue";
export type BiochemistryValidationResult =
  | { ok: true; values: BiochemistryCaptureValues; normalizedNumbers: Record<BiochemistryNumericField, number> }
  | { ok: false; errors: BiochemistryFieldError[] };

export const BIOCHEMISTRY_NUMERIC_FIELDS: Array<{ field: BiochemistryNumericField; label: string; unit: string }> = [
  { field: "carbsReading", label: "Carbohydrate", unit: "% Brix" },
  { field: "phSaliva", label: "Saliva pH", unit: "pH" },
  { field: "phUrine", label: "Urine pH", unit: "pH" },
  { field: "conductivityRawMeterValue", label: "Conductivity", unit: "mS/cm" },
];
export const BIOCHEMISTRY_NUMERIC_RULES: Record<BiochemistryNumericField, { min: number; max: number; step: number }> = {
  carbsReading: { min: 0, max: 15, step: 0.1 },
  phSaliva: { min: 4.8, max: 9, step: 0.01 },
  phUrine: { min: 4.8, max: 9, step: 0.01 },
  conductivityRawMeterValue: { min: 0, max: 99, step: 0.01 },
};
export const BIOCHEMISTRY_TIME_OF_DAY_OPTIONS: Array<{ value: BiochemistryTimeOfDay; label: string }> = [
  { value: "am", label: "AM" },
  { value: "pm", label: "PM" },
  { value: "unspecified", label: "Unspecified" },
];
export const EMPTY_BIOCHEMISTRY_CAPTURE_VALUES: BiochemistryCaptureValues = {
  horseId: "", horseName: "", testDate: "", timeOfDay: "unspecified",
  carbsReading: "", phSaliva: "", phUrine: "", conductivityRawMeterValue: "", notes: "",
};

function captureDateParts(reference: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BIOCHEMISTRY_TIME_ZONE,
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23",
  }).formatToParts(reference);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return { date: value("year") + "-" + value("month") + "-" + value("day"), hour: Number(value("hour")) };
}

export function createInitialBiochemistryCaptureValues(input: {
  horses: BiochemistryHorseOption[];
  requestedHorseId?: string;
  now?: Date;
}): BiochemistryCaptureValues {
  const matchingHorse = input.horses.find((horse) => horse.id === input.requestedHorseId);
  const clock = captureDateParts(input.now ?? new Date());
  return {
    ...EMPTY_BIOCHEMISTRY_CAPTURE_VALUES,
    horseId: matchingHorse?.id ?? "",
    horseName: matchingHorse?.name ?? "",
    testDate: clock.date,
    timeOfDay: clock.hour < 12 ? "am" : "pm",
  };
}

function requiredError(field: BiochemistryFieldName, label: string): BiochemistryFieldError {
  return { field, code: "required", message: label + " is required." };
}

function numericError(
  field: BiochemistryNumericField,
  code: Extract<BiochemistryValidationErrorCode, "invalid-number" | "non-finite-number">,
  label: string,
): BiochemistryFieldError {
  return { field, code, message: code === "non-finite-number" ? label + " must be a finite number." : label + " must be a valid number." };
}

export function isBiochemistryTimeOfDay(value: string): value is BiochemistryTimeOfDay {
  return value === "am" || value === "pm" || value === "unspecified";
}

export function normalizeBiochemistryCaptureValues(values: Partial<BiochemistryCaptureValues>): BiochemistryCaptureValues {
  const timeOfDay = values.timeOfDay && isBiochemistryTimeOfDay(values.timeOfDay) ? values.timeOfDay : "unspecified";
  return {
    horseId: values.horseId?.trim() ?? "",
    horseName: values.horseName?.trim() ?? "",
    testDate: values.testDate?.trim() ?? "",
    timeOfDay,
    carbsReading: values.carbsReading?.trim() ?? "",
    phSaliva: values.phSaliva?.trim() ?? "",
    phUrine: values.phUrine?.trim() ?? "",
    conductivityRawMeterValue: values.conductivityRawMeterValue?.trim() ?? "",
    notes: values.notes ?? "",
  };
}

export function validateBiochemistryCaptureValues(input: Partial<BiochemistryCaptureValues>): BiochemistryValidationResult {
  const values = normalizeBiochemistryCaptureValues(input);
  const errors: BiochemistryFieldError[] = [];
  const normalizedNumbers = {} as Record<BiochemistryNumericField, number>;
  if (!values.horseId) errors.push(requiredError("horseId", "Horse"));
  if (!values.testDate) errors.push(requiredError("testDate", "Test date"));
  for (const { field, label } of BIOCHEMISTRY_NUMERIC_FIELDS) {
    const rawValue = values[field];
    if (!rawValue) { errors.push(requiredError(field, label)); continue; }
    const parsed = Number(rawValue);
    if (Number.isNaN(parsed)) { errors.push(numericError(field, "invalid-number", label)); continue; }
    if (!Number.isFinite(parsed)) { errors.push(numericError(field, "non-finite-number", label)); continue; }
    const rule = BIOCHEMISTRY_NUMERIC_RULES[field];
    if (parsed < rule.min || parsed > rule.max) {
      errors.push({ field, code: "out-of-range", message: label + " must be between " + rule.min + " and " + rule.max + ", inclusive." });
      continue;
    }
    const units = parsed / rule.step;
    if (Math.abs(units - Math.round(units)) > 1e-8) {
      errors.push({ field, code: "invalid-precision", message: label + " must use increments of " + rule.step + "." });
      continue;
    }
    normalizedNumbers[field] = parsed;
  }
  if (values.notes.length > BIOCHEMISTRY_NOTES_LIMIT) {
    errors.push({ field: "notes", code: "notes-too-long", message: "Typed notes must contain " + BIOCHEMISTRY_NOTES_LIMIT + " characters or fewer." });
  }
  return errors.length > 0 ? { ok: false, errors } : { ok: true, values, normalizedNumbers };
}

export function biochemistryServerErrorMessage(error: string | undefined) {
  switch (error) {
    case "missing-fields": return "Horse, date, time of day, and all readings are required.";
    case "invalid-number": return "All reading fields must contain valid finite numbers.";
    case "horse-not-accessible": return "That horse is not available for biochemistry entry from this account.";
    case "supabase-not-configured": return "Supabase is not configured, so live biochemistry tests cannot be submitted yet.";
    case "biochemistry-schema-unavailable": return "The biochemistry tables are not available in Supabase yet. Apply the approved local migration before live submissions.";
    case "lookup-load-failed": return "Lookup rows could not be loaded, so scoring cannot run without guessing.";
    case "save-failed": return "The biochemistry test could not be saved.";
    case "comment-length": return "Typed notes must contain " + BIOCHEMISTRY_NOTES_LIMIT + " characters or fewer.";
    default: return error ? "The biochemistry form could not be submitted yet." : null;
  }
}

export function timeOfDayLabel(value: BiochemistryTimeOfDay | string) {
  if (value === "am") return "AM";
  if (value === "pm") return "PM";
  return "Unspecified";
}
