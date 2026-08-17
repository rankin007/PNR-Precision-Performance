import { notFound } from "next/navigation";
import { installManualPreviewSessionAction } from "./actions";

export default function ManualPreviewSessionPage() {
  if (process.env.VERCEL_ENV !== "preview") notFound();

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-3xl text-ink">Manual synthetic preview session</h1>
      <p className="mt-3 text-sm leading-7 text-steel">Protected Builder handoff for a temporary ordinary trainer session.</p>
      <form action={installManualPreviewSessionAction} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Session access
          <input name="access_token" type="password" autoComplete="off" required className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Session refresh
          <input name="refresh_token" type="password" autoComplete="off" required className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3" />
        </label>
        <button type="submit" className="inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white">
          Install ordinary trainer session
        </button>
      </form>
    </main>
  );
}
