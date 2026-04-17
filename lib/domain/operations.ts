import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SubmissionSummary = {
  id: string;
  type: string;
  horseName: string;
  detail: string;
};

export type SubmissionDetail = SubmissionSummary & {
  submissionType: "daily" | "feeding" | "track";
  entityId: string;
  horseId?: string;
  submittedAtLabel: string;
  notes: string;
  recordDate?: string;
  temperatureValue?: number | null;
  weightValue?: number | null;
  waterValue?: number | null;
  foodMenuName?: string | null;
  sessionDate?: string;
  sessionType?: string | null;
  surface?: string | null;
  distanceValue?: number | null;
  durationSeconds?: number | null;
};

const fallbackSubmissions: SubmissionSummary[] = [
  {
    id: "daily-1",
    type: "Daily Record",
    horseName: "Northern Comet",
    detail: "Temperature, weight, and water intake submitted for 2026-04-14.",
  },
  {
    id: "feed-1",
    type: "Feeding Log",
    horseName: "Velvet Charge",
    detail: "Recovery Feed Mix logged with notes.",
  },
  {
    id: "track-1",
    type: "Track Session",
    horseName: "Northern Comet",
    detail: "1200 m gallop entered with duration and surface notes.",
  },
];

const fallbackSubmissionDetails: SubmissionDetail[] = [
  {
    id: "daily-1",
    entityId: "1",
    submissionType: "daily",
    type: "Daily Record",
    horseName: "Northern Comet",
    detail: "Temperature, weight, and water intake submitted for 2026-04-14.",
    submittedAtLabel: "2026-04-14",
    notes: "Horse travelled well and cooled down cleanly after morning work.",
    recordDate: "2026-04-14",
    temperatureValue: 38.1,
    weightValue: 488.4,
    waterValue: 26.5,
  },
  {
    id: "feeding-1",
    entityId: "1",
    submissionType: "feeding",
    type: "Feeding Log",
    horseName: "Velvet Charge",
    detail: "Recovery Feed Mix logged with notes.",
    submittedAtLabel: "2026-04-14 16:20",
    notes: "Full ration completed. Slightly slower finish than usual.",
    foodMenuName: "Recovery Feed Mix",
  },
  {
    id: "track-1",
    entityId: "1",
    submissionType: "track",
    type: "Track Session",
    horseName: "Northern Comet",
    detail: "1200 m gallop entered with duration and surface notes.",
    submittedAtLabel: "2026-04-14",
    notes: "Strong last 400 m. Recovered quickly post session.",
    sessionDate: "2026-04-14",
    sessionType: "Gallop",
    surface: "Sand",
    distanceValue: 1200,
    durationSeconds: 82,
  },
];

function formatSubmissionDate(value: string | null | undefined) {
  return value ?? "Unspecified";
}

