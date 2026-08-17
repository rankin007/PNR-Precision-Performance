"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminAppContext } from "@/lib/auth/session";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

const allowedUserStatuses = new Set(["active", "inactive"]);

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateUserStatusAction(formData: FormData) {
  await requireAdminAppContext("/admin/users");

  if (!hasSupabaseAdminEnv()) {
    redirect("/admin/users?error=service-role-missing");
  }

  const userId = readString(formData, "userId");
  const nextStatus = readString(formData, "status");

  if (!userId || !nextStatus) {
    redirect("/admin/users?error=missing-fields");
  }

  if (!allowedUserStatuses.has(nextStatus)) {
    redirect("/admin/users?error=invalid-status");
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("users")
    .update({
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    redirect("/admin/users?error=update-failed");
  }

  revalidatePath("/admin/users");
  redirect(`/admin/users?updated=${encodeURIComponent(userId)}&status=${encodeURIComponent(nextStatus)}`);
}
