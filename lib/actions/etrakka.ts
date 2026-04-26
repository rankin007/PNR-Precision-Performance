"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EtrakkaImportPayload = {
  horseName: string;
  sessionDateIso: string; 
  riderName: string;
  track: string;
  etrakkaDevice: string;
  sessionType: string;
  temperatureC: number | null;
  humidityPercentage: number | null;
  work1_200mTime: number | null;
  work1_400mTime: number | null;
  work2_200mTime: number | null;
  work2_400mTime: number | null;
  hrMaxBpm: number | null;
  trotMeanHrBpm: number | null;
  canterMeanHrBpm: number | null;
  vmaxKph: number | null;
  gallopMetres: number | null;
  recoveryAvgHr2_5minBpm: number | null;
};

export async function importEtrakkaSession(payload: EtrakkaImportPayload) {
  try {
    const supabase = await createSupabaseServerClient();

    // 1. Resolve Horse ID from the exact Name
    const { data: horse, error: horseError } = await supabase
      .from("horses")
      .select("id")
      .ilike("name", payload.horseName)
      .maybeSingle();

    if (horseError || !horse) {
      return { success: false, error: `Could not find horse with name: ${payload.horseName}` };
    }

    // 2. Insert the parsed payload into our new etrakka_sessions table
    const { error: insertError } = await supabase
      .from("etrakka_sessions")
      .insert({
        horse_id: horse.id,
        session_date: payload.sessionDateIso,
        rider_name: payload.riderName || null,
        track: payload.track || null,
        etrakka_device: payload.etrakkaDevice || null,
        session_type: payload.sessionType || null,
        temperature_c: payload.temperatureC,
        humidity_percentage: payload.humidityPercentage,
        work_1_200m_time: payload.work1_200mTime,
        work_1_400m_time: payload.work1_400mTime,
        work_2_200m_time: payload.work2_200mTime,
        work_2_400m_time: payload.work2_400mTime,
        hr_max_bpm: payload.hrMaxBpm,
        trot_mean_hr_bpm: payload.trotMeanHrBpm,
        canter_mean_hr_bpm: payload.canterMeanHrBpm,
        vmax_kph: payload.vmaxKph,
        gallop_metres: payload.gallopMetres,
        recovery_avg_hr_2_5min_bpm: payload.recoveryAvgHr2_5minBpm,
      });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      
      // Handle the Unique Constraint violation cleanly
      if (insertError.code === "23505") {
         return { success: false, error: "This eTrakka session has already been imported for this horse on this date." };
      }
      
      return { success: false, error: "Failed to save E-Trakka session to database." };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
