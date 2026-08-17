type StatusTone = "success" | "warning" | "danger" | "unavailable";
type StatusIndicatorProps = { label: string; tone: StatusTone; context?: string };

const toneStyles: Record<StatusTone, string> = {
  success: "border-success/35 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-[#805b0d]",
  danger: "border-danger/35 bg-danger/10 text-danger",
  unavailable: "border-slate/30 bg-slate/10 text-slate",
};
const markers: Record<StatusTone, string> = { success: "✓", warning: "!", danger: "×", unavailable: "—" };

export function StatusIndicator({ label, tone, context }: StatusIndicatorProps) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${toneStyles[tone]}`}>
      <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px]">{markers[tone]}</span>
      <span>{label}</span>{context ? <span className="font-normal opacity-80">{context}</span> : null}
    </div>
  );
}