function toNumberOrNull(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

type HorseRelation = {
  horses?: { name?: string | null } | Array<{ name?: string | null }> | null;
};

type FoodMenuRelation = {
  food_menus?: { name?: string | null } | Array<{ name?: string | null }> | null;
};

type DailySubmissionRow = HorseRelation & {
  id: string;
  record_date: string;
  notes: string | null;
};

type FeedingSubmissionRow = HorseRelation & {
  id: string;
  notes: string | null;
};

type TrackSubmissionRow = HorseRelation & {
  id: string;
  session_date: string;
  session_type: string | null;
  distance_value: number | null;
  distance_unit: string | null;
};

function relationName(relation: { name?: string | null } | Array<{ name?: string | null }> | null | undefined) {
  if (Array.isArray(relation)) {
    return relation[0]?.name ?? null;
  }

  return relation?.name ?? null;
}

function horseNameFromRelation(row: HorseRelation | null | undefined) {
  return relationName(row?.horses) ?? "Unknown horse";
}

function foodMenuNameFromRelation(row: FoodMenuRelation | null | undefined) {
  return relationName(row?.food_menus);
}

export async function getRecentOperationSubmissions() {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      submissions: fallbackSubmissions,
    };
  }

  const supabase = await createSupabaseServerClient();

  const [{ data: dailyRecords }, { data: feedingLogs }, { data: trackSessions }] = await Promise.all([
    supabase
      .from("daily_records")
      .select("id, record_date, notes, horses(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("feeding_logs")
      .select("id, notes, horses(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("track_sessions")
      .select("id, session_date, session_type, distance_value, distance_unit, horses(name)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const submissions: SubmissionSummary[] = [
    ...(((dailyRecords ?? []) as DailySubmissionRow[]).map((record) => ({
      id: `daily-${record.id}`,
      type: "Daily Record",
      horseName: horseNameFromRelation(record),
      detail: record.notes || `Daily record logged for ${record.record_date}.`,
    })) as SubmissionSummary[]),
    ...(((feedingLogs ?? []) as FeedingSubmissionRow[]).map((record) => ({
      id: `feeding-${record.id}`,
      type: "Feeding Log",
      horseName: horseNameFromRelation(record),
      detail: record.notes || "Feeding event logged.",
    })) as SubmissionSummary[]),
    ...(((trackSessions ?? []) as TrackSubmissionRow[]).map((record) => ({
      id: `track-${record.id}`,
      type: "Track Session",
      horseName: horseNameFromRelation(record),
      detail:
        record.session_type || record.distance_value
          ? `${record.session_type ?? "Session"} ${record.distance_value ?? ""} ${record.distance_unit ?? ""}`.trim()
          : `Track session logged for ${record.session_date}.`,
    })) as SubmissionSummary[]),
  ].slice(0, 8);

  return {
    envReady: true,
    submissions,
  };
}

export async function getSubmissionDetail(submissionId: string) {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      submission: fallbackSubmissionDetails.find((item) => item.id === submissionId) ?? null,
    };
  }

  const [submissionType, entityId] = submissionId.split("-", 2);

  if (!submissionType || !entityId) {
    return {
      envReady: true,
      submission: null,
    };
  }

  const supabase = await createSupabaseServerClient();

  if (submissionType === "daily") {
    const { data: record } = await supabase
      .from("daily_records")
      .select(
        "id, horse_id, record_date, notes, created_at, horses(name), temperature_logs(temperature_value), weight_logs(weight_value), water_intake_logs(volume_value)",
      )
      .eq("id", entityId)
      .maybeSingle();

    if (!record) {
      return { envReady: true, submission: null };
    }

    const temperatureValue = toNumberOrNull(record.temperature_logs?.[0]?.temperature_value);
    const weightValue = toNumberOrNull(record.weight_logs?.[0]?.weight_value);
    const waterValue = toNumberOrNull(record.water_intake_logs?.[0]?.volume_value);

    return {
      envReady: true,
      submission: {
        id: submissionId,
        entityId,
        horseId: record.id ? record.horse_id ?? undefined : undefined,
        submissionType: "daily",
        type: "Daily Record",
        horseName: horseNameFromRelation(record),
        detail: record.notes || `Daily record logged for ${record.record_date}.`,
        submittedAtLabel: formatSubmissionDate(record.created_at ?? record.record_date),
        notes: record.notes ?? "",
        recordDate: record.record_date,
        temperatureValue,
        weightValue,
        waterValue,
      } satisfies SubmissionDetail,
    };
  }

  if (submissionType === "feeding") {
    const { data: record } = await supabase
      .from("feeding_logs")
      .select("id, horse_id, notes, fed_at, horses(name), food_menus(name)")
      .eq("id", entityId)
      .maybeSingle();

    if (!record) {
      return { envReady: true, submission: null };
    }

    return {
      envReady: true,
      submission: {
        id: submissionId,
        entityId,
        horseId: record.horse_id ?? undefined,
        submissionType: "feeding",
        type: "Feeding Log",
        horseName: horseNameFromRelation(record),
        detail: record.notes || "Feeding event logged.",
        submittedAtLabel: formatSubmissionDate(record.fed_at),
        notes: record.notes ?? "",
        foodMenuName: foodMenuNameFromRelation(record),
      } satisfies SubmissionDetail,
    };
  }

  if (submissionType === "track") {
    const { data: record } = await supabase
      .from("track_sessions")
      .select(
        "id, horse_id, session_date, session_type, surface, notes, created_at, distance_value, duration_seconds, horses(name)",
      )
      .eq("id", entityId)
      .maybeSingle();

    if (!record) {
      return { envReady: true, submission: null };
    }

    return {
      envReady: true,
      submission: {
        id: submissionId,
        entityId,
        horseId: record.horse_id ?? undefined,
        submissionType: "track",
        type: "Track Session",
        horseName: horseNameFromRelation(record),
        detail:
          record.session_type || record.distance_value
            ? `${record.session_type ?? "Session"} ${record.distance_value ?? ""} m`.trim()
            : `Track session logged for ${record.session_date}.`,
        submittedAtLabel: formatSubmissionDate(record.created_at ?? record.session_date),
        notes: record.notes ?? "",
        sessionDate: record.session_date,
        sessionType: record.session_type ?? null,
        surface: record.surface ?? null,
        distanceValue: toNumberOrNull(record.distance_value),
        durationSeconds:
          typeof record.duration_seconds === "number" ? record.duration_seconds : null,
      } satisfies SubmissionDetail,
    };
  }

  return {
    envReady: true,
    submission: null,
  };
}
