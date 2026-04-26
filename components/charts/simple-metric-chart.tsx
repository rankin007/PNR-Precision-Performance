type SimpleMetricChartProps = {
  label: string;
  points: Array<{ label: string; value: number; note?: string }>;
};

export function SimpleMetricChart({ label, points }: SimpleMetricChartProps) {
  const width = 320;
  const height = 190;
  const padding = 22;
  const max = Math.max(...points.map((point) => point.value), 1);
  const min = Math.min(...points.map((point) => point.value), 0);
  const range = Math.max(max - min, 1);
  const xStep = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;
  const chartPoints = points.map((point, index) => {
    const x = padding + xStep * index;
    const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
    return { ...point, x, y };
  });
  const path = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{label}</p>
      <div className="mt-5 rounded-[1.5rem] border border-ink/10 bg-sand p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full overflow-visible">
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#c8d0cf" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#c8d0cf" strokeWidth="1" />
          <path d={path} fill="none" stroke="#1f5f49" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {chartPoints.map((point) => (
            <g key={`${label}-${point.label}`}>
              <circle cx={point.x} cy={point.y} r="5" fill="#d88b70">
                <title>{point.note ?? `${point.label}: ${point.value}`}</title>
              </circle>
              <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="11" fill="#18212b">
                {point.value}
              </text>
              <text x={point.x} y={height - 6} textAnchor="middle" fontSize="10" fill="#586472">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
        <p className="mt-3 text-xs leading-6 text-steel">
          Hover over each point to view the trainer session note for that result.
        </p>
      </div>
    </div>
  );
}
