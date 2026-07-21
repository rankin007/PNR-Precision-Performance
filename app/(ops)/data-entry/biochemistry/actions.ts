"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BIOCHEMISTRY_FORMULA_VERSION,
  BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
  BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
  type BiochemistryLookupRow,
  type BiochemistryLookupType,
  type BiochemistryRawReadings,
  type BiochemistryScoringResult,
  type BiochemistryTimeOfDay,
  classifyBiochemistryScoringResult,
  generateBiochemistryRecommendations,
  getExactLookupKey,
  scoreBiochemistryReadings,
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
  scoringResult: BiochemistryScoringResult | null;
  zones: ReturnType<typeof classifyBiochemistryScoringResult> | null;
  recommendations: ReturnType<typeof generateBiochemistryRecommendations> | null;
  error?: "not-found" | "schema-unavailable" | "load-failed";
};

function resultRedirect(testId: string, status: string): never {
  redirect(`/data-entry/biochemistry/${testId}?comment=${encodeURIComponent(status)}`);
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
  const { error } = await supabase.from("biochemistry_test_notes").update({
    note_text: validated.text, updated_at: new Date().toISOString(), updated_by_user_id: context.appUserId,
  }).eq("id", commentId).eq("test_id", testId).is("deleted_at", null);
  if (error) resultRedirect(testId, "denied");
  revalidatePath(`/data-entry/biochemistry/${testId}`);
  resultRedirect(testId, "updated");
}

export async function deleteBiochemistryCommentAction(formData: FormData) {
  const testId = readString(formData, "testId");
  const commentId = readString(formData, "commentId");
  const context = await requirePortalAppContext(`/data-entry/biochemistry/${testId}`);
  if (!commentId || !context.appUserId) resultRedirect(testId, "denied");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("biochemistry_test_notes").update({
    deleted_at: new Date().toISOString(), deleted_by_user_id: context.appUserId,
    delete_reason: "user-request", updated_at: new Date().toISOString(), updated_by_user_id: context.appUserId,
  }).eq("id", commentId).eq("test_id", testId).is("deleted_at", null);
  if (error) resultRedirect(testId, "denied");
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
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
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
  return rows.map((row) => ({
    lookupType: row.lookup_type,
    exactReading: row.exact_reading,
    exactReadingText: row.exact_reading_text,
    lossFraction: row.loss_fraction,
    lossPercentText: row.loss_percent_text,
    sourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
    sourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
  }));
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
    .eq("source_version", BIOCHEMISTRY_LOOKUP_SOURCE_VERSION);

  if (error) {
    return { rows: [] as LookupValueRow[], error };
  }

  return { rows: (data ?? []) as LookupValueRow[], error: null };
}

function createZonesAndRecommendations(scoringResult: BiochemistryScoringResult) {
  const zones = classifyBiochemistryScoringResult(scoringResult, []);
  const recommendations = generateBiochemistryRecommendations([zones.hydration, zones.health], []);

  return { zones, recommendations };
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
  const rawReadings: BiochemistryRawReadings = {
    carbsReading: readRequiredNumber(formData, "carbsReading") ?? Number.NaN,
    phSaliva: readRequiredNumber(formData, "phSaliva") ?? Number.NaN,
    phUrine: readRequiredNumber(formData, "phUrine") ?? Number.NaN,
    conductivityRawMeterValue: readRequiredNumber(formData, "conductivityRawMeterValue") ?? Number.NaN,
    ureaReading: readRequiredNumber(formData, "ureaReading") ?? Number.NaN,
  };

  if (!horseId || !testDate || !isTimeOfDay(timeOfDayValue) || !context.appUserId) {
    redirectWithError("missing-fields");
  }

  if (Object.values(rawReadings).some((value) => !Number.isFinite(value))) {
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
  const scoringResult = scoreBiochemistryReadings(rawReadings, lookupRowsToDomainRows(lookupRows));

  const insertPayload = {
    horse_id: horse.id,
    stable_id: horse.stable_id,
    test_date: testDate,
    time_of_day: timeOfDayValue,
    carbs_reading: rawReadings.carbsReading,
    ph_saliva: rawReadings.phSaliva,
    ph_urine: rawReadings.phUrine,
    ph_average: scoringResult.derivedReadings.phAverage,
    conductivity_raw_meter_value: rawReadings.conductivityRawMeterValue,
    conductivity_converted_c_value: scoringResult.derivedReadings.conductivityConvertedCValue,
    urea_reading: rawReadings.ureaReading,
    carbs_lookup_value_id: scoringResult.losses.carbs
      ? lookupIdMap.get(getExactLookupKey("carbs", scoringResult.losses.carbs.exactReading)) ?? null
      : null,
    ph_average_lookup_value_id: scoringResult.losses.phAverage
      ? lookupIdMap.get(getExactLookupKey("ph_average", scoringResult.losses.phAverage.exactReading)) ?? null
      : null,
    salts_lookup_value_id: scoringResult.losses.salts
      ? lookupIdMap.get(getExactLookupKey("salts", scoringResult.losses.salts.exactReading)) ?? null
      : null,
    urea_lookup_value_id: scoringResult.losses.urea
      ? lookupIdMap.get(getExactLookupKey("urea", scoringResult.losses.urea.exactReading)) ?? null
      : null,
    carbs_loss_fraction: scoringResult.losses.carbs?.lossFraction ?? null,
    ph_average_loss_fraction: scoringResult.losses.phAverage?.lossFraction ?? null,
    salts_loss_fraction: scoringResult.losses.salts?.lossFraction ?? null,
    urea_loss_fraction: scoringResult.losses.urea?.lossFraction ?? null,
    hydration_score_energy_loss: scoringResult.scoringStatus === "scored" ? scoringResult.hydrationScoreEnergyLoss : null,
    hydration_score: scoringResult.scoringStatus === "scored" ? scoringResult.hydrationScore : null,
    health_score_energy_loss: scoringResult.scoringStatus === "scored" ? scoringResult.healthScoreEnergyLoss : null,
    health_score: scoringResult.scoringStatus === "scored" ? scoringResult.healthScore : null,
    scoring_status: scoringResult.scoringStatus,
    scoring_blockers: scoringResult.scoringBlockers,
    formula_version: BIOCHEMISTRY_FORMULA_VERSION,
    lookup_source_document: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
    lookup_source_version: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
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

      redirect(`/data-entry/biochemistry/${test.id}?warning=note-save-failed`);
    }
  }

  revalidatePath("/data-entry/biochemistry");
  revalidatePath(`/data-entry/biochemistry/${test.id}`);
  redirect(`/data-entry/biochemistry/${test.id}`);
}

