import { submitFeedingLogAction } from "@/app/(ops)/data-entry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getFoodMenuSummaries } from "@/lib/domain/food-menus";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

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
  const horsesResult = await getAccessibleHorseSummaries();
  const menusResult = await getFoodMenuSummaries();

  return (
    <SectionCard
      eyebrow="Ops Feeding"
      title="Feeding workflow area"
      description="This route now supports horse selection, menu selection, and feeding log submission through the signed-in operational user context."
    >
      {!horsesResult.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured yet, so this feeding form is shown as a structural preview.
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
      <form action={submitFeedingLogAction} className="mt-8 grid gap-6">
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
        <button
          type="submit"
          disabled={horsesResult.horses.length === 0}
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
        >
          Submit feeding log
        </button>
      </form>
    </SectionCard>
  );
}
