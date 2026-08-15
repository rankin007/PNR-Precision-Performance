"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BIOCHEMISTRY_FORMULA_VERSION,
  BIOCHEMISTRY_FORMULA_VERSION_V2,
  BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
  BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3,
  BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
  BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3,
  type AnyBiochemistryScoringResult,
  type BiochemistryLookupRow,
  type BiochemistryLookupType,
  type BiochemistryRawReadings,
  type BiochemistryRawReadingsV2,
  type BiochemistryScoringResult,
  type BiochemistryScoringResultV2,
  type BiochemistryTimeOfDay,
  getExactLookupKey,
  scoreBiochemistryReadingsV2,
  validateBiochemistryV2RawReadings,
} from "@/lib/domain/biochemistry";
import { requireOperationalWriteAppContext } from "@/lib/auth/session";
import { requirePortalAppContext } from "@/lib/auth/session";
import { canManageComment, validateCommentText } from "@/lib/auth/role-matrix";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;

type LookupValueRow = {
  id: string;
  lookup_type: BiochemistryLookupType;
  exact_reading: number | string;
  exact_reading_text: string;
  loss_fraction: number | string;
  loss_percent_text: string;
  source_document: string | null;
  source_version: string | null;
};

type CommentRow = {
  id: string;
  note_text: string;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
  users?: { member_profiles?: { display_name?: string | null } | Array<{ display_name?: string | null }> | null } | Array<{ member_profiles?: { display_name?: string | null } | Array<{ display_name?: string | null }> | null }> | null;
};

function commentAuthorLabel(users: CommentRow["users"]) {
  const user = Array.isArray(users) ? users[0] : users;
  const profileValue = user?.member_profiles;
  const profile = Array.isArray(profileValue) ? profileValue[0] : profileValue;
  return profile?.display_name ?? "Portal member";
}

export type BiochemistryResultState = {
  envReady: boolean;
  schemaReady: boolean;
  test: {
    id: string;
    horseId: string;
    horseName: string;
    testDate: string;
    timeOfDay: BiochemistryTimeOfDay;
    comments: Array<{
      id: string;
      text: string;
      authorLabel: string;
      authorUserId: string | null;
      createdAt: string;
      updatedAt: string;
      canManage: boolean;
    }>;
    canComment: boolean;
  } | null;
  scoringResult: AnyBiochemistryScoringResult | null;
  error?: "not-found" | "schema-unavailable" | "load-failed";
};

function resultRedirect(testId: string, status: string): never {
  redirect(`/data-entry/biochemistry/${testId}?comment=${encodeURIComponent(status)}`);
}

function hasExactlyOneAffectedComment(data: unknown): data is Array<{ id: string }> {
  return Array.isArray(data)
    && data.length === 1
    && typeof data[0]?.id === "string"
    && data[0].id.length > 0;
}

export async function createBiochemistryCommentAction(formData: FormData) {
  const testId = readString(formData, "testId");
  const validated = validateCommentText(readString(formData, "comment"));
  const context = await requirePortalAppContext(`/data-entry/biochemistry/${testId}`);
  if (!testId || !context.appUserId || !validated.ok) resultRedirect(testId, "invalid");
  const supabase = await createSupabaseServerClient();
  const { data: test } = await supabase.from("biochemistry_tests").select("id,horse_id").eq("id", testId).maybeSingle();
  if (!test) resultRedirect(testId, "denied");
  const { error } = await supabase.from("biochemistry_test_notes").insert({
    test_id: test.id, horse_id: test.horse_id, note_text: validated.text,
    note_source: "manual", created_by_user_id: context.appUserId,
    updated_by_user_id: context.appUserId,
  });
  if (error) resultRedirect(testId, "denied");
  revalidatePath(`/data-entry/biochemistry/${testId}`);
  resultRedirect(testId, "created");
}

export async function updateBiochemistryCommentAction(formData: FormData) {
  const testId = readString(formData, "testId");
  const commentId = readString(formData, "commentId");
  const validated = validateCommentText(readString(formData, "comment"));
  const context = await requirePortalAppContext(`/data-entry/biochemistry/${testId}`);
  if (!commentId || !context.appUserId || !validated.ok) resultRedirect(testId, "invalid");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("biochemistry_test_notes").update({
    note_text: validated.text, updated_at: new Date().toISOString(), updated_by_user_id: context.appUserId,
  }).eq("id", commentId).eq("test_id", testId).is("deleted_at", null).select("id");
  if (error || !hasExactlyOneAffectedComment(data)) resultRedirect(testId, "denied");
  revalidatePath(`/data-entry/biochemistry/${testId}`);
  resultRedirect(testId, "updated");
}

