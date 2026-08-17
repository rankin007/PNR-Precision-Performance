"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { SafeEvidenceMetadata } from "@/lib/evidence";
import {
  createEvidenceHold, executeEvidenceRestore, listTestEvidence, purgeEvidence,
  releaseEvidenceHold, requestEvidenceRestore, softDeleteEvidence,
} from "@/app/(ops)/data-entry/biochemistry/evidence-actions";
import { TestEvidenceUpload } from "./test-evidence-upload";
import { safeEvidenceStatus } from "./test-evidence-state";

type Operation = "delete" | "requestRestore" | "restore" | "hold" | "releaseHold" | "purge";
const operationCopy: Record<Operation, [string, string]> = {
  delete: ["Delete", "Delete this evidence now? It will become unavailable and may be restorable for a limited period."],
  requestRestore: ["Request restore", "Request restoration of this deleted evidence? An authorised decision is still required."],
  restore: ["Restore", "Restore this evidence? It will remain unavailable until approved safety processing exists."],
  hold: ["Place hold", "Place a governance hold? Governed purge will be prevented until the hold is released."],
  releaseHold: ["Release hold", "Release the governance hold? Other retention and purge requirements still apply."],
  purge: ["Governed purge", "Permanently remove this evidence through governed Storage deletion? This cannot be undone."],
};

function bytes(value: number) { return value < 1024 * 1024 ? `${Math.ceil(value / 1024)} KiB` : `${(value / 1024 / 1024).toFixed(1)} MiB`; }

export function TestEvidenceManager({ testId }: { testId: string }) {
  const [items, setItems] = useState<SafeEvidenceMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [replacement, setReplacement] = useState<string>();
  const [pending, startTransition] = useTransition();
  const statusRef = useRef<HTMLParagraphElement>(null);
  const refresh = useCallback(async () => {
    setLoading(true);
    try { setItems(await listTestEvidence(testId)); }
    catch { setMessage("Evidence could not be loaded. No action is available."); }
    finally { setLoading(false); }
  }, [testId]);
  useEffect(() => { void refresh(); }, [refresh]);

  function mutate(item: SafeEvidenceMetadata, operation: Operation) {
    if (!window.confirm(operationCopy[operation][1])) return;
    startTransition(async () => {
      const result = operation === "delete" ? await softDeleteEvidence(testId, item.id)
        : operation === "requestRestore" ? await requestEvidenceRestore(testId, item.id)
        : operation === "restore" ? await executeEvidenceRestore(testId, item.id)
        : operation === "hold" ? await createEvidenceHold(testId, item.id)
        : operation === "releaseHold" ? await releaseEvidenceHold(testId, item.id)
        : await purgeEvidence(testId, item.id);
      setMessage(result.ok ? `${operationCopy[operation][0]} completed. Evidence status refreshed.` : "The request was not accepted. Evidence status has been refreshed safely.");
      await refresh();
      queueMicrotask(() => statusRef.current?.focus());
    });
  }

  return <section className="mt-6 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="evidence-manager-heading">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Private test evidence</p>
    <h2 id="evidence-manager-heading" className="mt-2 text-xl font-semibold text-ink">Evidence management</h2>
    <p className="mt-2 text-sm leading-6 text-steel">Supporting evidence is private and limited to authorised test use. Transfer does not mean a file is safe, approved or available. Files are processed in Singapore, outside Australia. Retention and removal remain role controlled.</p>
    <p ref={statusRef} tabIndex={-1} className="mt-3 text-sm text-steel" role="status" aria-live="polite">{message}</p>
    <div className="mt-5 grid gap-4" aria-busy={loading || pending}>
      {loading ? <p className="text-sm text-steel">Loading evidence status…</p> : null}
      {!loading && items.length === 0 ? <p className="rounded-xl bg-sand p-4 text-sm text-steel">No supporting evidence has been added.</p> : null}
      {items.map((item) => {
        const [label, context] = safeEvidenceStatus(item.state);
        const c = item.capabilities;
        return <article key={item.id} className="rounded-2xl border border-ink/10 bg-sand p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0"><h3 className="break-words font-semibold text-ink">{item.displayName}</h3><p className="mt-1 text-xs text-steel">{item.category.toUpperCase()} · {bytes(item.bytes)} · Version {item.version}</p></div>
            <span className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-semibold text-ink">{label}</span>
          </div>
          <p className="mt-3 text-sm text-steel">{context}</p>
          <p className="mt-2 text-xs text-steel">{item.lineage === "superseded" ? "Superseded version." : item.lineage === "replacement-pending" ? "Replacement pending; the active predecessor remains authoritative." : "Current version."}{item.held ? " Governance hold active." : ""} Updated {new Date(item.updatedAt).toLocaleString("en-AU")}.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.replace ? <button disabled={pending} onClick={() => setReplacement(replacement === item.id ? undefined : item.id)} className="min-h-11 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold">Replace</button> : null}
            {c.softDelete ? <button disabled={pending} onClick={() => mutate(item, "delete")} className="min-h-11 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800">Delete</button> : null}
            {c.requestRestore ? <button disabled={pending} onClick={() => mutate(item, "requestRestore")} className="min-h-11 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold">Request restore</button> : null}
            {c.restore ? <button disabled={pending} onClick={() => mutate(item, "restore")} className="min-h-11 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold">Restore</button> : null}
            {c.createHold ? <button disabled={pending} onClick={() => mutate(item, "hold")} className="min-h-11 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold">Place hold</button> : null}
            {c.releaseHold ? <button disabled={pending} onClick={() => mutate(item, "releaseHold")} className="min-h-11 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold">Release hold</button> : null}
            {c.purge ? <button disabled={pending} onClick={() => mutate(item, "purge")} className="min-h-11 rounded-full bg-red-800 px-4 py-2 text-sm font-semibold text-white">Governed purge</button> : null}
          </div>
          {replacement === item.id ? <div className="mt-4"><TestEvidenceUpload testId={testId} predecessorId={item.id} onChanged={() => { setReplacement(undefined); void refresh(); }} /></div> : null}
        </article>;
      })}
    </div>
    <TestEvidenceUpload testId={testId} onChanged={() => void refresh()} />
  </section>;
}
