"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { requireOperationalWriteAppContext } from "@/lib/auth/session";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalNumber(formData: FormData, key: string) {
  const value = readString(formData, key);
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function revalidateSubmissionPaths(submissionId: string) {
  revalidatePath("/data-entry");
  revalidatePath("/data-entry/submissions");
  revalidatePath(`/data-entry/submissions/${submissionId}`);
}

async function findWritableHorse(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, horseId: string) {
  if (!horseId) {
    return null;
  }

  const { data, error } = await supabase
    .from("horses")
    .select("id")
    .eq("id", horseId)
    .maybeSingle();

  if (error || !data?.id) {
    return null;
  }

  return data;
}

async function findDailyRecordHorseId(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  recordId: string,
) {
  const { data, error } = await supabase
    .from("daily_records")
    .select("horse_id")
    .eq("id", recordId)
    .maybeSingle();

  if (error || !data?.horse_id) {
    return null;
  }

  return data.horse_id as string;
}

async function findSubmissionHorseId(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  table: "feeding_logs" | "track_sessions",
  recordId: string,
) {
  const { data, error } = await supabase
    .from(table)
    .select("horse_id")
    .eq("id", recordId)
    .maybeSingle();

  if (error || !data?.horse_id) {
    return null;
  }

  return data.horse_id as string;
}