export async function deleteBiochemistryCommentAction(formData: FormData) {
  const testId = readString(formData, "testId");
  const commentId = readString(formData, "commentId");
  const context = await requirePortalAppContext(`/data-entry/biochemistry/${testId}`);
  if (!commentId || !context.appUserId) resultRedirect(testId, "denied");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("soft_delete_biochemistry_comment", {
    target_note_id: commentId,
    target_test_id: testId,
  });
  if (error || data !== true) resultRedirect(testId, "denied");
  revalidatePath(`/data-entry/biochemistry/${testId}`);
  resultRedirect(testId, "deleted");
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readRequiredNumber(formData: FormData, key: string) {
  const value = readString(formData, key);

  if (!value) {
    return { status: "missing" as const, value: null };
  }

  const parsed = Number(value);
  return Number.isFinite(parsed)
    ? { status: "valid" as const, value: parsed }
    : { status: "invalid" as const, value: null };
}

function isTimeOfDay(value: string): value is BiochemistryTimeOfDay {
  return value === "am" || value === "pm" || value === "unspecified";
}

function isSchemaUnavailable(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as { code?: unknown; message?: unknown };
  const code = typeof candidate.code === "string" ? candidate.code : "";
  const message = typeof candidate.message === "string" ? candidate.message.toLowerCase() : "";

  return code === "42P01" || code === "PGRST205" || message.includes("does not exist") || message.includes("schema cache");
}

function lookupRowsToDomainRows(rows: LookupValueRow[]): BiochemistryLookupRow[] {
  return rows.map((row) => {
    if (
      row.source_document !== BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3
      || row.source_version !== BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3
    ) {
      throw new Error("Biochemistry v2 lookup rows must use the accepted v3 source identity.");
    }

    return {
      lookupType: row.lookup_type,
      exactReading: row.exact_reading,
      exactReadingText: row.exact_reading_text,
      lossFraction: row.loss_fraction,
      lossPercentText: row.loss_percent_text,
      sourceDocument: row.source_document,
      sourceVersion: row.source_version,
    };
  });
}

function buildLookupIdMap(rows: LookupValueRow[]) {
  return rows.reduce<Map<string, string>>((map, row) => {
    map.set(getExactLookupKey(row.lookup_type, row.exact_reading), row.id);
    return map;
  }, new Map());
}

async function findWritableHorse(supabase: SupabaseClient, horseId: string) {
  if (!horseId) {
    return null;
  }

  const { data, error } = await supabase
    .from("horses")
    .select("id, name, stable_id")
    .eq("id", horseId)
    .maybeSingle();

  if (error || !data?.id) {
    return null;
  }

  return data as { id: string; name: string; stable_id: string | null };
}

async function fetchLookupRows(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("biochemistry_lookup_values")
    .select("id, lookup_type, exact_reading, exact_reading_text, loss_fraction, loss_percent_text, source_document, source_version")
    .eq("source_version", BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3);

  if (error) {
    return { rows: [] as LookupValueRow[], error };
  }

  return { rows: (data ?? []) as LookupValueRow[], error: null };
}

function redirectWithError(error: string): never {
  redirect(`/data-entry/biochemistry?error=${encodeURIComponent(error)}`);
}

export async function submitBiochemistryTestAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/biochemistry");

  if (!hasSupabaseEnv()) {
    redirectWithError("supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const testDate = readString(formData, "testDate");
  const timeOfDayValue = readString(formData, "timeOfDay") || "unspecified";
  const notes = readString(formData, "notes");
  const validatedInitialNote = notes ? validateCommentText(notes) : null;
  const numericReadings = {
    carbsReading: readRequiredNumber(formData, "carbsReading"),
    phSaliva: readRequiredNumber(formData, "phSaliva"),
    phUrine: readRequiredNumber(formData, "phUrine"),
    conductivityRawMeterValue: readRequiredNumber(formData, "conductivityRawMeterValue"),
  };
  const rawReadings: BiochemistryRawReadingsV2 = {
    carbsReading: numericReadings.carbsReading.value ?? Number.NaN,
    phSaliva: numericReadings.phSaliva.value ?? Number.NaN,
    phUrine: numericReadings.phUrine.value ?? Number.NaN,
    conductivityRawMeterValue: numericReadings.conductivityRawMeterValue.value ?? Number.NaN,
  };

  if (
    !horseId
    || !testDate
    || !isTimeOfDay(timeOfDayValue)
    || !context.appUserId
    || Object.values(numericReadings).some((reading) => reading.status === "missing")
  ) {
    redirectWithError("missing-fields");
  }

  if (
    Object.values(numericReadings).some((reading) => reading.status === "invalid")
    || validateBiochemistryV2RawReadings(rawReadings).length > 0
  ) {
    redirectWithError("invalid-number");
  }
  if (validatedInitialNote && !validatedInitialNote.ok) {
    redirectWithError("comment-length");
  }

  const supabase = await createSupabaseServerClient();
  const horse = await findWritableHorse(supabase, horseId);

  if (!horse) {
    redirectWithError("horse-not-accessible");
  }

  const lookupResult = await fetchLookupRows(supabase);

  if (lookupResult.error) {
    if (isSchemaUnavailable(lookupResult.error)) {
      redirectWithError("biochemistry-schema-unavailable");
    }
    redirectWithError("lookup-load-failed");
  }

  const lookupRows = lookupResult.rows;
  if (lookupRows.length === 0) {
    redirectWithError("lookup-load-failed");
  }

  const lookupIdMap = buildLookupIdMap(lookupRows);
  let domainLookupRows: BiochemistryLookupRow[];
  try {
    domainLookupRows = lookupRowsToDomainRows(lookupRows);
  } catch {
    redirectWithError("lookup-load-failed");
  }
  const scoringResult = scoreBiochemistryReadingsV2(rawReadings, domainLookupRows);

  if (scoringResult.scoringStatus !== "scored") {
    redirectWithError("lookup-load-failed");
  }

  const insertPayload = {
    horse_id: horse.id,
    stable_id: horse.stable_id,
    test_date: testDate,
    time_of_day: timeOfDayValue,
    carbs_reading: rawReadings.carbsReading,
    ph_saliva: rawReadings.phSaliva,
    ph_urine: rawReadings.phUrine,
    ph_average: null,
    conductivity_raw_meter_value: rawReadings.conductivityRawMeterValue,
    conductivity_converted_c_value: scoringResult.derivedReadings.conductivityConvertedCValue,
    conductivity_lookup_c_value: scoringResult.derivedReadings.conductivityLookupCValue,
    urea_reading: null,
    carbs_lookup_value_id: lookupIdMap.get(getExactLookupKey("carbs", scoringResult.losses.carbs.exactReading)) ?? null,
    ph_urine_lookup_value_id: lookupIdMap.get(getExactLookupKey("ph_urine", scoringResult.losses.phUrine.exactReading)) ?? null,
    ph_saliva_lookup_value_id: lookupIdMap.get(getExactLookupKey("ph_saliva", scoringResult.losses.phSaliva.exactReading)) ?? null,
    salts_lookup_value_id: lookupIdMap.get(getExactLookupKey("salts", scoringResult.losses.salts.exactReading)) ?? null,
    ph_average_lookup_value_id: null,
    urea_lookup_value_id: null,
    carbs_lookup_reading: scoringResult.losses.carbs.exactReading,
    ph_urine_lookup_reading: scoringResult.losses.phUrine.exactReading,
    ph_saliva_lookup_reading: scoringResult.losses.phSaliva.exactReading,
    carbs_loss_fraction: scoringResult.losses.carbs.lossFraction,
    ph_urine_loss_fraction: scoringResult.losses.phUrine.lossFraction,
    ph_saliva_loss_fraction: scoringResult.losses.phSaliva.lossFraction,
    salts_loss_fraction: scoringResult.losses.salts.lossFraction,
    ph_average_loss_fraction: null,
    urea_loss_fraction: null,
    hydration_score_energy_loss: scoringResult.hydrationScoreEnergyLoss,
    hydration_score: scoringResult.hydrationScore,
    health_score_energy_loss: scoringResult.healthScoreEnergyLoss,
    health_score: scoringResult.healthScore,
    scoring_status: "scored",
    scoring_blockers: [],
    formula_version: BIOCHEMISTRY_FORMULA_VERSION_V2,
    lookup_source_document: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3,
    lookup_source_version: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3,
    created_by_user_id: context.appUserId,
    updated_by_user_id: context.appUserId,
  };

  const { data: test, error: insertError } = await supabase
    .from("biochemistry_tests")
    .insert(insertPayload)
    .select("id")
    .single();

  if (insertError || !test?.id) {
    if (isSchemaUnavailable(insertError)) {
      redirectWithError("biochemistry-schema-unavailable");
    }
    redirectWithError("save-failed");
  }

  if (validatedInitialNote?.ok) {
    const { error: noteError } = await supabase.from("biochemistry_test_notes").insert({
      test_id: test.id,
      horse_id: horse.id,
      note_text: validatedInitialNote.text,
      note_source: "manual",
      created_by_user_id: context.appUserId,
    });

    if (noteError) {
      if (isSchemaUnavailable(noteError)) {
        redirectWithError("biochemistry-schema-unavailable");
      }
      redirect("/data-entry/biochemistry/" + test.id + "?warning=note-save-failed");
    }
  }

  revalidatePath("/data-entry/biochemistry");
  revalidatePath("/data-entry/biochemistry/" + test.id);
  redirect("/data-entry/biochemistry/" + test.id);
}

export async function getBiochemistryResult(testId: string): Promise<BiochemistryResultState> {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      schemaReady: false,
      test: null,
      scoringResult: null,
      error: "schema-unavailable",
    };
  }

  const supabase = await createSupabaseServerClient();
  const context = await requirePortalAppContext(`/data-entry/biochemistry/${testId}`);
  const { data, error } = await supabase
    .from("biochemistry_tests")
    .select("*, horses(name), biochemistry_test_notes(id,note_text,created_by_user_id,created_at,updated_at,users!biochemistry_test_notes_created_by_user_id_fkey(member_profiles(display_name)))")
    .eq("id", testId)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    return {
      envReady: true,
      schemaReady: !isSchemaUnavailable(error),
      test: null,
      scoringResult: null,
      error: isSchemaUnavailable(error) ? "schema-unavailable" : "load-failed",
    };
  }

  if (!data) {
    return {
      envReady: true,
      schemaReady: true,
      test: null,
      scoringResult: null,
      error: "not-found",
    };
  }

  const makeLossSnapshot = (
    lookupType: BiochemistryLookupType,
    exactReading: number,
    lossFraction: number,
    sourceDocument: string,
    sourceVersion: string,
  ) => ({
    lookupType,
    exactReading,
    exactReadingText: String(exactReading),
    lossFraction,
    lossPercentText: String(lossFraction * 100) + "%",
    sourceDocument,
    sourceVersion,
  });

  const scoringStatus = data.scoring_status === "scored" ? "scored" : "blocked";
  let scoringResult: AnyBiochemistryScoringResult;

  if (data.formula_version === BIOCHEMISTRY_FORMULA_VERSION_V2) {
    const rawReadings: BiochemistryRawReadingsV2 = {
      carbsReading: Number(data.carbs_reading),
      phSaliva: Number(data.ph_saliva),
      phUrine: Number(data.ph_urine),
      conductivityRawMeterValue: Number(data.conductivity_raw_meter_value),
    };
    const derivedReadings = {
      conductivityConvertedCValue: Number(data.conductivity_converted_c_value),
      conductivityLookupCValue: Number(data.conductivity_lookup_c_value),
    };
    const blockers = Array.isArray(data.scoring_blockers)
      ? data.scoring_blockers.map((blocker: { lookupType?: unknown; exactReading?: unknown; reason?: unknown }) => ({
          lookupType: blocker.lookupType === "ph_urine"
            || blocker.lookupType === "ph_saliva"
            || blocker.lookupType === "salts"
            ? blocker.lookupType
            : "carbs",
          exactReading: Number(blocker.exactReading ?? 0),
          reason: blocker.reason === "invalid_reading" || blocker.reason === "below_minimum_lookup"
            ? blocker.reason
            : "missing_lower_lookup",
        }))
      : [];
    scoringResult = scoringStatus === "scored"
      ? {
          formulaVersion: BIOCHEMISTRY_FORMULA_VERSION_V2,
          lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3,
          lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3,
          rawReadings,
          derivedReadings,
          losses: {
            carbs: makeLossSnapshot("carbs", Number(data.carbs_lookup_reading), Number(data.carbs_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3),
            phUrine: makeLossSnapshot("ph_urine", Number(data.ph_urine_lookup_reading), Number(data.ph_urine_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3),
            phSaliva: makeLossSnapshot("ph_saliva", Number(data.ph_saliva_lookup_reading), Number(data.ph_saliva_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3),
            salts: makeLossSnapshot("salts", Number(data.conductivity_lookup_c_value), Number(data.salts_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3),
          },
          hydrationScoreEnergyLoss: Number(data.hydration_score_energy_loss),
          hydrationScore: Number(data.hydration_score),
          healthScoreEnergyLoss: Number(data.health_score_energy_loss),
          healthScore: Number(data.health_score),
          scoringStatus: "scored",
          scoringBlockers: [],
        } as BiochemistryScoringResultV2
      : {
          formulaVersion: BIOCHEMISTRY_FORMULA_VERSION_V2,
          lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT_V3,
          lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION_V3,
          rawReadings,
          derivedReadings,
          losses: {},
          scoringStatus: "blocked",
          scoringBlockers: blockers,
        } as BiochemistryScoringResultV2;
  } else {
    const rawReadings = {
      carbsReading: Number(data.carbs_reading),
      phSaliva: Number(data.ph_saliva),
      phUrine: Number(data.ph_urine),
      conductivityRawMeterValue: Number(data.conductivity_raw_meter_value),
      ureaReading: Number(data.urea_reading),
    } satisfies BiochemistryRawReadings;
    const derivedReadings = {
      phAverage: Number(data.ph_average),
      conductivityConvertedCValue: Number(data.conductivity_converted_c_value),
    };
    const blockers = Array.isArray(data.scoring_blockers)
      ? data.scoring_blockers.map((blocker: { lookupType?: unknown; exactReading?: unknown }) => ({
          lookupType: blocker.lookupType === "ph_average"
            || blocker.lookupType === "salts"
            || blocker.lookupType === "urea"
            ? blocker.lookupType
            : "carbs",
          exactReading: Number(blocker.exactReading ?? 0),
          reason: "missing_exact_lookup" as const,
        }))
      : [];
    scoringResult = scoringStatus === "scored"
      ? {
          formulaVersion: BIOCHEMISTRY_FORMULA_VERSION,
          lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
          lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
          rawReadings,
          derivedReadings,
          losses: {
            carbs: makeLossSnapshot("carbs", rawReadings.carbsReading, Number(data.carbs_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION),
            phAverage: makeLossSnapshot("ph_average", derivedReadings.phAverage, Number(data.ph_average_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION),
            salts: makeLossSnapshot("salts", derivedReadings.conductivityConvertedCValue, Number(data.salts_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION),
            urea: makeLossSnapshot("urea", rawReadings.ureaReading, Number(data.urea_loss_fraction), BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT, BIOCHEMISTRY_LOOKUP_SOURCE_VERSION),
          },
          hydrationScoreEnergyLoss: Number(data.hydration_score_energy_loss),
          hydrationScore: Number(data.hydration_score),
          healthScoreEnergyLoss: Number(data.health_score_energy_loss),
          healthScore: Number(data.health_score),
          scoringStatus: "scored",
          scoringBlockers: [],
        } as BiochemistryScoringResult
      : {
          formulaVersion: BIOCHEMISTRY_FORMULA_VERSION,
          lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
          lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
          rawReadings,
          derivedReadings,
          losses: {},
          scoringStatus: "blocked",
          scoringBlockers: blockers,
        } as BiochemistryScoringResult;
  }

  const comments = ((Array.isArray(data.biochemistry_test_notes) ? data.biochemistry_test_notes : []) as CommentRow[])
    .map((note) => ({
      id: note.id, text: note.note_text,
      authorLabel: commentAuthorLabel(note.users),
      authorUserId: note.created_by_user_id ?? null, createdAt: note.created_at, updatedAt: note.updated_at,
      canManage: canManageComment({ role: context.primaryRole, currentUserId: context.appUserId,
        authorUserId: note.created_by_user_id ?? null, hasHorseAccess: true }),
    }));
  const horse = Array.isArray(data.horses) ? data.horses[0] : data.horses;

  return {
    envReady: true,
    schemaReady: true,
    test: {
      id: data.id,
      horseId: data.horse_id,
      horseName: horse?.name ?? "Horse",
      testDate: data.test_date,
      timeOfDay: isTimeOfDay(data.time_of_day) ? data.time_of_day : "unspecified",
      comments,
      canComment: Boolean(context.primaryRole),
    },
    scoringResult,
  };
}
