import { EVIDENCE_MAX_BYTES, type EvidenceCategory, type SafeEvidenceResult } from "./contracts";

const allowed: Record<Exclude<EvidenceCategory, "csv">, { extensions: string[]; mime: string }> = {
  jpeg: { extensions: ["jpg", "jpeg"], mime: "image/jpeg" },
  png: { extensions: ["png"], mime: "image/png" },
  pdf: { extensions: ["pdf"], mime: "application/pdf" },
};

export function normalizeDisplayFilename(value: string) {
  const basename = value.replaceAll("\\", "/").split("/").pop() ?? "evidence";
  return basename.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 160) || "evidence";
}

export function extensionOf(name: string) {
  const match = /\.([a-z0-9]+)$/i.exec(name);
  return match?.[1].toLowerCase() ?? "";
}

export function detectEvidenceType(bytes: Uint8Array): Exclude<EvidenceCategory, "csv"> | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (bytes.length >= 8 && [137,80,78,71,13,10,26,10].every((v, i) => bytes[i] === v)) return "png";
  if (bytes.length >= 5 && new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-") return "pdf";
  return null;
}

export function validateEvidenceBytes(input: {
  name: string; declaredMime: string; bytes: Uint8Array;
}): SafeEvidenceResult<{ category: Exclude<EvidenceCategory, "csv">; displayName: string }> {
  if (input.bytes.length < 1 || input.bytes.length > EVIDENCE_MAX_BYTES) return { ok: false, code: "invalid" };
  if (input.declaredMime === "text/csv" || extensionOf(input.name) === "csv") return { ok: false, code: "unavailable" };
  const category = detectEvidenceType(input.bytes);
  if (!category) return { ok: false, code: "invalid" };
  const rule = allowed[category];
  if (rule.mime !== input.declaredMime || !rule.extensions.includes(extensionOf(input.name))) return { ok: false, code: "invalid" };
  if (category === "pdf") {
    const text = new TextDecoder().decode(input.bytes);
    if (/\/Encrypt\b|\/JavaScript\b|\/JS\b|\/Launch\b|\/EmbeddedFiles\b/i.test(text)) return { ok: false, code: "invalid" };
  }
  return { ok: true, value: { category, displayName: normalizeDisplayFilename(input.name) } };
}
