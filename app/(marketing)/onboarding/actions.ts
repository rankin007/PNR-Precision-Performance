"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { 
  sendApplicantConfirmationEmail, 
  sendAdminNotificationEmail 
} from "@/lib/email/service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitOnboardingForm(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const businessName = formData.get("businessName") as string;
  const stableAddress = formData.get("stableAddress") as string;
  const directEmail = formData.get("directEmail") as string;
  const adminEmail = formData.get("adminEmail") as string;
  const mobileNumber = formData.get("mobileNumber") as string;

  if (!clientName || !stableAddress || !directEmail || !mobileNumber) {
    return { error: "Please fill in all required fields." };
  }

  // We use the admin client since this is an unchecked, backend server insertion
  // which might bypass RLS safely if we want strict policies.
  let supabase;
  try {
    supabase = await createSupabaseAdminClient();
  } catch (err: any) {
    console.error("Local configuration missing:", err.message);
    return { error: "Local Database is not configured yet. Missing SUPABASE_SERVICE_ROLE_KEY." };
  }

  const { data: application, error } = await supabase
    .from("client_applications")
    .insert({
      client_name: clientName,
      business_name: businessName || null,
      stable_address: stableAddress,
      direct_email: directEmail,
      admin_email: adminEmail || null,
      mobile_number: mobileNumber,
    })
    .select()
    .single();

  if (error) {
    console.error("Error inserting application:", error);
    return { error: "Failed to submit application. Please try again later." };
  }

  // Dispatch Emails
  try {
    await Promise.all([
      sendApplicantConfirmationEmail(application),
      sendAdminNotificationEmail(application),
    ]);
  } catch (emailError) {
    console.error("Error sending emails:", emailError);
    // We swallow the error so the user still sees success, 
    // but in a production app we might queue this or alert us.
  }

  revalidatePath("/onboarding");
  return { success: true };
}

export async function confirmOnboardingApplication(token: string) {
  if (!token) {
    return { error: "Invalid token" };
  }

  let supabase;
  try {
    supabase = await createSupabaseAdminClient();
  } catch (err: any) {
    console.error("Local configuration missing:", err.message);
    return { error: "Local Database is not configured yet. Missing SUPABASE_SERVICE_ROLE_KEY." };
  }

  // Validate token exists and isn't already verified
  const { data: application, error: fetchError } = await supabase
    .from("client_applications")
    .select("*")
    .eq("confirmation_token", token)
    .single();

  if (fetchError || !application) {
    return { error: "Application not found or token invalid." };
  }

  if (application.status === "verified") {
    // Already verified
    return { success: true };
  }

  // Mark as verified
  const { error: updateError } = await supabase
    .from("client_applications")
    .update({
      status: "verified",
      email_verified_at: new Date().toISOString(),
      disclaimer_agreed_at: new Date().toISOString()
    })
    .eq("id", application.id);

  if (updateError) {
    console.error("Error confirming application:", updateError);
    return { error: "Failed to confirm application." };
  }

  return { success: true };
}
