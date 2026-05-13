import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { StableSearch } from "@/components/ops/stable-search";
import { createHorseAction } from "@/app/(ops)/data-entry/horses/actions";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

type TrainerHorseWorkspaceIndexPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TrainerHorseWorkspaceIndexPage({
  searchParams,
}: TrainerHorseWorkspaceIndexPageProps) {
  const result = await getAccessibleHorseSummaries();
  const query = searchParams ? await searchParams : {};
  const saved = pickValue(query.saved);
  const error = pickValue(query.error);
  const search = pickValue(query.q)?.trim().toLowerCase() ?? "";
  const filteredHorses = search
    ? result.horses.filter((horse) => {
        const haystack = [horse.name, horse.stableName, horse.status].filter(Boolean).join(" ").toLowerCase();
        return haystack.includes(search);
      })
    : result.horses;

  return (
    <SectionCard
      eyebrow="The Stable"
      title="The Stable"
      description=""
    >
      {saved ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {saved === "horse" ? "New horse added to the stable." : "Saved."}
        </div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error.replace(/-/g, " ")}
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
            <p className="text-base leading-7 text-steel">
              Horse names are ready here for new inputs, new tests, and direct workspace access.
            </p>
            <StableSearch
              horses={result.horses.map((horse) => ({ id: horse.id, name: horse.name }))}
              initialQuery={search}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/data-entry" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
              Daily Records
            </Link>
            <Link href="/data-entry/feeding" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
              Feeding
            </Link>
            <Link href="/data-entry/track" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
              Track Sessions
            </Link>
            <Link href="/data-entry/instructions" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
              Train the Trainer Instructions
            </Link>
            <Link href="/" className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink">
              Back to Home Page
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
        {filteredHorses.map((horse) => (
          <div key={horse.id} className="rounded-[1.35rem] border border-ink/10 bg-sand px-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
                    Horse
                  </span>
                  <h2 className="text-xl font-semibold text-ink">{horse.name}</h2>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-steel">
                  <span className="rounded-full border border-ink/10 bg-white px-3 py-1">
                    Stable: {horse.stableName ?? "Not yet assigned"}
                  </span>
                  <span className="rounded-full border border-ink/10 bg-white px-3 py-1">
                    Status: {horse.status ?? "Pending"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/data-entry/horses/${horse.id}?openTest=1`}
                  className="rounded-full bg-teal-600 px-3 py-2 text-xs font-semibold text-white"
                >
                  New Test
                </Link>
              <Link
                href={`/data-entry/horses/${horse.id}`}
                className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white"
              >
                Open Workspace
              </Link>
              <Link
                href={`/data-entry/horses/${horse.id}/history`}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink"
              >
                History
              </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
        {filteredHorses.length === 0 ? (
          <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
            No horses matched that search.
          </div>
        ) : null}
      </div>

      <form action={createHorseAction} className="mt-6 grid gap-5 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">New Horse</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Set up a new horse</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-steel">
              You can continue with only the horse name and weight. Everything else can be added later from the workspace.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Horse name
            <input name="name" required className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Opening weight kg
            <input name="openingWeightKg" type="number" step="0.1" inputMode="decimal" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Stable name
            <input name="stableName" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Status
            <input name="status" defaultValue="active" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Sex
            <input name="sex" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Breed
            <input name="breed" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Colour
            <input name="colour" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Date of birth
            <input name="dateOfBirth" type="date" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Microchip number
            <input name="microchipNumber" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2 xl:col-span-1">
            Registration number
            <input name="registrationNumber" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
            Add
          </button>
        </div>
      </form>
    </SectionCard>
  );
}
