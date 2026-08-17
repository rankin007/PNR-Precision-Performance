import {
  buildScoreSegments,
  formatTrendValue,
  type BiochemistryTrendRow,
  type TrendChartGroup,
  type TrendPhView,
  type TrendScoreView,
} from "@/lib/domain/biochemistry-trends";

type ChartProps = {
  group: TrendChartGroup;
  rows: BiochemistryTrendRow[];
  scoreView: TrendScoreView;
  phView: TrendPhView;
};

type Series = {
  id: string;
  label: string;
  colour: string;
  dash?: string;
  metric: "hydration" | "biochemistry" | "carbohydrate" | "ph" | "conductivity";
  segments: Array<Array<{ row: BiochemistryTrendRow; value: number }>>;
};

const chartWidth = 720;
const chartHeight = 280;
const inset = { left: 54, right: 18, top: 24, bottom: 42 };

function rawSegment(rows: BiochemistryTrendRow[], pick: (row: BiochemistryTrendRow) => number) {
  return [[...rows].reverse().map((row) => ({ row, value: pick(row) }))];
}

function chartDefinition(
  group: TrendChartGroup,
  rows: BiochemistryTrendRow[],
  scoreView: TrendScoreView,
  phView: TrendPhView,
): { title: string; description: string; domain: readonly [number, number]; series: Series[] } {
  if (group === "scores") {
    const series: Series[] = [];
    if (scoreView === "hydration" || scoreView === "both") {
      series.push({
        id: "hydration",
        label: "Hydration Score",
        colour: "#278BC2",
        metric: "hydration",
        segments: buildScoreSegments(rows, "hydrationScore").map((segment) => segment.points),
      });
    }
    if (scoreView === "biochemistry" || scoreView === "both") {
      series.push({
        id: "biochemistry",
        label: "Biochemistry Trend Score",
        colour: "#12352F",
        dash: "8 5",
        metric: "biochemistry",
        segments: buildScoreSegments(rows, "healthScore").map((segment) => segment.points),
      });
    }
    return { title: "Stored score history", description: "Stored score percentages. Lines break when scoring or source version changes.", domain: [0, 1] as const, series };
  }
  if (group === "ph") {
    const series: Series[] = [];
    if (phView === "urine" || phView === "both") {
      series.push({ id: "urine", label: "Urine pH", colour: "#278BC2", metric: "ph", segments: rawSegment(rows, (row) => row.phUrine) });
    }
    if (phView === "saliva" || phView === "both") {
      series.push({ id: "saliva", label: "Saliva pH", colour: "#12352F", dash: "8 5", metric: "ph", segments: rawSegment(rows, (row) => row.phSaliva) });
    }
    return { title: "pH reading history", description: "Stored Urine pH and Saliva pH readings.", domain: [4.8, 9] as const, series };
  }
  if (group === "carbohydrate") {
    return {
      title: "Carbohydrate reading history",
      description: "Stored Carbohydrate readings in percent.",
      domain: [0, 15] as const,
      series: [{ id: "carbohydrate", label: "Carbohydrate", colour: "#278BC2", metric: "carbohydrate" as const, segments: rawSegment(rows, (row) => row.carbsReading) }],
    };
  }
  return {
    title: "Conductivity reading history",
    description: "Stored raw Conductivity meter readings in mS/cm.",
    domain: [0, 99] as const,
    series: [{ id: "conductivity", label: "Raw Conductivity", colour: "#278BC2", metric: "conductivity" as const, segments: rawSegment(rows, (row) => row.conductivityRawMeterValue) }],
  };
}

