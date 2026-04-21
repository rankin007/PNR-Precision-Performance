"use server";

import { redirect } from "next/navigation";
import { sendContactEnquiryEmail } from "@/lib/email/service";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactEnquiryAction(formData: FormData) {
  const name = readString(formData, "name");
  const email = readString(formData, "email");
  const mobile = readString(formData, "mobile");
  const comments = readString(formData, "comments");

  if (!name || !email || !mobile) {
    redirect("/contact?error=required");
  }

  try {
    await sendContactEnquiryEmail({
      name,
      email,
      mobile,
      comments,
    });
  } catch (error) {
    console.error("Error sending contact enquiry:", error);
    redirect("/contact?error=send");
  }

  redirect("/contact?sent=true");
}

export async function submitFooterEnquiryAction(formData: FormData) {
  const name = readString(formData, "name");
  const email = readString(formData, "email");
  const mobile = readString(formData, "mobile");
  const comments = readString(formData, "comments");

  if (!name || !email || !mobile) {
    redirect("/contact?error=required");
  }

  try {
    await sendContactEnquiryEmail({
      name,
      email,
      mobile,
      comments,
    });
  } catch (error) {
    console.error("Error sending footer enquiry:", error);
    redirect("/contact?error=send");
  }

  redirect("/");
}