export async function getBiochemistryResult(testId: string): Promise<BiochemistryResultState> {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      schemaReady: false,
      test: null,
      scoringResult: null,
      zones: null,
      recommendations: null,
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
      zones: null,
      recommendations: null,
      error: isSchemaUnavailable(error) ? "schema-unavailable" : "load-failed",
    };
  }

  if (!data) {
    return {
      envReady: true,
      schemaReady: true,
      test: null,
      scoringResult: null,
      zones: null,
      recommendations: null,
      error: "not-found",
    };
  }

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
  const scoringStatus = data.scoring_status === "scored" ? "scored" : "blocked";
  const scoringBlockers = Array.isArray(data.scoring_blockers)
    ? data.scoring_blockers.map((blocker: { lookupType?: unknown; exactReading?: unknown }) => ({
        lookupType: blocker.lookupType === "carbs"
          || blocker.lookupType === "ph_average"
          || blocker.lookupType === "salts"
          || blocker.lookupType === "urea"
          ? blocker.lookupType
          : "carbs",
        exactReading: typeof blocker.exactReading === "number" ? blocker.exactReading : Number(blocker.exactReading ?? 0),
        reason: "missing_exact_lookup" as const,
      }))
    : [];
  const scoringResult: BiochemistryScoringResult = scoringStatus === "scored"
    ? {
        formulaVersion: BIOCHEMISTRY_FORMULA_VERSION,
        lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
        lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
        rawReadings,
        derivedReadings,
        losses: {
          carbs: {
            lookupType: "carbs" as const,
            exactReading: rawReadings.carbsReading,
            exactReadingText: String(rawReadings.carbsReading),
            lossFraction: Number(data.carbs_loss_fraction),
            lossPercentText: `${Number(data.carbs_loss_fraction) * 100}%`,
            sourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
            sourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
          },
          phAverage: {
            lookupType: "ph_average" as const,
            exactReading: derivedReadings.phAverage,
            exactReadingText: String(derivedReadings.phAverage),
            lossFraction: Number(data.ph_average_loss_fraction),
            lossPercentText: `${Number(data.ph_average_loss_fraction) * 100}%`,
            sourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
            sourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
          },
          salts: {
            lookupType: "salts" as const,
            exactReading: derivedReadings.conductivityConvertedCValue,
            exactReadingText: String(derivedReadings.conductivityConvertedCValue),
            lossFraction: Number(data.salts_loss_fraction),
            lossPercentText: `${Number(data.salts_loss_fraction) * 100}%`,
            sourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
            sourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
          },
          urea: {
            lookupType: "urea" as const,
            exactReading: rawReadings.ureaReading,
            exactReadingText: String(rawReadings.ureaReading),
            lossFraction: Number(data.urea_loss_fraction),
            lossPercentText: `${Number(data.urea_loss_fraction) * 100}%`,
            sourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
            sourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
          },
        },
        hydrationScoreEnergyLoss: Number(data.hydration_score_energy_loss),
        hydrationScore: Number(data.hydration_score),
        healthScoreEnergyLoss: Number(data.health_score_energy_loss),
        healthScore: Number(data.health_score),
        scoringStatus: "scored" as const,
        scoringBlockers: [],
      }
    : {
        formulaVersion: BIOCHEMISTRY_FORMULA_VERSION,
        lookupSourceDocument: BIOCHEMISTRY_LOOKUP_SOURCE_DOCUMENT,
        lookupSourceVersion: BIOCHEMISTRY_LOOKUP_SOURCE_VERSION,
        rawReadings,
        derivedReadings,
        losses: {},
        scoringStatus: "blocked" as const,
        scoringBlockers,
      };
  const { zones, recommendations } = createZonesAndRecommendations(scoringResult);
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
    zones,
    recommendations,
  };
}
