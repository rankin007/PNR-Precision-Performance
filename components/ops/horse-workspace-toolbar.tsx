"use client";

import { useRouter } from "next/navigation";

type HorseWorkspaceToolbarProps = {
  horses: Array<{
    id: string;
    name: string;
  }>;
  currentHorseId: string;
};

export function HorseWorkspaceToolbar({
  horses,
  currentHorseId,
}: HorseWorkspaceToolbarProps) {
  const router = useRouter();

  return (
    <div className="sticky top-4 z-10 rounded-[1.75rem] border border-ink/10 bg-white/95 p-4 shadow-panel backdrop-blur">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-2 xl:min-w-[22rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">New Test</p>
          <select
            value={currentHorseId}
            onChange={(event) => router.push(`/data-entry/horses/${event.target.value}`)}
            className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-sm font-medium text-ink outline-none"
          >
            {horses.map((horse) => (
              <option key={horse.id} value={horse.id}>
                {horse.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#horse-profile" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
            Horse Profile
          </a>
          <a href="#summary-analysis" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
            Summary Analysis
          </a>
          <a href="#new-test" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
            Add New Test
          </a>
          <a href="#review-results" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
            Review Results
          </a>
          <a href="#individual-panels" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
            Marker Panels
          </a>
        </div>
      </div>
    </div>
  );
}
