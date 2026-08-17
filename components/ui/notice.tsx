type NoticeTone = "info" | "success" | "warning" | "attention";

type NoticeProps = { tone?: NoticeTone; title: string; children: React.ReactNode; className?: string };

const toneStyles: Record<NoticeTone, string> = {
  info: "border-data/35 bg-data/10 text-technical",
  success: "border-success/35 bg-success/10 text-technical",
  warning: "border-warning/40 bg-warning/10 text-technical",
  attention: "border-danger/35 bg-danger/10 text-technical",
};
const markers: Record<NoticeTone, string> = { info: "i", success: "✓", warning: "!", attention: "×" };

export function Notice({ tone = "info", title, children, className = "" }: NoticeProps) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneStyles[tone]} ${className}`} role={tone === "attention" ? "alert" : "status"}>
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{markers[tone]}</span>
        <div><p className="font-semibold">{title}</p><div className="mt-1 leading-6 text-slate">{children}</div></div>
      </div>
    </div>
  );
}
