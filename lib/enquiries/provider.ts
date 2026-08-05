import "server-only";

import nodemailer, { type SentMessageInfo, type Transporter } from "nodemailer";
import type { EnquiryEnvironment } from "@/lib/enquiries/env";
import type { EnquiryPayload } from "@/lib/enquiries/contract";

export type SmtpProviderClass = "google_workspace" | "microsoft_365" | "amazon_ses" | "resend" | "postmark" | "mailgun" | "sendgrid";
export type SmtpProvider = { providerClass: SmtpProviderClass; publicLabel: string; processingDisclosure: string };
export type DeliveryOutcome =
  | { state: "sent"; errorClass: null }
  | { state: "retryable"; errorClass: "connection" | "authentication" | "pre_envelope" }
  | { state: "delivery_unknown"; errorClass: "ambiguous" | "unexpected" };

const exactProviders = new Map<string, SmtpProvider>([
  ["smtp.gmail.com", { providerClass: "google_workspace", publicLabel: "Google email services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the United States." }],
  ["smtp-relay.gmail.com", { providerClass: "google_workspace", publicLabel: "Google email services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the United States." }],
  ["smtp.office365.com", { providerClass: "microsoft_365", publicLabel: "Microsoft email services", processingDisclosure: "Email delivery may involve processing outside Australia in Microsoft service regions." }],
  ["smtp.resend.com", { providerClass: "resend", publicLabel: "Resend email delivery services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the United States." }],
  ["smtp.postmarkapp.com", { providerClass: "postmark", publicLabel: "Postmark email delivery services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the United States." }],
  ["smtp.mailgun.org", { providerClass: "mailgun", publicLabel: "Mailgun email delivery services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the United States." }],
  ["smtp.eu.mailgun.org", { providerClass: "mailgun", publicLabel: "Mailgun email delivery services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the European Union or United States." }],
  ["smtp.sendgrid.net", { providerClass: "sendgrid", publicLabel: "SendGrid email delivery services", processingDisclosure: "Email delivery may involve processing outside Australia, including in the United States." }],
]);

export function classifySmtpProvider(host: string): SmtpProvider | null {
  const normalized = host.trim().toLowerCase().replace(/\.$/, "");
  if (!normalized || normalized.includes(":") || normalized.includes("/") || normalized.includes("@")) return null;
  const exact = exactProviders.get(normalized);
  if (exact) return exact;
  if (/^email-smtp\.[a-z0-9-]+\.amazonaws\.com$/.test(normalized)) {
    return { providerClass: "amazon_ses", publicLabel: "Amazon Simple Email Service", processingDisclosure: "Email delivery may involve processing in the configured Amazon Web Services region outside Australia." };
  }
  return null;
}

export function buildNotificationMessage(config: EnquiryEnvironment, payload: EnquiryPayload, reference: string, submittedAt: string) {
  const lines = [
    `Reference: ${reference}`,
    `Submitted: ${submittedAt}`,
    `Trainer name: ${payload.trainerName}`,
    `Stable name: ${payload.stableName}`,
    `Stable address: ${payload.stableAddress || "Not provided"}`,
    `Phone number: ${payload.phone}`,
    `Email address: ${payload.email}`,
    `Approximate horse volume: ${payload.horseVolume}`,
    `Person referred by: ${payload.referredBy || "Not provided"}`,
  ];
  return {
    from: config.smtpFrom,
    to: config.recipient,
    replyTo: /[\r\n]/.test(payload.email) ? undefined : payload.email,
    subject: `Precision Performance stable trial enquiry ${reference}`,
    text: lines.join("\n"),
  };
}

function classifyProviderError(error: unknown): DeliveryOutcome {
  const command = typeof error === "object" && error !== null && "command" in error ? String((error as { command?: unknown }).command ?? "").toUpperCase() : "";
  if (command === "CONN") return { state: "retryable", errorClass: "connection" };
  if (command === "AUTH" || command === "STARTTLS") return { state: "retryable", errorClass: "authentication" };
  if (["EHLO", "HELO", "MAIL FROM", "RCPT TO"].includes(command)) return { state: "retryable", errorClass: "pre_envelope" };
  if (["DATA", "DOT"].includes(command)) return { state: "delivery_unknown", errorClass: "ambiguous" };
  return { state: "delivery_unknown", errorClass: "unexpected" };
}

export async function deliverNotification(
  config: EnquiryEnvironment,
  payload: EnquiryPayload,
  reference: string,
  submittedAt: string,
  transport?: Pick<Transporter, "sendMail">,
): Promise<DeliveryOutcome> {
  const activeTransport = transport ?? nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    auth: { user: config.smtpUser, pass: config.smtpPass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  try {
    const info = await activeTransport.sendMail(buildNotificationMessage(config, payload, reference, submittedAt)) as SentMessageInfo;
    const accepted = Array.isArray(info.accepted) ? info.accepted.length : 0;
    const rejected = Array.isArray(info.rejected) ? info.rejected.length : 0;
    return accepted === 1 && rejected === 0
      ? { state: "sent", errorClass: null }
      : { state: "delivery_unknown", errorClass: "ambiguous" };
  } catch (error) {
    return classifyProviderError(error);
  }
}