export async function submitDailyRecordAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry?error=supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const recordDate = readString(formData, "recordDate");
  const notes = readString(formData, "notes");
  const temperatureValue = readOptionalNumber(formData, "temperatureValue");
  const weightValue = readOptionalNumber(formData, "weightValue");
  const waterValue = readOptionalNumber(formData, "waterValue");

  if (!horseId || !recordDate || !context.appUserId) {
    redirect("/data-entry?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();

  if (!(await findWritableHorse(supabase, horseId))) {
    redirect("/data-entry?error=horse-not-accessible");
  }

  const { data: dailyRecord, error: dailyRecordError } = await supabase
    .from("daily_records")
    .upsert(
      {
        horse_id: horseId,
        record_date: recordDate,
        recorded_by_user_id: context.appUserId,
        notes: notes || null,
      },
      {
        onConflict: "horse_id,record_date",
      },
    )
    .select("id, horse_id")
    .single();

  if (dailyRecordError || !dailyRecord) {
    redirect("/data-entry?error=record-create-failed");
  }

  if (temperatureValue !== null) {
    const { error } = await supabase.from("temperature_logs").insert({
      daily_record_id: dailyRecord.id,
      horse_id: horseId,
      temperature_value: temperatureValue,
      temperature_unit: "C",
      created_by_user_id: context.appUserId,
    });

    if (error) {
      redirect("/data-entry?error=metric-create-failed");
    }
  }

  if (weightValue !== null) {
    const { error } = await supabase.from("weight_logs").insert({
      daily_record_id: dailyRecord.id,
      horse_id: horseId,
      weight_value: weightValue,
      weight_unit: "kg",
      created_by_user_id: context.appUserId,
    });

    if (error) {
      redirect("/data-entry?error=metric-create-failed");
    }
  }

  if (waterValue !== null) {
    const { error } = await supabase.from("water_intake_logs").insert({
      daily_record_id: dailyRecord.id,
      horse_id: horseId,
      volume_value: waterValue,
      volume_unit: "L",
      created_by_user_id: context.appUserId,
    });

    if (error) {
      redirect("/data-entry?error=metric-create-failed");
    }
  }

  revalidatePath("/data-entry");
  redirect("/data-entry?submitted=true");
}

export async function submitFeedingLogAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/feeding");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/feeding?error=supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const foodMenuId = readString(formData, "foodMenuId");
  const notes = readString(formData, "notes");

  if (!horseId || !context.appUserId) {
    redirect("/data-entry/feeding?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();

  if (!(await findWritableHorse(supabase, horseId))) {
    redirect("/data-entry/feeding?error=horse-not-accessible");
  }

  const { error } = await supabase.from("feeding_logs").insert({
    horse_id: horseId,
    food_menu_id: foodMenuId || null,
    notes: notes || null,
    created_by_user_id: context.appUserId,
  });

  if (error) {
    redirect("/data-entry/feeding?error=submit-failed");
  }

  revalidatePath("/data-entry/feeding");
  redirect("/data-entry/feeding?submitted=true");
}

export async function submitTrackSessionAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/track");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/track?error=supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const sessionDate = readString(formData, "sessionDate");
  const distanceValue = readOptionalNumber(formData, "distanceValue");
  const durationSeconds = readOptionalNumber(formData, "durationSeconds");
  const sessionType = readString(formData, "sessionType");
  const surface = readString(formData, "surface");
  const notes = readString(formData, "notes");

  if (!horseId || !sessionDate || !context.appUserId) {
    redirect("/data-entry/track?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();

  if (!(await findWritableHorse(supabase, horseId))) {
    redirect("/data-entry/track?error=horse-not-accessible");
  }

  const { error } = await supabase.from("track_sessions").insert({
    horse_id: horseId,
    session_date: sessionDate,
    distance_value: distanceValue,
    distance_unit: "m",
    duration_seconds: durationSeconds,
    session_type: sessionType || null,
    surface: surface || null,
    notes: notes || null,
    created_by_user_id: context.appUserId,
  });

  if (error) {
    redirect("/data-entry/track?error=submit-failed");
  }

  revalidatePath("/data-entry/track");
  redirect("/data-entry/track?submitted=true");
}

export async function updateDailyRecordSubmissionAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/submissions");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/submissions?error=supabase-not-configured");
  }

  const submissionId = readString(formData, "submissionId");
  const entityId = readString(formData, "entityId");
  const horseId = readString(formData, "horseId");
  const notes = readString(formData, "notes");
  const temperatureValue = readOptionalNumber(formData, "temperatureValue");
  const weightValue = readOptionalNumber(formData, "weightValue");
  const waterValue = readOptionalNumber(formData, "waterValue");

  if (!submissionId || !entityId || !horseId || !context.appUserId) {
    redirect("/data-entry/submissions?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();
  const recordHorseId = await findDailyRecordHorseId(supabase, entityId);

  if (!recordHorseId || recordHorseId !== horseId) {
    redirect(`/data-entry/submissions/${submissionId}?error=horse-not-accessible`);
  }

  const { error: recordError } = await supabase
    .from("daily_records")
    .update({
      notes: notes || null,
      recorded_by_user_id: context.appUserId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", entityId);

  if (recordError) {
    redirect(`/data-entry/submissions/${submissionId}?error=update-failed`);
  }

  if (temperatureValue !== null) {
    const { data: latestTemperature } = await supabase
      .from("temperature_logs")
      .select("id")
      .eq("daily_record_id", entityId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = latestTemperature?.id
      ? await supabase
          .from("temperature_logs")
          .update({ temperature_value: temperatureValue, notes: notes || null })
          .eq("id", latestTemperature.id)
      : await supabase.from("temperature_logs").insert({
          daily_record_id: entityId,
          horse_id: horseId,
          temperature_value: temperatureValue,
          temperature_unit: "C",
          notes: notes || null,
          created_by_user_id: context.appUserId,
        });

    if (error) {
      redirect(`/data-entry/submissions/${submissionId}?error=update-failed`);
    }
  }

  if (weightValue !== null) {
    const { data: latestWeight } = await supabase
      .from("weight_logs")
      .select("id")
      .eq("daily_record_id", entityId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = latestWeight?.id
      ? await supabase
          .from("weight_logs")
          .update({ weight_value: weightValue, notes: notes || null })
          .eq("id", latestWeight.id)
      : await supabase.from("weight_logs").insert({
          daily_record_id: entityId,
          horse_id: horseId,
          weight_value: weightValue,
          weight_unit: "kg",
          notes: notes || null,
          created_by_user_id: context.appUserId,
        });

    if (error) {
      redirect(`/data-entry/submissions/${submissionId}?error=update-failed`);
    }
  }

  if (waterValue !== null) {
    const { data: latestWater } = await supabase
      .from("water_intake_logs")
      .select("id")
      .eq("daily_record_id", entityId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = latestWater?.id
      ? await supabase
          .from("water_intake_logs")
          .update({ volume_value: waterValue, notes: notes || null })
          .eq("id", latestWater.id)
      : await supabase.from("water_intake_logs").insert({
          daily_record_id: entityId,
          horse_id: horseId,
          volume_value: waterValue,
          volume_unit: "L",
          notes: notes || null,
          created_by_user_id: context.appUserId,
        });

    if (error) {
      redirect(`/data-entry/submissions/${submissionId}?error=update-failed`);
    }
  }

  revalidateSubmissionPaths(submissionId);
  redirect(`/data-entry/submissions/${submissionId}?saved=true`);
}

export async function updateFeedingLogSubmissionAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/submissions");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/submissions?error=supabase-not-configured");
  }

  const submissionId = readString(formData, "submissionId");
  const entityId = readString(formData, "entityId");
  const notes = readString(formData, "notes");

  if (!submissionId || !entityId) {
    redirect("/data-entry/submissions?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();
  const horseId = await findSubmissionHorseId(supabase, "feeding_logs", entityId);

  if (!horseId || !context.appUserId) {
    redirect(`/data-entry/submissions/${submissionId}?error=horse-not-accessible`);
  }

  const { error } = await supabase.from("feeding_logs").update({ notes: notes || null }).eq("id", entityId);

  if (error) {
    redirect(`/data-entry/submissions/${submissionId}?error=update-failed`);
  }

  revalidateSubmissionPaths(submissionId);
  redirect(`/data-entry/submissions/${submissionId}?saved=true`);
}

export async function updateTrackSessionSubmissionAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/submissions");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/submissions?error=supabase-not-configured");
  }

  const submissionId = readString(formData, "submissionId");
  const entityId = readString(formData, "entityId");
  const notes = readString(formData, "notes");
  const sessionType = readString(formData, "sessionType");
  const surface = readString(formData, "surface");
  const distanceValue = readOptionalNumber(formData, "distanceValue");
  const durationSeconds = readOptionalNumber(formData, "durationSeconds");

  if (!submissionId || !entityId) {
    redirect("/data-entry/submissions?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();
  const horseId = await findSubmissionHorseId(supabase, "track_sessions", entityId);

  if (!horseId || !context.appUserId) {
    redirect(`/data-entry/submissions/${submissionId}?error=horse-not-accessible`);
  }

  const { error } = await supabase
    .from("track_sessions")
    .update({
      notes: notes || null,
      session_type: sessionType || null,
      surface: surface || null,
      distance_value: distanceValue,
      distance_unit: distanceValue !== null ? "m" : null,
      duration_seconds: durationSeconds,
      updated_at: new Date().toISOString(),
    })
    .eq("id", entityId);

  if (error) {
    redirect(`/data-entry/submissions/${submissionId}?error=update-failed`);
  }

  revalidateSubmissionPaths(submissionId);
  redirect(`/data-entry/submissions/${submissionId}?saved=true`);
}
