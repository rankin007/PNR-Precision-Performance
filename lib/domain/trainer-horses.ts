import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { exampleHorseId } from "@/lib/domain/horses";

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

function getExampleHorseWorkspace(): HorseTrainerWorkspace {
  const exampleEntries: HorseBiochemistryEntry[] = [
    {
      id: "southern-trial-2026-04-18",
      sampledAt: "2026-04-18T06:40:00",
      sampleType: "urine_saliva",
      weightKg: 482.4,
      trainingSession: "Light canter over 1200m with controlled finish work",
      attitude: "Bright in the tie-up and focused walking to the track",
      jockeyComments: "Felt balanced early and wanted to lengthen late without pressure",
      healthScore: 8.4,
      hydrationLitres: 28.1,
      hydrationScore: 8.2,
      electrolyteScore: 7.8,
      recoveryScore: 8.1,
      carbsPercentage: 3.6,
      saltsMs: 11.2,
      saltsC: 16.02,
      urinePh: 7.18,
      salivaPh: 7.1,
      ureaLevel: 20.1,
      blueSquareScore: 7.9,
      notes: "Light canter over 1200m with controlled finish work. Horse bright and focused. Jockey said the horse travelled smoothly and lifted late.",
    },
    {
      id: "southern-trial-2026-04-19",
      sampledAt: "2026-04-19T06:35:00",
      sampleType: "urine_saliva",
      weightKg: 480.9,
      trainingSession: "Strong pace gallop over 1600m with final 400m extension",
      attitude: "Eager in the bridle and sharper through the middle section",
      jockeyComments: "Felt stronger underneath and came off the bit cleanly when asked",
      healthScore: 8.7,
      hydrationLitres: 27.4,
      hydrationScore: 8.3,
      electrolyteScore: 8.1,
      recoveryScore: 8.4,
      carbsPercentage: 3.9,
      saltsMs: 12.6,
      saltsC: 18.02,
      urinePh: 7.24,
      salivaPh: 7.22,
      ureaLevel: 20.0,
      blueSquareScore: 8.2,
      notes: "Strong gallop over 1600m. Horse sharper through the work and recovered quickly. Jockey liked the response off the turn.",
    },
    {
      id: "southern-trial-2026-04-20",
      sampledAt: "2026-04-20T06:45:00",
      sampleType: "urine_saliva",
      weightKg: 479.5,
      trainingSession: "Recovery trot and pace change set with short uphill effort",
      attitude: "Relaxed in the yard and settled quickly after the hill work",
      jockeyComments: "Very tractable today and came back under me straight away",
      healthScore: 8.6,
      hydrationLitres: 28.6,
      hydrationScore: 8.5,
      electrolyteScore: 8.0,
      recoveryScore: 8.7,
      carbsPercentage: 3.4,
      saltsMs: 10.9,
      saltsC: 15.59,
      urinePh: 7.12,
      salivaPh: 7.16,
      ureaLevel: 19.8,
      blueSquareScore: 8.0,
      notes: "Recovery-oriented session with a short uphill effort. Horse relaxed and settled quickly afterward. Jockey noted very clean recovery.",
    },
    {
      id: "southern-trial-2026-04-21",
      sampledAt: "2026-04-21T06:30:00",
      sampleType: "urine_saliva",
      weightKg: 481.1,
      trainingSession: "Race-pace hit-out over 1000m with even splits",
      attitude: "Confident, forward, and very engaged before the jump-off",
      jockeyComments: "Best feel of the week, held rhythm and finished through the line",
      healthScore: 9.0,
      hydrationLitres: 28.0,
      hydrationScore: 8.8,
      electrolyteScore: 8.4,
      recoveryScore: 8.9,
      carbsPercentage: 4.0,
      saltsMs: 13.1,
      saltsC: 18.73,
      urinePh: 7.29,
      salivaPh: 7.31,
      ureaLevel: 20.2,
      blueSquareScore: 8.6,
      notes: "Race-pace hit-out over 1000m. Horse was confident and forward. Jockey said it was the best feel of the week and the horse finished strongly.",
    },
  ];

  const exampleOperationalHistory: HorseOperationalHistoryItem[] = exampleEntries.map((entry) => ({
    id: `daily-${entry.id}`,
    source: "daily",
    dateLabel: formatDateLabel(entry.sampledAt),
    summary: `Weight ${entry.weightKg} kg. ${entry.trainingSession}. Attitude: ${entry.attitude}. Jockey: ${entry.jockeyComments}.`,
  }));

  return {
    horse: {
      id: exampleHorseId,
      name: "Southern Trial",
      status: "active",
      stableName: "Precision Performance Demo Stable",
      sex: "Gelding",
      breed: "Thoroughbred",
      colour: "Bay",
      dateOfBirth: "2021-09-12",
      microchipNumber: "PP-DEMO-4821",
      registrationNumber: "ST-2026-DEMO",
    },
    latestReferenceMetrics: [
      { label: "Latest weight", value: "481.1 kg" },
      { label: "Latest temperature", value: "37.7 C" },
      { label: "Latest water intake", value: "28.0 L" },
    ],
    galleryItems: [
      {
        id: "southern-trial-gallery-1",
        imageUrl: "/Thoroughbred-scaled.jpg",
        caption: "Southern Trial profile",
        takenAt: "2026-04-21T06:10:00",
      },
    ],
    biochemistryEntries: [...exampleEntries].reverse(),
    operationalHistory: exampleOperationalHistory.reverse(),
    chartSeries: buildChartSeries(exampleEntries.reverse()),
  };
}

export async function getTrainerHorseWorkspace(horseId: string): Promise<{
  envReady: boolean;
  workspace: HorseTrainerWorkspace | null;
  error?: string;
}> {
  if (horseId === exampleHorseId) {
    return {
      envReady: true,
      workspace: getExampleHorseWorkspace(),
    };
  }

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
      galleryItems:
        ((galleryItems as unknown as HorseGalleryItemRow[] | null) ?? []).map((item) => ({
          id: item.id,
          imageUrl: item.image_url,
          caption: item.caption ?? null,
          takenAt: item.taken_at ?? null,
        })) ?? [],
      biochemistryEntries: mappedBiochemistry,
      operationalHistory,
      chartSeries: buildChartSeries(mappedBiochemistry),
    },
  };
}
