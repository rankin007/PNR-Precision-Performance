import "server-only";

import nodemailer, { type SentMessageInfo, type Transporter } from "nodemailer";
import type { EnquiryEnvironment } from "@/lib/enquiries/env";
import type { EnquiryPayload } from "@/lib/enquiries/contract";

export type SmtpProviderClass = "google_workspace" | "microsoft_365" | "amazon_ses" | "resend" | "postmark" | "mailgun" | "sendgrid";
export type SmtpProvider = { providerClass: SmtpProviderClass; publicLabel: string; processingDisclosure: string };
export type SmtpTransportConfiguration = Pick<EnquiryEnvironment, "smtpHost" | "smtpPort" | "smtpUser" | "smtpPass">;
export type DeliveryOutcome =
  | { state: "sent"; errorClass: null }
  | { state: "retryable"; errorClass: "connection" | "authentication" | "pre_envelope" }
  | { state: "delivery_unknown"; errorClass: "ambiguous" | "unexpected" };
export type SmtpPreflightOutcome =
  | { status: "ready"; errorClass: null }
  | { status: "unavailable"; errorClass: Exclude<DeliveryOutcome["errorClass"], null> };

const SMTP_CONNECTION_TIMEOUT_MS = 10_000;
const SMTP_GREETING_TIMEOUT_MS = 10_000;
const SMTP_SOCKET_TIMEOUT_MS = 20_000;

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

export function classifyProviderError(error: unknown): Exclude<DeliveryOutcome, { state: "sent" }> {
  const properties = typeof error === "object" && error !== null
    ? error as { code?: unknown; command?: unknown; responseCode?: unknown }
    : {};
  const code = typeof properties.code === "string" ? properties.code.trim().toUpperCase() : "";
  const command = typeof properties.command === "string" ? properties.command.trim().toUpperCase() : "";
  const responseCode = typeof properties.responseCode === "number" ? properties.responseCode : Number.NaN;

  if (code === "EAUTH" || responseCode === 535 || command.startsWith("AUTH")) {
    return { state: "retryable", errorClass: "authentication" };
  }
  if (
    command === "CONN" || command === "STARTTLS" ||
    ["ECONNECTION", "ECONNREFUSED", "ECONNRESET", "EDNS", "EAI_AGAIN", "ENOTFOUND", "ESOCKET", "ETIMEDOUT"].includes(code)
  ) return { state: "retryable", errorClass: "connection" };
  if (code === "EENVELOPE" || ["EHLO", "HELO", "MAIL FROM", "RCPT TO"].includes(command)) {
    return { state: "retryable", errorClass: "pre_envelope" };
  }
  if (["DATA", "DOT"].includes(command)) return { state: "delivery_unknown", errorClass: "ambiguous" };
  return { state: "delivery_unknown", errorClass: "unexpected" };
}

function createSmtpTransport(config: SmtpTransportConfiguration) {
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    auth: { user: config.smtpUser, pass: config.smtpPass },
    connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
    greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
    socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
  });
}

export async function verifySmtpTransport(
  config: SmtpTransportConfiguration,
  transport?: Pick<Transporter, "verify">,
): Promise<SmtpPreflightOutcome> {
  const activeTransport = transport ?? createSmtpTransport(config);
  try {
    return await activeTransport.verify() === true
      ? { status: "ready", errorClass: null }
      : { status: "unavailable", errorClass: "unexpected" };
  } catch (error) {
    const classified = classifyProviderError(error);
    return { status: "unavailable", errorClass: classified.errorClass };
  }
}

export async function deliverNotification(
  config: EnquiryEnvironment,
  payload: EnquiryPayload,
  reference: string,
  submittedAt: string,
  transport?: Pick<Transporter, "sendMail">,
): Promise<DeliveryOutcome> {
  const activeTransport = transport ?? createSmtpTransport(config);
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
