"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { requireSignedInAppContext } from "@/lib/auth/session";

const HORSE_GALLERY_BUCKET = "horse-gallery";

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

function readGalleryImageFile(formData: FormData) {
  const file = formData.get("imageFile");
  return file instanceof File && file.size > 0 ? file : null;
}

function inferFileExtension(file: File) {
  const fileNameParts = file.name.split(".");
  const suppliedExtension = fileNameParts.length > 1 ? fileNameParts.at(-1)?.toLowerCase() : "";

  if (suppliedExtension && /^[a-z0-9]+$/.test(suppliedExtension)) {
    return suppliedExtension;
  }

  const fallbackExtensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
    "image/svg+xml": "svg",
  };

  return fallbackExtensions[file.type] ?? "bin";
}

function isAllowedGalleryUrl(value: string) {
  if (!value) {
    return false;
  }

  if (value.startsWith("/")) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function uploadGalleryImageIfNeeded(args: {
  formData: FormData;
  horseId: string;
}) {
  const { formData, horseId } = args;
  const directUrl = readString(formData, "imageUrl");

  if (isAllowedGalleryUrl(directUrl)) {
    return {
      imageUrl: directUrl,
      uploadedPath: null,
    };
  }

  const file = readGalleryImageFile(formData);

  if (!file) {
    return {
      imageUrl: "",
      uploadedPath: null,
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      imageUrl: "",
      uploadedPath: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const extension = inferFileExtension(file);
  const objectPath = `${horseId}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from(HORSE_GALLERY_BUCKET).upload(objectPath, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    throw new Error("gallery-upload-failed");
  }

  const { data } = supabase.storage.from(HORSE_GALLERY_BUCKET).getPublicUrl(objectPath);

  return {
    imageUrl: data.publicUrl,
    uploadedPath: objectPath,
  };
}

function revalidateHorsePaths(horseId: string) {
  revalidatePath("/data-entry");
  revalidatePath("/data-entry/horses");
  revalidatePath(`/data-entry/horses/${horseId}`);
  revalidatePath(`/data-entry/horses/${horseId}/history`);
  revalidatePath(`/data-entry/horses/${horseId}/etrakka`);
  revalidatePath(`/portal/horses/${horseId}`);
  revalidatePath("/portal/horses");
  revalidatePath("/portal/reports");
}

async function upsertHorseReferenceRecord(args: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  horseId: string;
  appUserId: string;
  sampledAt: string;
  notes: string;
  weightKg: number | null;
  temperatureValue: number | null;
}) {
  const { supabase, horseId, appUserId, sampledAt, notes, weightKg, temperatureValue } = args;

  if (weightKg === null && temperatureValue === null) {
    return;
  }

  const recordDate = sampledAt.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const { data: dailyRecord, error: dailyRecordError } = await supabase
    .from("daily_records")
    .upsert(
      {
        horse_id: horseId,
        record_date: recordDate,
        recorded_by_user_id: appUserId,
        notes: notes || "Live reference values updated from new test.",
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "horse_id,record_date",
      },
    )
    .select("id")
    .single();

  if (dailyRecordError || !dailyRecord) {
    throw new Error("reference-record-create-failed");
  }

  if (weightKg !== null) {
    const { error: weightError } = await supabase.from("weight_logs").insert({
      daily_record_id: dailyRecord.id,
      horse_id: horseId,
      recorded_at: sampledAt,
      weight_value: weightKg,
      weight_unit: "kg",
      notes: notes || "Updated from new test modal.",
      created_by_user_id: appUserId,
    });

    if (weightError) {
      throw new Error("weight-reference-save-failed");
    }
  }

  if (temperatureValue !== null) {
    const { error: temperatureError } = await supabase.from("temperature_logs").insert({
      daily_record_id: dailyRecord.id,
      horse_id: horseId,
      recorded_at: sampledAt,
      temperature_value: temperatureValue,
      temperature_unit: "C",
      notes: notes || "Updated from new test modal.",
      created_by_user_id: appUserId,
    });

    if (temperatureError) {
      throw new Error("temperature-reference-save-failed");
    }
  }
}

export async function createHorseAction(formData: FormData) {
  const context = await requireSignedInAppContext("/data-entry/horses");

  if (!hasSupabaseEnv()) {
    redirect("/data-entry/horses?error=supabase-not-configured");
  }

  const name = readString(formData, "name");
  const status = readString(formData, "status");
  const sex = readString(formData, "sex");
  const breed = readString(formData, "breed");
  const colour = readString(formData, "colour");
  const dateOfBirth = readString(formData, "dateOfBirth");
  const microchipNumber = readString(formData, "microchipNumber");
  const registrationNumber = readString(formData, "registrationNumber");
  const stableName = readString(formData, "stableName");
  const openingWeightKg = readOptionalNumber(formData, "openingWeightKg");

  if (!name) {
    redirect("/data-entry/horses?error=missing-horse-name");
  }

  const supabase = await createSupabaseServerClient();
  let stableId: string | null = null;

  if (stableName) {
    const { data: insertedStable, error: stableError } = await supabase
      .from("stables")
      .insert({
        name: stableName,
        status: "active",
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (stableError) {
      redirect("/data-entry/horses?error=stable-create-failed");
    }

    stableId = insertedStable.id;
  }

  const { data: insertedHorse, error: horseError } = await supabase
    .from("horses")
    .insert({
      stable_id: stableId,
      name,
      status: status || "active",
      sex: sex || null,
      breed: breed || null,
      colour: colour || null,
      date_of_birth: dateOfBirth || null,
      microchip_number: microchipNumber || null,
      registration_number: registrationNumber || null,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (horseError || !insertedHorse) {
    redirect("/data-entry/horses?error=horse-create-failed");
  }

  if (openingWeightKg !== null) {
    const { data: dailyRecord, error: dailyRecordError } = await supabase
      .from("daily_records")
      .insert({
        horse_id: insertedHorse.id,
        record_date: new Date().toISOString().slice(0, 10),
        recorded_by_user_id: context.appUserId,
        stable_id: stableId,
        notes: "Opening horse setup record.",
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (dailyRecordError || !dailyRecord) {
      redirect("/data-entry/horses?error=horse-weight-setup-failed");
    }

    const { error: weightError } = await supabase.from("weight_logs").insert({
      daily_record_id: dailyRecord.id,
      horse_id: insertedHorse.id,
      recorded_at: new Date().toISOString(),
      weight_value: openingWeightKg,
      weight_unit: "kg",
      notes: "Opening horse setup weight.",
      created_by_user_id: context.appUserId,
    });

    if (weightError) {
      redirect("/data-entry/horses?error=horse-weight-setup-failed");
    }
  }

  if (hasSupabaseAdminEnv() && context.memberProfileId && stableId) {
    const admin = createSupabaseAdminClient();
    const { data: trainer } = await admin
      .from("trainers")
      .select("id")
      .eq("member_profile_id", context.memberProfileId)
      .maybeSingle();

    if (trainer?.id) {
      await admin.from("horse_assignments").insert({
        horse_id: insertedHorse.id,
        trainer_id: trainer.id,
        stable_id: stableId,
        assignment_type: "trainer",
        access_level: "write",
        is_primary: true,
        starts_at: new Date().toISOString(),
        notes: "Created from stable setup.",
        updated_at: new Date().toISOString(),
      });
    }
  }

  revalidateHorsePaths(insertedHorse.id);
  redirect("/data-entry/horses?saved=horse");
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
  const caption = readString(formData, "caption");
  const takenAt = readString(formData, "takenAt");
  const directUrl = readString(formData, "imageUrl");

  if (!horseId || (!context.appUserId && !context.bypassActive)) {
    redirect(`/data-entry/horses/${horseId || ""}?error=missing-gallery-fields`);
  }

  if (directUrl && !isAllowedGalleryUrl(directUrl)) {
    redirect(`/data-entry/horses/${horseId}?error=invalid-gallery-url`);
  }

  let uploadResult: Awaited<ReturnType<typeof uploadGalleryImageIfNeeded>>;

  try {
    uploadResult = await uploadGalleryImageIfNeeded({ formData, horseId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "gallery-upload-failed";
    redirect(`/data-entry/horses/${horseId}?error=${message}`);
  }

  if (!uploadResult.imageUrl) {
    redirect(`/data-entry/horses/${horseId}?error=missing-gallery-fields`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("horse_gallery_items").insert({
    horse_id: horseId,
    image_url: uploadResult.imageUrl,
    caption: caption || null,
    taken_at: takenAt || null,
    created_by_user_id: context.appUserId ?? null,
  });

  if (error) {
    if (uploadResult.uploadedPath) {
      await supabase.storage.from(HORSE_GALLERY_BUCKET).remove([uploadResult.uploadedPath]);
    }
    redirect(`/data-entry/horses/${horseId}?error=gallery-save-failed`);
  }

  revalidateHorsePaths(horseId);
  redirect(`/data-entry/horses/${horseId}?saved=gallery#horse-gallery`);
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
  const weightKg = readOptionalNumber(formData, "weightKg");
  const temperatureValue = readOptionalNumber(formData, "temperatureValue");

  if (!horseId || !context.appUserId) {
    redirect(`/data-entry/horses/${horseId || ""}?error=missing-biochemistry-fields`);
  }

  const supabase = await createSupabaseServerClient();
  try {
    await upsertHorseReferenceRecord({
      supabase,
      horseId,
      appUserId: context.appUserId,
      sampledAt: sampledAt || new Date().toISOString(),
      notes,
      weightKg,
      temperatureValue,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "reference-save-failed";
    redirect(`/data-entry/horses/${horseId}?error=${message}`);
  }

  const { error } = await supabase.from("horse_biochemistry_results").insert({
    horse_id: horseId,
    sampled_at: sampledAt || new Date().toISOString(),
    sample_type: sampleType || "urine_saliva",
    weight_kg: weightKg,
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
  redirect(`/data-entry/horses/${horseId}?saved=biochemistry#review-results`);
}
