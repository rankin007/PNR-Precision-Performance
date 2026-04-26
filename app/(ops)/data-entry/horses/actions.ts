"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { requireSignedInAppContext } from "@/lib/auth/session";

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

function revalidateHorsePaths(horseId: string) {
  revalidatePath("/data-entry");
  revalidatePath("/data-entry/horses");
  revalidatePath(`/data-entry/horses/${horseId}`);
  revalidatePath(`/data-entry/horses/${horseId}/history`);
  revalidatePath(`/portal/horses/${horseId}`);
  revalidatePath("/portal/horses");
  revalidatePath("/portal/reports");
}

export async function updateHorseProfileAction(formData: FormData) {
  await requireSignedInAppContext("/data-entry/horses");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/horses?error=supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const name = readString(formData, "name");
  const status = readString(formData, "status");
  const sex = readString(formData, "sex");
  const breed = readString(formData, "breed");
  const colour = readString(formData, "colour");
  const dateOfBirth = readString(formData, "dateOfBirth");
  const microchipNumber = readString(formData, "microchipNumber");
  const registrationNumber = readString(formData, "registrationNumber");

  if (!horseId || !name) {
    redirect(`/data-entry/horses/${horseId || ""}?error=missing-profile-fields`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("horses")
    .update({
      name,
      status: status || null,
      sex: sex || null,
      breed: breed || null,
      colour: colour || null,
      date_of_birth: dateOfBirth || null,
      microchip_number: microchipNumber || null,
      registration_number: registrationNumber || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", horseId);

  if (error) {
    redirect(`/data-entry/horses/${horseId}?error=profile-save-failed`);
  }

  revalidateHorsePaths(horseId);
  redirect(`/data-entry/horses/${horseId}?saved=profile`);
}

export async function addHorseGalleryItemAction(formData: FormData) {
  const context = await requireSignedInAppContext("/data-entry/horses");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/horses?error=supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const imageUrl = readString(formData, "imageUrl");
  const caption = readString(formData, "caption");
  const takenAt = readString(formData, "takenAt");

  if (!horseId || !imageUrl || !context.appUserId) {
    redirect(`/data-entry/horses/${horseId || ""}?error=missing-gallery-fields`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("horse_gallery_items").insert({
    horse_id: horseId,
    image_url: imageUrl,
    caption: caption || null,
    taken_at: takenAt || null,
    created_by_user_id: context.appUserId,
  });

  if (error) {
    redirect(`/data-entry/horses/${horseId}?error=gallery-save-failed`);
  }

  revalidateHorsePaths(horseId);
  redirect(`/data-entry/horses/${horseId}?saved=gallery`);
}

export async function addHorseBiochemistryResultAction(formData: FormData) {
  const context = await requireSignedInAppContext("/data-entry/horses");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/horses?error=supabase-not-configured");
  }

  const horseId = readString(formData, "horseId");
  const sampledAt = readString(formData, "sampledAt");
  const sampleType = readString(formData, "sampleType");
  const trainingSession = readString(formData, "trainingSession");
  const horseAttitude = readString(formData, "horseAttitude");
  const jockeyComments = readString(formData, "jockeyComments");
  const notes = readString(formData, "notes");

  if (!horseId || !context.appUserId) {
    redirect(`/data-entry/horses/${horseId || ""}?error=missing-biochemistry-fields`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("horse_biochemistry_results").insert({
    horse_id: horseId,
    sampled_at: sampledAt || new Date().toISOString(),
    sample_type: sampleType || "urine_saliva",
    weight_kg: readOptionalNumber(formData, "weightKg"),
    training_session: trainingSession || null,
    horse_attitude: horseAttitude || null,
    jockey_comments: jockeyComments || null,
    health_score: readOptionalNumber(formData, "healthScore"),
    hydration_litres: readOptionalNumber(formData, "hydrationLitres"),
    hydration_score: readOptionalNumber(formData, "hydrationScore"),
    electrolyte_score: readOptionalNumber(formData, "electrolyteScore"),
    recovery_score: readOptionalNumber(formData, "recoveryScore"),
    carbs_percentage: readOptionalNumber(formData, "carbsPercentage"),
    salts_ms: readOptionalNumber(formData, "saltsMs"),
    urine_ph: readOptionalNumber(formData, "urinePh"),
    saliva_ph: readOptionalNumber(formData, "salivaPh"),
    urea_level: readOptionalNumber(formData, "ureaLevel"),
    blue_square_score: readOptionalNumber(formData, "blueSquareScore"),
    notes: notes || null,
    created_by_user_id: context.appUserId,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    redirect(`/data-entry/horses/${horseId}?error=biochemistry-save-failed`);
  }

  revalidateHorsePaths(horseId);
  redirect(`/data-entry/horses/${horseId}?saved=biochemistry`);
}
