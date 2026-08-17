"use client";

import { useReducer, useRef, useState } from "react";
import { EVIDENCE_ACKNOWLEDGEMENT, EVIDENCE_MAX_BYTES } from "@/lib/evidence";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cancelEvidenceUpload, finaliseEvidenceUpload, initiateEvidenceUpload, replaceEvidence } from "@/app/(ops)/data-entry/biochemistry/evidence-actions";
import { evidenceUiReducer } from "./test-evidence-state";

export function TestEvidenceUpload({ testId, predecessorId, onChanged }: { testId: string; predecessorId?: string; onChanged?: () => void }) {
  const [state, dispatch] = useReducer(evidenceUiReducer, "idle");
  const [acknowledged, setAcknowledged] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
  const errorRef = useRef<HTMLDivElement>(null);
  const error = file && file.size > EVIDENCE_MAX_BYTES ? "The selected file is larger than 5 MiB." : file?.name.toLowerCase().endsWith(".csv") ? "CSV evidence is not enabled yet." : null;

  function choose(next: File | null) {
    setFile(next);
    if (next) setIdempotencyKey(crypto.randomUUID());
    dispatch({ type: next ? "select" : "cancel" });
    if (next && (next.size > EVIDENCE_MAX_BYTES || next.name.toLowerCase().endsWith(".csv"))) queueMicrotask(() => errorRef.current?.focus());
  }

  async function upload() {
    if (!file || !acknowledged || error) return;
    dispatch({ type: "start" });
    const request = { testId, displayName: file.name, declaredMime: file.type,
      declaredBytes: file.size, acknowledgement: true, idempotencyKey };
    const intent = predecessorId ? await replaceEvidence(request, predecessorId) : await initiateEvidenceUpload(request);
    if (!intent.ok) { dispatch({ type: "error" }); return; }
    const db = createSupabaseBrowserClient();
    const transfer = await db.storage.from(intent.value.bucket).uploadToSignedUrl(
      intent.value.key, intent.value.token, file, { contentType: file.type, upsert: false },
    );
    if (transfer.error) {
      await cancelEvidenceUpload(testId, intent.value.uploadId);
      dispatch({ type: "error" });
      return;
    }
    dispatch({ type: "transferred" });
    const finalised = await finaliseEvidenceUpload(testId, intent.value.uploadId);
    dispatch({ type: finalised.ok ? "blocked" : "error" });
    if (finalised.ok) onChanged?.();
  }

  return <section className="mt-6 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="evidence-heading">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Private test evidence</p>
    <h3 id="evidence-heading" className="mt-2 text-lg font-semibold text-ink">{predecessorId ? "Upload replacement" : "Add supporting file"}</h3>
    <p className="mt-2 text-sm text-steel">JPEG, PNG or PDF; up to 5 MiB each, 10 files and 30 MiB per test. CSV remains disabled. Files are processed privately in Singapore, outside Australia, and stay unavailable while approved safety services are absent. Retention, restoration and removal are role controlled.</p>
    {error ? <div ref={errorRef} tabIndex={-1} role="alert" className="mt-3 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</div> : null}
    <label className="mt-4 grid gap-2 text-sm font-semibold text-ink" htmlFor={`evidence-file-${testId}`}>
      Select evidence
      <input id={`evidence-file-${testId}`} type="file" accept="image/jpeg,image/png,application/pdf" onChange={(event) => choose(event.target.files?.[0] ?? null)} />
    </label>
    <label className="mt-4 flex items-start gap-3 text-sm text-ink">
      <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} />
      <span>{EVIDENCE_ACKNOWLEDGEMENT}</span>
    </label>
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" disabled={!file || !acknowledged || Boolean(error) || state === "uploading" || state === "checking"} onClick={upload} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Upload private evidence</button>
      {file ? <button type="button" onClick={() => choose(null)} className="rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold">Cancel</button> : null}
    </div>
    <p className="mt-3 text-sm text-steel" role="status" aria-live="polite">
      {state === "idle" ? "No evidence selected." : state === "selected" ? "File selected. Confirm your authority before upload." : state === "uploading" ? "Uploading privately. Do not close this page." : state === "checking" ? "Transfer complete; safety checks are still pending." : state === "blocked" ? "Transfer complete. This file remains unavailable because approved safety services are not configured." : "The upload could not continue. You can retry safely."}
    </p>
  </section>;
}
