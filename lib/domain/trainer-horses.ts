import { hasSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const HORSE_GALLERY_BUCKET = "horse-gallery";

export type HorseGalleryItem = {
  id: string;
  imageUrl: string;
  caption: string | null;
  takenAt: string | null;
};

type HorseGalleryItemRow = {
  id: string;
  image_url: string;
  caption: string | null;
  taken_at: string | null;
};

type HorseBiochemistryRow = {
  id: string;
  sampled_at: string;
  sample_type: string;
  weight_kg: string | number | null;
  training_session: string | null;
  horse_attitude: string | null;
  jockey_comments: string | null;
  health_score: string | number | null;
  hydration_litres: string | number | null;
  hydration_score: string | number | null;
  electrolyte_score: string | number | null;
  recovery_score: string | number | null;
  carbs_percentage: string | number | null;
  salts_ms: string | number | null;
  salts_c: string | number | null;
  urine_ph: string | number | null;
  saliva_ph: string | number | null;
  urea_level: string | number | null;
  blue_square_score: string | number | null;
  notes: string | null;
};

export type HorseBiochemistryEntry = {
  id: string;
  sampledAt: string;
  sampleType: string;
  weightKg: number | null;
  trainingSession: string | null;
  attitude: string | null;
  jockeyComments: string | null;
  healthScore: number | null;
  hydrationLitres: number | null;
  hydrationScore: number | null;
  electrolyteScore: number | null;
  recoveryScore: number | null;
  carbsPercentage: number | null;
  saltsMs: number | null;
  saltsC: number | null;
  urinePh: number | null;
  salivaPh: number | null;
  ureaLevel: number | null;
  blueSquareScore: number | null;
  notes: string | null;
};

export type HorseOperationalHistoryItem = {
  id: string;
  source: "daily" | "feeding" | "track";
  dateLabel: string;
  summary: string;
};

export type HorseEtrakkaSession = {
  id: string;
  sessionDate: string;
  sessionCategory: string | null;
  sessionType: string | null;
  sourceRowType: string | null;
  trackName: string | null;
  riderName: string | null;
  etrakkaDevice: string | null;
  sourceFileName: string | null;
  bt200: number | null;
  bt400: number | null;
  bt600: number | null;
  bt800: number | null;
  bt1000: number | null;
  s200: number | null;
  s400: number | null;
  s600: number | null;
  s800: number | null;
  s1000: number | null;
  hrMaxBpm: number | null;
  hr45: number | null;
  trotMeanHrBpm: number | null;
  canterMeanHrBpm: number | null;
  gallopMeanHrBpm: number | null;
  vmaxKph: number | null;
  v200: number | null;
  mj: number | null;
  sl50: number | null;
  gallopOver60kph: number | null;
  secsOver60kph: number | null;
  secsToHrDrop: number | null;
  gap48kSecs: number | null;
  recoveryAvgHr2_5minBpm: number | null;
  gallopMetres: number | null;
  note: string | null;
};

export type HorseTrainerWorkspace = {
  horse: {
    id: string;
    name: string;
    status: string | null;
    stableName: string | null;
    sex: string | null;
    breed: string | null;
    colour: string | null;
    dateOfBirth: string | null;
    microchipNumber: string | null;
    registrationNumber: string | null;
  };
  latestReferenceMetrics: Array<{
    label: string;
    value: string;
  }>;
  galleryItems: HorseGalleryItem[];
  biochemistryEntries: HorseBiochemistryEntry[];
  operationalHistory: HorseOperationalHistoryItem[];
  chartSeries: Array<{
    key: string;
    label: string;
    points: Array<{ label: string; value: number; note?: string }>;
  }>;
};

type LatestWeightRow = {
  weight_value: string | number | null;
  weight_unit: string | null;
  recorded_at: string | null;
};

type LatestTemperatureRow = {
  temperature_value: string | number | null;
  temperature_unit: string | null;
  recorded_at: string | null;
};

type LatestWaterRow = {
  volume_value: string | number | null;
  volume_unit: string | null;
  recorded_at: string | null;
};

type EtrakkaSessionRow = {
  id: string;
  session_date: string;
  session_category?: string | null;
  session_type?: string | null;
  source_row_type?: string | null;
  track_name?: string | null;
  rider?: string | null;
  blanket?: string | null;
  source_file_name?: string | null;
  bt200?: string | number | null;
  bt400?: string | number | null;
  bt600?: string | number | null;
  bt800?: string | number | null;
  bt1000?: string | number | null;
  s200?: string | number | null;
  s400?: string | number | null;
  s600?: string | number | null;
  s800?: string | number | null;
  s1000?: string | number | null;
  hr_max?: string | number | null;
  hr_45?: string | number | null;
  trot_mean_hr?: string | number | null;
  canter_mean_hr?: string | number | null;
  gallop_mean_hr?: string | number | null;
  vmax?: string | number | null;
  v200?: string | number | null;
  mj?: string | number | null;
  sl_50?: string | number | null;
  gallop_over_60kph?: string | number | null;
  secs_over_60kph?: string | number | null;
  secs_to_hr_drop?: string | number | null;
  gap_48k_secs?: string | number | null;
  avg_hr_2_5min?: string | number | null;
  gallop_metres?: string | number | null;
  note?: string | null;
};

function extractStableName(stables: unknown) {
  if (Array.isArray(stables)) {
    return stables[0]?.name ?? null;
  }

  if (stables && typeof stables === "object" && "name" in stables) {
    return (stables as { name?: string | null }).name ?? null;
  }

  return null;
}

function toNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatDateLabel(value: string | null | undefined) {
  if (!value) {
    return "Unspecified";
  }

  return value.slice(0, 10);
}

function buildChartSeries(entries: HorseBiochemistryEntry[]) {
  const latest = [...entries].slice(0, 8).reverse();
  const makeSeries = (key: keyof HorseBiochemistryEntry, label: string) => ({
    key: String(key),
    label,
    points: latest
      .map((entry) => {
        const value = entry[key];
        return typeof value === "number"
          ? {
              label: formatDateLabel(entry.sampledAt),
              value,
              note:
                `${formatDateLabel(entry.sampledAt)} / Weight ${entry.weightKg ?? "-"} kg / ${entry.trainingSession ?? "Session not set"} / Attitude: ${entry.attitude ?? "Not set"} / Jockey: ${entry.jockeyComments ?? "Not set"}`,
            }
          : null;
      })
      .filter(
        (point): point is NonNullable<typeof point> => Boolean(point),
      ),
  });

  return [
    makeSeries("healthScore", "Health score"),
    makeSeries("hydrationScore", "Hydration score"),
    makeSeries("recoveryScore", "Recovery score"),
    makeSeries("carbsPercentage", "Carbs %"),
    makeSeries("saltsC", "Salts C"),
    makeSeries("urinePh", "Urine pH"),
    makeSeries("salivaPh", "Saliva pH"),
    makeSeries("ureaLevel", "Urea"),
  ].filter((series) => series.points.length > 0);
}

function mapEtrakkaSessions(rows: EtrakkaSessionRow[] | null | undefined): HorseEtrakkaSession[] {
  return (rows ?? []).map((entry) => ({
    id: entry.id,
    sessionDate: entry.session_date,
    sessionCategory: entry.session_category ?? null,
    sessionType: entry.session_type ?? null,
    sourceRowType: entry.source_row_type ?? null,
    trackName: entry.track_name ?? null,
    riderName: entry.rider ?? null,
    etrakkaDevice: entry.blanket ?? null,
    sourceFileName: entry.source_file_name ?? null,
    bt200: toNumber(entry.bt200),
    bt400: toNumber(entry.bt400),
    bt600: toNumber(entry.bt600),
    bt800: toNumber(entry.bt800),
    bt1000: toNumber(entry.bt1000),
    s200: toNumber(entry.s200),
    s400: toNumber(entry.s400),
    s600: toNumber(entry.s600),
    s800: toNumber(entry.s800),
    s1000: toNumber(entry.s1000),
    hrMaxBpm: toNumber(entry.hr_max),
    hr45: toNumber(entry.hr_45),
    trotMeanHrBpm: toNumber(entry.trot_mean_hr),
    canterMeanHrBpm: toNumber(entry.canter_mean_hr),
    gallopMeanHrBpm: toNumber(entry.gallop_mean_hr),
    vmaxKph: toNumber(entry.vmax),
    v200: toNumber(entry.v200),
    mj: toNumber(entry.mj),
    sl50: toNumber(entry.sl_50),
    gallopOver60kph: toNumber(entry.gallop_over_60kph),
    secsOver60kph: toNumber(entry.secs_over_60kph),
    secsToHrDrop: toNumber(entry.secs_to_hr_drop),
    gap48kSecs: toNumber(entry.gap_48k_secs),
    recoveryAvgHr2_5minBpm: toNumber(entry.avg_hr_2_5min),
    gallopMetres: toNumber(entry.gallop_metres),
    note: entry.note ?? null,
  }));
}

function extractHorseGalleryStoragePath(imageUrl: string) {
  if (!imageUrl || !hasSupabaseEnv()) {
    return null;
  }

  try {
    const parsed = new URL(imageUrl);
    const publicPrefix = `/storage/v1/object/public/${HORSE_GALLERY_BUCKET}/`;
    const signedPrefix = `/storage/v1/object/sign/${HORSE_GALLERY_BUCKET}/`;

    if (parsed.origin !== supabaseEnv.url) {
      return null;
    }

    if (parsed.pathname.startsWith(publicPrefix)) {
      return decodeURIComponent(parsed.pathname.slice(publicPrefix.length));
    }

    if (parsed.pathname.startsWith(signedPrefix)) {
      return decodeURIComponent(parsed.pathname.slice(signedPrefix.length));
    }
  } catch {
    return null;
  }

  return null;
}

async function resolveGalleryItemUrls(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  items: HorseGalleryItemRow[],
) {
  return Promise.all(
    items.map(async (item) => {
      const storagePath = extractHorseGalleryStoragePath(item.image_url);

      if (!storagePath) {
        return {
          id: item.id,
          imageUrl: item.image_url,
          caption: item.caption ?? null,
          takenAt: item.taken_at ?? null,
        };
      }

      const { data, error } = await supabase.storage
        .from(HORSE_GALLERY_BUCKET)
        .createSignedUrl(storagePath, 60 * 60);

      return {
        id: item.id,
        imageUrl: error ? item.image_url : data.signedUrl,
        caption: item.caption ?? null,
        takenAt: item.taken_at ?? null,
      };
    }),
  );
}

export async function getTrainerHorseWorkspace(horseId: string): Promise<{
  envReady: boolean;
  workspace: HorseTrainerWorkspace | null;
  error?: string;
}> {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      workspace: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const [
    { data: horse, error: horseError },
    { data: galleryItems },
    { data: latestWeightLogs },
    { data: latestTemperatureLogs },
    { data: latestWaterLogs },
    { data: biochemistryEntries },
    { data: dailyRecords },
    { data: feedingLogs },
    { data: trackSessions },
  ] = await Promise.all([
    supabase
      .from("horses")
      .select("id, name, status, sex, breed, colour, date_of_birth, microchip_number, registration_number, stables(name)")
      .eq("id", horseId)
      .maybeSingle(),
    supabase
      .from("horse_gallery_items")
      .select("id, image_url, caption, taken_at")
      .eq("horse_id", horseId)
      .order("taken_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("weight_logs")
      .select("weight_value, weight_unit, recorded_at")
      .eq("horse_id", horseId)
      .order("recorded_at", { ascending: false })
      .limit(1),
    supabase
      .from("temperature_logs")
      .select("temperature_value, temperature_unit, recorded_at")
      .eq("horse_id", horseId)
      .order("recorded_at", { ascending: false })
      .limit(1),
    supabase
      .from("water_intake_logs")
      .select("volume_value, volume_unit, recorded_at")
      .eq("horse_id", horseId)
      .order("recorded_at", { ascending: false })
      .limit(1),
    supabase
      .from("horse_biochemistry_results")
      .select("*")
      .eq("horse_id", horseId)
      .order("sampled_at", { ascending: false })
      .limit(24),
    supabase
      .from("daily_records")
      .select("id, record_date, notes")
      .eq("horse_id", horseId)
      .order("record_date", { ascending: false })
      .limit(20),
    supabase
      .from("feeding_logs")
      .select("id, fed_at, notes")
      .eq("horse_id", horseId)
      .order("fed_at", { ascending: false })
      .limit(20),
    supabase
      .from("track_sessions")
      .select("id, session_date, session_type, distance_value, distance_unit, notes")
      .eq("horse_id", horseId)
      .order("session_date", { ascending: false })
      .limit(20),
  ]);

  if (horseError || !horse) {
    return {
      envReady: true,
      workspace: null,
      error: horseError?.message ?? "Horse not found.",
    };
  }

  const mappedBiochemistry: HorseBiochemistryEntry[] =
    (((biochemistryEntries as unknown as HorseBiochemistryRow[] | null) ?? []).map((entry) => ({
      id: entry.id,
      sampledAt: entry.sampled_at,
      sampleType: entry.sample_type,
      weightKg: toNumber(entry.weight_kg),
      trainingSession: entry.training_session ?? null,
      attitude: entry.horse_attitude ?? null,
      jockeyComments: entry.jockey_comments ?? null,
      healthScore: toNumber(entry.health_score),
      hydrationLitres: toNumber(entry.hydration_litres),
      hydrationScore: toNumber(entry.hydration_score),
      electrolyteScore: toNumber(entry.electrolyte_score),
      recoveryScore: toNumber(entry.recovery_score),
      carbsPercentage: toNumber(entry.carbs_percentage),
      saltsMs: toNumber(entry.salts_ms),
      saltsC: toNumber(entry.salts_c),
      urinePh: toNumber(entry.urine_ph),
      salivaPh: toNumber(entry.saliva_ph),
      ureaLevel: toNumber(entry.urea_level),
      blueSquareScore: toNumber(entry.blue_square_score),
      notes: entry.notes ?? null,
    })) ?? []);

  const latestWeight = ((latestWeightLogs as unknown as LatestWeightRow[] | null) ?? [])[0] ?? null;
  const latestTemperature =
    ((latestTemperatureLogs as unknown as LatestTemperatureRow[] | null) ?? [])[0] ?? null;
  const latestWater = ((latestWaterLogs as unknown as LatestWaterRow[] | null) ?? [])[0] ?? null;

  const operationalHistory: HorseOperationalHistoryItem[] = [
    ...((dailyRecords ?? []).map((record) => ({
      id: `daily-${record.id}`,
      source: "daily" as const,
      dateLabel: formatDateLabel(record.record_date),
      summary: record.notes ?? "Daily record captured.",
    })) ?? []),
    ...((feedingLogs ?? []).map((record) => ({
      id: `feeding-${record.id}`,
      source: "feeding" as const,
      dateLabel: formatDateLabel(record.fed_at),
      summary: record.notes ?? "Feeding log captured.",
    })) ?? []),
    ...((trackSessions ?? []).map((record) => ({
      id: `track-${record.id}`,
      source: "track" as const,
      dateLabel: formatDateLabel(record.session_date),
      summary:
        record.notes ??
        `${record.session_type ?? "Track session"} ${record.distance_value ?? ""} ${record.distance_unit ?? ""}`.trim(),
    })) ?? []),
  ].sort((a, b) => b.dateLabel.localeCompare(a.dateLabel));

  const resolvedGalleryItems = await resolveGalleryItemUrls(
    supabase,
    (galleryItems as unknown as HorseGalleryItemRow[] | null) ?? [],
  );

  return {
    envReady: true,
    workspace: {
      horse: {
        id: horse.id,
        name: horse.name,
        status: horse.status ?? null,
        stableName: extractStableName(horse.stables),
        sex: horse.sex ?? null,
        breed: horse.breed ?? null,
        colour: horse.colour ?? null,
        dateOfBirth: horse.date_of_birth ?? null,
        microchipNumber: horse.microchip_number ?? null,
        registrationNumber: horse.registration_number ?? null,
      },
      latestReferenceMetrics: [
        latestWeight
          ? {
              label: "Latest weight",
              value: `${latestWeight.weight_value} ${latestWeight.weight_unit ?? "kg"}`,
            }
          : null,
        latestTemperature
          ? {
              label: "Latest temperature",
              value: `${latestTemperature.temperature_value} ${latestTemperature.temperature_unit ?? "C"}`,
            }
          : null,
        latestWater
          ? {
              label: "Latest water intake",
              value: `${latestWater.volume_value} ${latestWater.volume_unit ?? "L"}`,
            }
          : null,
      ].filter((item): item is { label: string; value: string } => Boolean(item)),
      galleryItems: resolvedGalleryItems,
      biochemistryEntries: mappedBiochemistry,
      operationalHistory,
      chartSeries: buildChartSeries(mappedBiochemistry),
    },
  };
}

export async function getTrainerHorseEtrakkaSessions(horseId: string): Promise<{
  envReady: boolean;
  horse: { id: string; name: string } | null;
  sessions: HorseEtrakkaSession[];
  error?: string;
}> {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      horse: null,
      sessions: [],
    };
  }

  const supabase = await createSupabaseServerClient();
  const [{ data: horse, error: horseError }, { data: sessions, error: sessionError }] = await Promise.all([
    supabase.from("horses").select("id, name").eq("id", horseId).maybeSingle(),
    supabase
      .from("etrakka_sessions")
      .select("*")
      .eq("horse_id", horseId)
      .order("session_date", { ascending: false })
      .limit(100),
  ]);

  if (horseError || !horse) {
    return {
      envReady: true,
      horse: null,
      sessions: [],
      error: horseError?.message ?? "Horse not found.",
    };
  }

  return {
    envReady: true,
    horse: {
      id: horse.id,
      name: horse.name,
    },
    sessions: sessionError ? [] : mapEtrakkaSessions((sessions as EtrakkaSessionRow[] | null) ?? []),
    error: sessionError?.message,
  };
}
