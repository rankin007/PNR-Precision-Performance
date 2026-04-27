"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EtrakkaImportPayload = {
  horseId: string;
  sessionDateIso: string; 
  riderName: string;
  trackName: string;
  etrakkaDevice: string;
  sessionType: string;
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
  sl50: number | null;
  gallopOver60kph: number | null;
  secsOver60kph: number | null;
  recoveryAvgHr2_5minBpm: number | null;
  gallopMetres: number | null;
  note: string | null;
};

export async function importEtrakkaSession(payload: EtrakkaImportPayload) {
  try {
    const supabase = await createSupabaseServerClient();

    const { error: insertError } = await supabase
      .from("etrakka_sessions")
      .insert({
        horse_id: payload.horseId,
        session_date: payload.sessionDateIso,
        rider: payload.riderName || null,
        track_name: payload.trackName || null,
        blanket: payload.etrakkaDevice || null,
        session_type: payload.sessionType || null,
        bt200: payload.bt200,
        bt400: payload.bt400,
        bt600: payload.bt600,
        bt800: payload.bt800,
        bt1000: payload.bt1000,
        s200: payload.s200,
        s400: payload.s400,
        s600: payload.s600,
        s800: payload.s800,
        s1000: payload.s1000,
        hr_max: payload.hrMaxBpm,
        hr_45: payload.hr45,
        trot_mean_hr: payload.trotMeanHrBpm,
        canter_mean_hr: payload.canterMeanHrBpm,
        gallop_mean_hr: payload.gallopMeanHrBpm,
        vmax: payload.vmaxKph,
        v200: payload.v200,
        sl_50: payload.sl50,
        gallop_over_60kph: payload.gallopOver60kph,
        secs_over_60kph: payload.secsOver60kph,
        avg_hr_2_5min: payload.recoveryAvgHr2_5minBpm,
        gallop_metres: payload.gallopMetres,
        note: payload.note || null,
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
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
    return { success: false, error: errorMsg };
  }
}
