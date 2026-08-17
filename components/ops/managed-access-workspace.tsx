import {
  MANAGED_ACCESS_ROLE_LABELS,
  type ManagedAccessSnapshot,
} from "@/lib/auth/managed-access-contract";

type FormAction = (formData: FormData) => void | Promise<void>;

type ManagedAccessWorkspaceProps = {
  snapshot: ManagedAccessSnapshot;
  status?: "assigned" | "revoked" | "unavailable";
  assignAction: FormAction;
  revokeAction: FormAction;
};

const controlClass =
  "min-h-11 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center whitespace-normal rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function ManagedAccessWorkspace({
  snapshot,
  status,
  assignAction,
  revokeAction,
}: ManagedAccessWorkspaceProps) {
  if (snapshot.availability === "unavailable") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900" role="alert">
        Access management is unavailable. No partial people, horse or assignment list is shown. Reload to try again.
      </div>
    );
  }

  const candidateById = new Map(snapshot.candidates.map((candidate) => [candidate.id, candidate]));
  const horseById = new Map(snapshot.horses.map((horse) => [horse.id, horse]));
  const canOfferAssignment = snapshot.candidates.length > 0 && snapshot.horses.length > 0;

  return (
    <div className="grid min-w-0 gap-6">
      <div className="rounded-2xl border border-ink/10 bg-sand p-5 text-sm leading-6 text-ink">
        <p className="font-semibold">Accountable access boundary</p>
        <p className="mt-2">
          An Administrator sets up each person, their primary role and their first scoped relationship.
          A Trainer can then manage horse access for people already in that scope.
        </p>
        <p className="mt-2">
          Assigned Veterinarians and Stable Staff can view the horse and manage only their own plain-text comments.
          They cannot change horse records, tests, readings, scores, assignments or another person&apos;s comment.
        </p>
      </div>

      {status === "assigned" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" role="status">
          Horse access was updated.
        </p>
      ) : null}
      {status === "revoked" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" role="status">
          Horse access was ended.
        </p>
      ) : null}
      {status === "unavailable" ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
          The requested access change was unavailable. No protected detail is shown and no success is implied.
        </p>
      ) : null}

      <section className="min-w-0 max-w-full rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="assign-access-heading">
        <h2 id="assign-access-heading" className="font-display text-2xl text-ink">Assign horse access</h2>
        <p className="mt-2 text-sm leading-6 text-steel">
          Only already-scoped active Veterinarians and Stable Staff can be selected.
        </p>
        {canOfferAssignment ? (
          <form action={assignAction} className="mt-5 grid gap-4 lg:grid-cols-3">
            <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
              Person
              <select name="memberProfileId" required className={controlClass} defaultValue="">
                <option value="" disabled>Choose a scoped person</option>
                {snapshot.candidates.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.displayName} ? {MANAGED_ACCESS_ROLE_LABELS[candidate.roleCode]}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
              Horse
              <select name="horseId" required className={controlClass} defaultValue="">
                <option value="" disabled>Choose a managed horse</option>
                {snapshot.horses.map((horse) => (
                  <option key={horse.id} value={horse.id}>{horse.name}</option>
                ))}
              </select>
            </label>
            <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
              Access role
              <select name="roleCode" required className={controlClass} defaultValue="">
                <option value="" disabled>Choose the person&apos;s role</option>
                <option value="veterinarian">Veterinarian</option>
                <option value="stable_hand">Stable Staff</option>
              </select>
            </label>
            <div className="lg:col-span-3">
              <button type="submit" className={primaryButtonClass}>Assign read access</button>
            </div>
          </form>
        ) : (
          <p className="mt-5 rounded-2xl border border-ink/10 bg-sand p-4 text-sm leading-6 text-steel">
            No assignment can be offered yet. Ask an Administrator to establish the person&apos;s role and first scoped relationship, or confirm that a managed horse is available.
          </p>
        )}
      </section>

      <section className="min-w-0 max-w-full rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="current-access-heading">
        <h2 id="current-access-heading" className="font-display text-2xl text-ink">Current horse access</h2>
        <div className="mt-5 grid gap-3">
          {snapshot.assignments.map((assignment) => {
            const candidate = candidateById.get(assignment.memberProfileId);
            const horse = horseById.get(assignment.horseId);
            if (!candidate || !horse) return null;
            return (
              <article key={assignment.id} className="min-w-0 rounded-2xl bg-sand p-4">
                <p className="font-semibold text-ink">{candidate.displayName}</p>
                <p className="mt-1 text-sm text-steel">
                  {MANAGED_ACCESS_ROLE_LABELS[assignment.roleCode]} ? {horse.name} ? Read access
                </p>
                <form action={revokeAction} className="mt-3">
                  <input type="hidden" name="assignmentId" value={assignment.id} />
                  <button
                    type="submit"
                    className="inline-flex min-h-11 w-full items-center justify-center whitespace-normal rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    End access
                  </button>
                </form>
              </article>
            );
          })}
          {snapshot.assignments.length === 0 ? (
            <p className="rounded-2xl border border-ink/10 bg-sand p-4 text-sm text-steel">
              No active managed horse-access assignments are visible in the current scope.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
