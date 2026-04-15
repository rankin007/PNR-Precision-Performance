type StatusGridProps = {
  items: string[];
};

export function StatusGrid({ items }: StatusGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm font-medium text-ink"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

