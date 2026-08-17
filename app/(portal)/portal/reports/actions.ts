"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  validateTrendPreferenceConfig,
  validateTrendPreferenceLabel,
  type TrendPreferenceConfig,
} from "@/lib/domain/biochemistry-trends";
import { requirePortalAppContext } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function stringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function configFromForm(formData: FormData): TrendPreferenceConfig | null {
  return validateTrendPreferenceConfig({
    scoreView: stringField(formData, "scoreView"),
    phView: stringField(formData, "phView"),
    showCarbohydrate: stringField(formData, "showCarbohydrate") === "true",
    showConductivity: stringField(formData, "showConductivity") === "true",
    timeFilter: stringField(formData, "timeFilter"),
    rangeDays: stringField(formData, "rangeDays"),
  });
}

function preferencePayload(config: TrendPreferenceConfig) {
  return {
    score_view: config.scoreView,
    ph_view: config.phView,
    show_carbohydrate: config.showCarbohydrate,
    show_conductivity: config.showConductivity,
    time_filter: config.timeFilter,
    range_days: config.rangeDays,
  };
}

function reportsRedirect(status: string): never {
  revalidatePath("/portal/reports");
  redirect(`/portal/reports?preferenceStatus=${encodeURIComponent(status)}`);
}

function exactlyOneRow(data: unknown): data is Array<{ id: string }> {
  return Array.isArray(data) && data.length === 1 && typeof data[0]?.id === "string";
}

export async function createTrendPreferenceAction(formData: FormData) {
  const context = await requirePortalAppContext("/portal/reports");
  const label = validateTrendPreferenceLabel(stringField(formData, "label"));
  const config = configFromForm(formData);
  if (!context.appUserId || !label || !config) reportsRedirect("invalid");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("user_trend_view_preferences").insert({
    user_id: context.appUserId,
    label,
    ...preferencePayload(config),
    is_default: false,
  }).select("id");
  if (error || !exactlyOneRow(data)) reportsRedirect("unavailable");
  reportsRedirect("created");
}

export async function updateTrendPreferenceAction(formData: FormData) {
  const context = await requirePortalAppContext("/portal/reports");
  const preferenceId = stringField(formData, "preferenceId");
  const label = validateTrendPreferenceLabel(stringField(formData, "label"));
  const config = configFromForm(formData);
  if (!context.appUserId || !UUID_PATTERN.test(preferenceId) || !label || !config) reportsRedirect("invalid");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("user_trend_view_preferences").update({
    label,
    ...preferencePayload(config),
  }).eq("id", preferenceId).eq("user_id", context.appUserId).select("id");
  if (error || !exactlyOneRow(data)) reportsRedirect("unavailable");
  reportsRedirect("updated");
}

export async function deleteTrendPreferenceAction(formData: FormData) {
  const context = await requirePortalAppContext("/portal/reports");
  const preferenceId = stringField(formData, "preferenceId");
  if (!context.appUserId || !UUID_PATTERN.test(preferenceId)) reportsRedirect("invalid");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("user_trend_view_preferences").delete()
    .eq("id", preferenceId).eq("user_id", context.appUserId).select("id");
  if (error || !exactlyOneRow(data)) reportsRedirect("unavailable");
  reportsRedirect("deleted");
}

export async function setDefaultTrendPreferenceAction(formData: FormData) {
  const context = await requirePortalAppContext("/portal/reports");
  const preferenceId = stringField(formData, "preferenceId");
  if (!context.appUserId || !UUID_PATTERN.test(preferenceId)) reportsRedirect("invalid");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("set_default_biochemistry_trend_preference", {
    target_preference_id: preferenceId,
  });
  if (error || data !== true) reportsRedirect("unavailable");
  reportsRedirect("default-set");
}
