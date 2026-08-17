import { SectionCard } from "@/components/layout/section-card";
import { BiochemistryTrends } from "@/components/portal/biochemistry-trends";
import {
  DEFAULT_TREND_PREFERENCE,
  parseTrendRange,
  parseTrendTimeFilter,
  validateTrendPreferenceConfig,
} from "@/lib/domain/biochemistry-trends";
import { getAccessibleHorseTrendHistory, getTrendViewPreferences } from "@/lib/domain/horses";
import { requirePortalAppContext } from "@/lib/auth/session";
import {
  createTrendPreferenceAction,
  deleteTrendPreferenceAction,
  setDefaultTrendPreferenceAction,
  updateTrendPreferenceAction,
} from "./actions";

type ReportsPageProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const preferenceStatuses: Record<string, string> = {
  created: "created",
  updated: "updated",
  deleted: "deleted",
  "default-set": "default set",
  invalid: "not saved because the submitted view was invalid",
  unavailable: "unavailable; no change was made",
};

export default async function PortalReportsPage({ searchParams }: ReportsPageProps) {
  const params = searchParams ? await searchParams : {};
  const context = await requirePortalAppContext("/portal/reports");
  const preferenceResult = await getTrendViewPreferences(context.appUserId);
  const requestedViewId = first(params.view);
  const selectedPreference = requestedViewId
    ? preferenceResult.preferences.find((preference) => preference.id === requestedViewId) ?? null
    : preferenceResult.preferences.find((preference) => preference.isDefault) ?? null;
  const baseConfig = selectedPreference ?? DEFAULT_TREND_PREFERENCE;
  const hasDirectConfig = params.scoreView !== undefined || params.phView !== undefined;
  const requestedConfig = validateTrendPreferenceConfig({
    scoreView: hasDirectConfig ? first(params.scoreView) : baseConfig.scoreView,
    phView: hasDirectConfig ? first(params.phView) : baseConfig.phView,
    showCarbohydrate: hasDirectConfig ? first(params.carbohydrate) === "true" : baseConfig.showCarbohydrate,
    showConductivity: hasDirectConfig ? first(params.conductivity) === "true" : baseConfig.showConductivity,
    timeFilter: params.time !== undefined ? parseTrendTimeFilter(first(params.time)) : baseConfig.timeFilter,
    rangeDays: params.range !== undefined ? parseTrendRange(first(params.range)) : baseConfig.rangeDays,
  });
  const config = requestedConfig ?? DEFAULT_TREND_PREFERENCE;
  const result = await getAccessibleHorseTrendHistory(first(params.horseId), config.rangeDays);
  const statusKey = first(params.preferenceStatus) ?? "";
  const preferenceError = [
    preferenceResult.error,
    requestedViewId && !selectedPreference ? "The selected saved chart view is unavailable." : undefined,
    !requestedConfig ? "The requested chart combination is invalid." : undefined,
  ].filter((value): value is string => Boolean(value)).join(" ");

  return (
    <SectionCard
      eyebrow="Portal Reports"
      title="Biochemistry trends"
      description="Permission-scoped stored score and reading history for one accessible horse."
    >
      <BiochemistryTrends
        envReady={result.envReady}
        horses={result.horses}
        selectedHorse={result.selectedHorse}
        history={result.history}
        config={config}
        preferences={preferenceResult.preferences}
        preferenceError={preferenceError || undefined}
        preferenceStatus={preferenceStatuses[statusKey]}
        createPreferenceAction={createTrendPreferenceAction}
        updatePreferenceAction={updateTrendPreferenceAction}
        deletePreferenceAction={deleteTrendPreferenceAction}
        setDefaultPreferenceAction={setDefaultTrendPreferenceAction}
      />
    </SectionCard>
  );
}
