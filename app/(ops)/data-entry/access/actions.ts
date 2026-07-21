"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminAppContext, requireOperationalWriteAppContext } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const lowerRoles = new Set(["stable_manager","veterinarian","consultant","stable_hand"]);
const horseAssignmentRoles = new Set(["stable_hand","veterinarian","consultant"]);
const stableAssignmentRoles = new Set(["stable_manager","stable_hand"]);
const statuses = new Set(["active","inactive","suspended"]);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function value(formData: FormData, key: string) {
  const item = formData.get(key);
  return typeof item === "string" ? item.trim() : "";
}

function validId(id: string) { return uuidPattern.test(id); }
function finish(result: string): never { redirect(`/data-entry/access?result=${encodeURIComponent(result)}`); }

export async function updateScopedUserLifecycleAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/access");
  const userId = value(formData,"userId");
  const status = value(formData,"status");
  const primaryRole = value(formData,"primaryRole");
  if (!validId(userId) || !statuses.has(status) || !lowerRoles.has(primaryRole) || userId === context.appUserId) finish("invalid");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("users").update({status,primary_role_code:primaryRole,updated_at:new Date().toISOString()}).eq("id",userId);
  if (error) finish("denied");
  revalidatePath("/data-entry/access"); finish("user-updated");
}

export async function assignHorseRoleAction(formData: FormData) {
  const context = await requireOperationalWriteAppContext("/data-entry/access");
  const horseId=value(formData,"horseId"), profileId=value(formData,"memberProfileId"), role=value(formData,"role");
  if (!validId(horseId) || !validId(profileId) || !horseAssignmentRoles.has(role) || profileId===context.memberProfileId) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("biochemistry_horse_access_assignments").upsert({horse_id:horseId,member_profile_id:profileId,role_code:role,access_level:"read",nominated_by_user_id:context.appUserId,starts_at:new Date().toISOString(),ends_at:null,updated_at:new Date().toISOString()},{onConflict:"horse_id,member_profile_id,role_code"});
  if(error) finish("denied"); revalidatePath("/data-entry/access"); finish("horse-role-assigned");
}

export async function revokeHorseRoleAction(formData: FormData) {
  await requireOperationalWriteAppContext("/data-entry/access");
  const assignmentId=value(formData,"assignmentId"); if(!validId(assignmentId)) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("biochemistry_horse_access_assignments").update({ends_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",assignmentId);
  if(error) finish("denied"); revalidatePath("/data-entry/access"); finish("horse-role-revoked");
}

export async function assignStableRoleAction(formData: FormData) {
  const context=await requireOperationalWriteAppContext("/data-entry/access");
  const stableId=value(formData,"stableId"), profileId=value(formData,"memberProfileId"), role=value(formData,"role");
  if(!validId(stableId)||!validId(profileId)||!stableAssignmentRoles.has(role)||profileId===context.memberProfileId) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("stable_role_assignments").upsert({stable_id:stableId,member_profile_id:profileId,role_code:role,assigned_by_user_id:context.appUserId,starts_at:new Date().toISOString(),ends_at:null,updated_at:new Date().toISOString()},{onConflict:"stable_id,member_profile_id,role_code"});
  if(error) finish("denied"); revalidatePath("/data-entry/access"); finish("stable-role-assigned");
}

export async function changeHorseOwnerAction(formData: FormData) {
  await requireOperationalWriteAppContext("/data-entry/access");
  const horseId=value(formData,"horseId"), ownerId=value(formData,"ownerId"), stableId=value(formData,"stableId");
  if(!validId(horseId)||!validId(ownerId)||(stableId&&!validId(stableId))) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("horse_assignments").insert({horse_id:horseId,owner_id:ownerId,stable_id:stableId||null,assignment_type:"owner",access_level:"read",starts_at:new Date().toISOString(),is_primary:true});
  if(error) finish("denied"); revalidatePath("/data-entry/access"); finish("owner-assigned");
}

export async function softDeleteHorseAction(formData: FormData) {
  const context=await requireOperationalWriteAppContext("/data-entry/access");
  const horseId=value(formData,"horseId"); if(!validId(horseId)||!context.appUserId) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("horses").update({status:"deleted",deleted_at:new Date().toISOString(),deleted_by_user_id:context.appUserId,delete_reason:"application-workflow",updated_at:new Date().toISOString()}).eq("id",horseId);
  if(error) finish("denied"); revalidatePath("/portal/horses"); finish("horse-deleted");
}

export async function restoreHorseAction(formData: FormData) {
  await requireOperationalWriteAppContext("/data-entry/access");
  const horseId=value(formData,"horseId"); if(!validId(horseId)) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("horses").update({status:"active",deleted_at:null,deleted_by_user_id:null,delete_reason:null,updated_at:new Date().toISOString()}).eq("id",horseId);
  if(error) finish("denied"); revalidatePath("/portal/horses"); finish("horse-restored");
}

export async function updateStableLifecycleAction(formData: FormData) {
  await requireAdminAppContext("/admin");
  const stableId=value(formData,"stableId"), status=value(formData,"status");
  if(!validId(stableId)||!new Set(["active","inactive"]).has(status)) finish("invalid");
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.from("stables").update({status,updated_at:new Date().toISOString()}).eq("id",stableId);
  if(error) finish("denied"); revalidatePath("/portal/horses"); finish("stable-updated");
}
