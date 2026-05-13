import type { HorseEtrakkaSheet } from "@/lib/domain/trainer-horses";

function padRowValues(values: string[], totalColumns: number) {
  if (values.length >= totalColumns) {
    return values;
  }

  return [...values, ...Array.from({ length: totalColumns - values.length }, () => "")];
}

export function EtrakkaSheet({ sheet }: { sheet: HorseEtrakkaSheet }) {
  const rows = sheet.rows.map((row) => ({
    ...row,
    values: padRowValues(row.values, sheet.headerLabels.length),
  }));

  return (
    <div className="mt-8 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">At A Glance</p>
          <h2 className="mt-3 font-display text-2xl text-ink">E-Trakka sheet view</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-steel">
            {sheet.usesRawImportRows
              ? "This table mirrors the latest preserved E-Trakka import layout so you can review the same column order from the original sheet."
              : "This table is being rebuilt from the normalized E-Trakka sessions because a preserved raw import sheet is not available yet for this horse."}
          </p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-sm font-semibold text-ink">
          {sheet.sourceLabel}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-ink/10">
        <div className="overflow-x-auto bg-[#f8f3eb]">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-ink">
            <thead>
              <tr className="bg-[#18212b] text-white">
                <th className="sticky left-0 z-20 border-b border-r border-white/10 bg-[#18212b] px-4 py-3 font-semibold">
                  Row
                </th>
                {sheet.headerLabels.map((header) => (
                  <th
                    key={header}
                    className="border-b border-r border-white/10 px-4 py-3 font-semibold whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={sheet.headerLabels.length + 1}
                    className="px-4 py-6 text-center text-sm text-steel"
                  >
                    No E-Trakka rows are available yet for this horse.
                  </td>
                </tr>
              ) : (
                rows.map((row, rowIndex) => (
                  <tr key={row.id} className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#fcf8f1]"}>
                    <td className="sticky left-0 z-10 border-b border-r border-ink/10 bg-inherit px-4 py-3 font-semibold text-steel">
                      {row.rowNumber}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={`${row.id}-${valueIndex}`}
                        className="border-b border-r border-ink/10 px-4 py-3 align-top text-sm text-ink"
                      >
                        <div className="min-w-[7rem] whitespace-nowrap">
                          {value || <span className="text-steel/70">-</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
