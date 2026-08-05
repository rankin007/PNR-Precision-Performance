import "server-only";

import { classifySmtpProvider, type SmtpProvider } from "@/lib/enquiries/provider";

export type EnquiryEnvironment = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpFrom: string;
  recipient: string;
  abuseSecret: string;
  cronSecret: string;
  provider: SmtpProvider;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readEnquiryEnvironment(source: NodeJS.ProcessEnv = process.env): EnquiryEnvironment | null {
  const smtpHost = source.SMTP_HOST?.trim() ?? "";
  const smtpPort = Number(source.SMTP_PORT);
  const smtpUser = source.SMTP_USER?.trim() ?? "";
  const smtpPass = source.SMTP_PASS ?? "";
  const smtpFrom = source.SMTP_FROM?.trim() ?? "";
  const recipient = source.CONTACT_ENQUIRY_EMAIL?.trim() ?? "";
  const abuseSecret = source.ENQUIRY_ABUSE_HMAC_SECRET ?? "";
  const cronSecret = source.CRON_SECRET ?? "";
  const provider = classifySmtpProvider(smtpHost);
  const supabaseUrl = source.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const supabaseAnonKey = source.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const supabaseServiceRoleKey = source.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (
    !provider || !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535 ||
    !smtpUser || !smtpPass || !emailPattern.test(smtpFrom) || !emailPattern.test(recipient) ||
    abuseSecret.length < 32 || cronSecret.length < 32 || /[\r\n]/.test(smtpFrom + recipient) ||
    supabaseUrl !== "https://uvskssaecdhxcgytkasc.supabase.co" || !supabaseAnonKey || !supabaseServiceRoleKey
  ) return null;

  return { smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, recipient, abuseSecret, cronSecret, provider };
}

export function getPublicEnquiryAvailability(source: NodeJS.ProcessEnv = process.env) {
  const provider = classifySmtpProvider(source.SMTP_HOST?.trim() ?? "");
  const available = Boolean(readEnquiryEnvironment(source));
  return {
    available,
    providerClass: provider?.providerClass ?? null,
    providerLabel: provider?.publicLabel ?? "approved email delivery provider",
    processingDisclosure: provider?.processingDisclosure ?? "Email-provider processing cannot currently be classified, so online submission is unavailable.",
  };
}
