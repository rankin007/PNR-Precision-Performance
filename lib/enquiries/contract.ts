export const ENQUIRY_NOTICE_VERSION = "2026-08-05";
export const ENQUIRY_BODY_LIMIT_BYTES = 16_384;

export const enquiryKeys = [
  "trainerName",
  "stableName",
  "stableAddress",
  "phone",
  "email",
  "horseVolume",
  "referredBy",
  "acknowledgement",
  "website",
  "requestId",
] as const;

export type EnquiryField = "trainerName" | "stableName" | "stableAddress" | "phone" | "email" | "horseVolume" | "referredBy" | "acknowledgement";
export type EnquiryFieldErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryPayload = {
  trainerName: string;
  stableName: string;
  stableAddress: string;
  phone: string;
  email: string;
  horseVolume: number;
  referredBy: string;
  acknowledgement: true;
  website: "";
  requestId: string;
};

export type EnquiryParseResult =
  | { ok: true; value: EnquiryPayload }
  | { ok: false; kind: "invalid" | "honeypot" | "unknown"; fields: EnquiryFieldErrors };

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]+$/;
const controlsPattern = /[\u0000-\u001f\u007f]/;

function normalizedText(value: unknown) {
  if (typeof value !== "string") return null;
  return value.trim().replace(/\s+/g, " ");
}

function validText(value: string | null, min: number, max: number) {
  return value !== null && value.length >= min && value.length <= max && !controlsPattern.test(value);
}

export function parseEnquiryPayload(input: unknown): EnquiryParseResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, kind: "invalid", fields: {} };
  }

  const record = input as Record<string, unknown>;
  const allowed = new Set<string>(enquiryKeys);
  if (Object.keys(record).some((key) => !allowed.has(key))) {
    return { ok: false, kind: "unknown", fields: {} };
  }

  const website = normalizedText(record.website);
  if (website === null || website !== "") {
    return { ok: false, kind: "honeypot", fields: {} };
  }

  const trainerName = normalizedText(record.trainerName);
  const stableName = normalizedText(record.stableName);
  const stableAddress = normalizedText(record.stableAddress);
  const phone = normalizedText(record.phone);
  const email = normalizedText(record.email)?.toLowerCase() ?? null;
  const referredBy = normalizedText(record.referredBy);
  const requestId = normalizedText(record.requestId);
  const numericHorseVolume = typeof record.horseVolume === "number"
    ? record.horseVolume
    : typeof record.horseVolume === "string" && /^\d+$/.test(record.horseVolume.trim())
      ? Number(record.horseVolume)
      : Number.NaN;

  const fields: EnquiryFieldErrors = {};
  if (!validText(trainerName, 2, 120)) fields.trainerName = "Enter the trainer's name (2 to 120 characters).";
  if (!validText(stableName, 2, 160)) fields.stableName = "Enter the stable name (2 to 160 characters).";
  if (stableAddress === null || stableAddress.length > 500 || controlsPattern.test(stableAddress)) fields.stableAddress = "Enter no more than 500 characters for the optional stable address.";
  if (!validText(phone, 6, 40) || !phonePattern.test(phone ?? "") || !/[0-9]/.test(phone ?? "")) fields.phone = "Enter a valid contact phone number.";
  if (!validText(email, 3, 254) || !emailPattern.test(email ?? "")) fields.email = "Enter a valid email address.";
  if (!Number.isInteger(numericHorseVolume) || numericHorseVolume < 1 || numericHorseVolume > 9999) fields.horseVolume = "Enter a whole-number horse volume from 1 to 9999.";
  if (referredBy === null || referredBy.length > 160 || controlsPattern.test(referredBy)) fields.referredBy = "Enter no more than 160 characters for the optional referral.";
  if (record.acknowledgement !== true) fields.acknowledgement = "Acknowledge the collection notice before sending.";
  if (!requestId || !uuidPattern.test(requestId)) return { ok: false, kind: "invalid", fields };

  if (Object.keys(fields).length > 0 || !trainerName || !stableName || phone === null || email === null || stableAddress === null || referredBy === null) {
    return { ok: false, kind: "invalid", fields };
  }

  return {
    ok: true,
    value: {
      trainerName,
      stableName,
      stableAddress,
      phone,
      email,
      horseVolume: numericHorseVolume,
      referredBy,
      acknowledgement: true,
      website: "",
      requestId: requestId.toLowerCase(),
    },
  };
}

export function requestOriginIsSameHost(requestUrl: string, origin: string | null, forwardedHost: string | null) {
  if (!origin) return false;
  try {
    const request = new URL(requestUrl);
    const source = new URL(origin);
    const expectedHost = (forwardedHost ?? request.host).split(",", 1)[0].trim().toLowerCase();
    return source.protocol === "https:" && source.host.toLowerCase() === expectedHost && !source.username && !source.password;
  } catch {
    return false;
  }
}