function pathFor(points: Array<{ row: BiochemistryTrendRow; value: number }>, xById: Map<string, number>, domain: readonly [number, number]) {
  const innerHeight = chartHeight - inset.top - inset.bottom;
  return points.map((point, index) => {
    const x = xById.get(point.row.id) ?? inset.left;
    const ratio = Math.max(0, Math.min(1, (point.value - domain[0]) / (domain[1] - domain[0])));
    const y = inset.top + innerHeight * (1 - ratio);
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

export function BiochemistryTrendChart({ group, rows, scoreView, phView }: ChartProps) {
  const definition = chartDefinition(group, rows, scoreView, phView);
  const chronological = [...rows].reverse();
  const innerWidth = chartWidth - inset.left - inset.right;
  const xById = new Map(chronological.map((row, index) => [
    row.id,
    inset.left + (chronological.length <= 1 ? innerWidth / 2 : (index / (chronological.length - 1)) * innerWidth),
  ]));
  const hasPoints = definition.series.some((series) => series.segments.some((segment) => segment.length > 0));

  return (
    <figure className="min-w-0 rounded-[1.5rem] border border-ink/10 bg-white p-4 shadow-panel" aria-labelledby={`trend-${group}-title`}>
      <figcaption>
        <h3 id={`trend-${group}-title`} className="font-display text-xl text-ink">{definition.title}</h3>
        <p className="mt-2 text-sm leading-6 text-steel">{definition.description}</p>
      </figcaption>
      <ul className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-ink" aria-label={`${definition.title} legend`}>
        {definition.series.map((series) => (
          <li key={series.id} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-8 border-t-2" style={{ borderColor: series.colour, borderTopStyle: series.dash ? "dashed" : "solid" }} />
            {series.label}{series.dash ? " — dashed" : " — solid"}
          </li>
        ))}
      </ul>
      {hasPoints ? (
        <div className="mt-4 w-full min-w-0 overflow-x-auto" tabIndex={0} aria-label={`Scrollable ${definition.title}`}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby={`trend-${group}-svg-title trend-${group}-svg-desc`} className="min-w-[640px]">
            <title id={`trend-${group}-svg-title`}>{definition.title}</title>
            <desc id={`trend-${group}-svg-desc`}>{definition.description} Exact values and statuses are available in the history table.</desc>
            {[0, 0.5, 1].map((ratio) => {
              const y = inset.top + (chartHeight - inset.top - inset.bottom) * (1 - ratio);
              const value = definition.domain[0] + ratio * (definition.domain[1] - definition.domain[0]);
              return (
                <g key={ratio}>
                  <line x1={inset.left} x2={chartWidth - inset.right} y1={y} y2={y} stroke="#D5D9D8" strokeWidth="1" />
                  <text x={inset.left - 8} y={y + 4} textAnchor="end" fontSize="12" fill="#445158">
                    {group === "scores" ? `${Math.round(value * 100)}%` : value.toFixed(group === "ph" ? 2 : 0)}
                  </text>
                </g>
              );
            })}
            {definition.series.flatMap((series) => series.segments.map((segment, segmentIndex) => (
              <g key={`${series.id}-${segmentIndex}`}>
                {segment.length > 1 ? <path d={pathFor(segment, xById, definition.domain)} fill="none" stroke={series.colour} strokeWidth="3" strokeDasharray={series.dash} /> : null}
                {segment.map((point) => {
                  const x = xById.get(point.row.id) ?? inset.left;
                  const ratio = Math.max(0, Math.min(1, (point.value - definition.domain[0]) / (definition.domain[1] - definition.domain[0])));
                  const y = inset.top + (chartHeight - inset.top - inset.bottom) * (1 - ratio);
                  return (
                    <circle key={`${series.id}-${point.row.id}`} cx={x} cy={y} r="4.5" fill={series.dash ? "white" : series.colour} stroke={series.colour} strokeWidth="2">
                      <title>{`${series.label}: ${formatTrendValue(point.value, series.metric)} on ${point.row.testDate} ${point.row.timeOfDay.toUpperCase()}`}</title>
                    </circle>
                  );
                })}
              </g>
            )))}
            {chronological.map((row, index) => index === 0 || index === chronological.length - 1 ? (
              <text key={row.id} x={xById.get(row.id)} y={chartHeight - 12} textAnchor={index === 0 ? "start" : "end"} fontSize="12" fill="#445158">{row.testDate}</text>
            ) : null)}
          </svg>
        </div>
      ) : (
        <p className="mt-4 rounded-2xl bg-sand p-4 text-sm text-ink">No scored points are available for this chart. Missing, blocked and unscored values are not plotted as zero.</p>
      )}
      {group === "scores" ? <p className="mt-3 text-xs leading-5 text-steel">Solid and dashed styles do not indicate clinical status. Version changes and score gaps are not connected.</p> : null}
    </figure>
  );
}
