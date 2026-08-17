import type { EvidenceCategory, SafeEvidenceResult } from "./contracts";

export type SafetyInput = { category: Exclude<EvidenceCategory, "csv">; bytes: Uint8Array };
export interface MalwareScanner { scan(input: SafetyInput): Promise<SafeEvidenceResult<{ version: string }>>; }
export interface EvidenceSanitiser { sanitise(input: SafetyInput): Promise<SafeEvidenceResult<{ version: string }>>; }

export const failClosedScanner: MalwareScanner = {
  async scan() { return { ok: false, code: "unavailable" }; },
};
export const failClosedSanitiser: EvidenceSanitiser = {
  async sanitise() { return { ok: false, code: "unavailable" }; },
};

export function createDeterministicTestSafetyAdapters(): {
  scanner: MalwareScanner; sanitiser: EvidenceSanitiser;
} {
  return {
    scanner: { async scan() { return { ok: true, value: { version: "test-only-v1" } }; } },
    sanitiser: { async sanitise() { return { ok: true, value: { version: "test-only-v1" } }; } },
  };
}
