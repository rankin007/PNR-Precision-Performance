"use client";

import { useReducer, useRef, useState } from "react";
import { EVIDENCE_ACKNOWLEDGEMENT, EVIDENCE_MAX_BYTES } from "@/lib/evidence";
import { evidenceUiReducer } from "./test-evidence-state";

export function TestEvidenceUpload({ testId }: { testId: string }) {
  const [state, dispatch] = useReducer(evidenceUiReducer, "idle");
  const [acknowledged, setAcknowledged] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const error = file && file.size > EVIDENCE_MAX_BYTES ? "The selected file is larger than 5 MiB." : file?.name.toLowerCase().endsWith(".csv") ? "CSV evidence is not enabled yet." : null;

  function choose(next: File | null) {
    setFile(next);
    dispatch({ type: next ? "select" : "cancel" });
    if (next && (next.size > EVIDENCE_MAX_BYTES || next.name.toLowerCase().endsWith(".csv"))) queueMicrotask(() => errorRef.current?.focus());
  }

  return <section className="mt-6 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="evidence-heading">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Private test evidence</p>
    <h2 id="evidence-heading" className="mt-2 text-xl font-semibold text-ink">Supporting files</h2>
    <p className="mt-2 text-sm text-steel">JPEG, PNG or PDF; up to 5 MiB each, 10 files and 30 MiB per test. CSV remains disabled. Files stay unavailable while safety checks are pending.</p>
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
      <button type="button" disabled={!file || !acknowledged || Boolean(error)} onClick={() => dispatch({ type: "start" })} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Prepare private upload</button>
      {file ? <button type="button" onClick={() => choose(null)} className="rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold">Cancel</button> : null}
    </div>
    <p className="mt-3 text-sm text-steel" role="status" aria-live="polite">
      {state === "idle" ? "No evidence selected." : state === "selected" ? "File selected. Confirm your authority before upload." : state === "uploading" ? "Upload preparation complete locally. Transfer and safety approval are unavailable until Storage and safety services are approved." : state === "checking" ? "Transfer complete; safety checks are still pending." : state === "blocked" ? "This file is unavailable after a safety check." : "The upload could not continue. You can retry safely."}
    </p>
  </section>;
}
