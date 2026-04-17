import Link from "next/link";
import { submitFeedingLogAction } from "@/app/(ops)/data-entry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getFoodMenuSummaries } from "@/lib/domain/food-menus";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";

type FeedingEntryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FeedingEntryPage({ searchParams }: FeedingEntryPageProps) {
  const params = searchParams ? await searchParams : {};
  const submitted = pickValue(params.submitted) === "true";
  const error = pickValue(params.error);
  const [horsesResult, menusResult, recentSubmissions] = await Promise.all([
    getAccessibleHorseSummaries(),
    getFoodMenuSummaries(),
    getRecentOperationSubmissions(),
  ]);
  const feedingItems = recentSubmissions.submissions.filter((item) => item.id.startsWith("feeding-"));
  const feedingMode = !horsesResult.envReady ? "Preview workflow" : "Live workflow";

  return (
    <SectionCard
      eyebrow="Ops Feeding"
      title="Feeding workflow"
      description="Select the horse, attach an available menu where useful, and keep feeding activity visible alongside the latest submission review items."
    >
      {!horsesResult.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Feeding entry is currently running in preview workflow mode, so the form and menu-linked review path can be checked while live feeding data is still being connected.
        </div>
      ) : null}
      {submitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Feeding log submitted successfully.
        </div>
      ) : null}
      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "missing-fields"
            ? "A horse is required."
            : "The feeding log could not be submitted yet."}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Accessible horses</p>
          <p className="mt-4 font-display text-4xl text-ink">{horsesResult.horses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Horses currently available for feeding entry.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Food menus</p>
          <p className="mt-4 font-display text-4xl text-ink">{menusResult.menus.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Menus available to attach to a feeding log.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent feeding logs</p>
          <p className="mt-4 font-display text-4xl text-ink">{feedingItems.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Feeding review items currently visible in operations.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Feeding mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{feedingMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!horsesResult.envReady
              ? "Use this route to validate menu selection, notes capture, and review routing before the live feed is active."
              : "This route is ready for live feeding capture with menu and note context."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={submitFeedingLogAction} className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div>
            <p className="eyebrow">Feeding Log</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Create a feeding entry</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Horse
              <select
                name="horseId"
                defaultValue=""
                disabled={horsesResult.horses.length === 0}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              >
                <option value="" disabled>
                  Select a horse
                </option>
                {horsesResult.horses.map((horse) => (
                  <option key={horse.id} value={horse.id}>
                    {horse.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Food menu
              <select
                name="foodMenuId"
                defaultValue=""
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              >
                <option value="">No menu selected</option>
                {menusResult.menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Feeding notes
            <textarea
              name="notes"
              rows={5}
              placeholder="Add feed notes, changes, intake comments, or operational context."
              className="rounded-[1.5rem] border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={horsesResult.horses.length === 0}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
            >
              Submit feeding log
            </button>
            <Link
              href="/data-entry"
              className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
            >
              Back to daily entry
            </Link>
          </div>
        </form>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Menu Snapshot</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Available menus</h2>
            <div className="mt-6 grid gap-3">
              {menusResult.menus.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No food menus are available yet.
                </div>
              ) : (
                menusResult.menus.map((menu) => (
                  <div key={menu.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                    {menu.name}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Capture guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">What to record in a feeding log</h2>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-steel">
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Link the horse first so the feeding event stays tied to the correct stable record.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Attach a menu when possible so the review queue has a clearer nutritional context.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Use notes for intake behaviour, changes, refusals, or anything worth surfacing later.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Recent Feeding Entries</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Review queue</h2>
            <div className="mt-6 grid gap-3">
              {feedingItems.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No feeding submissions are in the review feed yet.
                </div>
              ) : (
                feedingItems.slice(0, 4).map((submission) => (
                  <Link
                    key={submission.id}
                    href={`/data-entry/submissions/${submission.id}`}
                    className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 transition hover:border-ink/20"
                  >
                    <p className="font-semibold text-ink">{submission.horseName}</p>
                    <p className="mt-1 text-sm text-steel">{submission.detail}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
