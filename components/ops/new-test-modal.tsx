"use client";

import { useState, useEffect } from "react";
import { addHorseBiochemistryResultAction } from "@/app/(ops)/data-entry/horses/actions";

export function NewTestModal({ 
  horseId, 
  latestReferenceMetrics 
}: { 
  horseId: string;
  latestReferenceMetrics: Array<{ label: string; value: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultDateTime, setDefaultDateTime] = useState("");

  // Set the precise live local time as soon as they open the modal
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      // Adjust for local timezone to get precise YYYY-MM-DDTHH:MM format
      const offset = now.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
      setDefaultDateTime(localISOTime);
    }
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition w-full md:w-auto"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Test
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-sand overflow-y-auto sm:p-6">
          <div className="flex-1 w-full max-w-4xl mx-auto bg-white sm:rounded-[2rem] sm:shadow-2xl flex flex-col relative min-h-full sm:min-h-0">
            
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 py-4 border-b border-ink/10 flex items-center justify-between sm:rounded-t-[2rem]">
              <div>
                <p className="eyebrow text-teal-600">Modify Tests</p>
                <h2 className="mt-1 font-display text-2xl text-ink">NEW TEST</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form action={addHorseBiochemistryResultAction} className="p-6 grid gap-8">
              <input type="hidden" name="horseId" value={horseId} />

              <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember mb-5">Date/Time</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Sampled at (Live)
                      <input 
                        name="sampledAt" 
                        type="datetime-local" 
                        defaultValue={defaultDateTime}
                        className="rounded-2xl border border-teal-200 bg-teal-50/30 px-4 py-3 text-base text-ink outline-none focus:border-teal-500 transition" 
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Sample type
                      <select name="sampleType" defaultValue="urine_saliva" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none">
                        <option value="urine_saliva">Urine and saliva</option>
                        <option value="urine">Urine only</option>
                        <option value="saliva">Saliva only</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember mb-5">Horse reference</p>
                  <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                    {latestReferenceMetrics.length === 0 ? (
                      <div className="rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm text-steel">
                        Weight, temperature, and hydration references will appear here after daily data is recorded.
                      </div>
                    ) : (
                      latestReferenceMetrics.map((metric) => (
                        <div key={metric.label} className="flex justify-between items-center rounded-2xl border border-ink/10 bg-white px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">{metric.label}</p>
                          <p className="text-sm font-semibold text-ink">{metric.value}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border-2 border-teal-500/20 bg-teal-50/10 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 mb-6">Precise Numbers</p>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2 lg:col-span-1">
                    <span>Weight kg</span>
                    <input name="weightKg" type="number" step="0.1" inputMode="decimal" placeholder="481.1" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-lg font-mono text-ink outline-none focus:border-teal-500 transition" />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    <span>Carbs %</span>
                    <input name="carbsPercentage" type="number" min="0" max="15" step="0.1" inputMode="decimal" placeholder="3.5" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-lg font-mono text-ink outline-none focus:border-teal-500 transition" />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    <span>Salts ms</span>
                    <input name="saltsMs" type="number" min="0" step="0.1" inputMode="decimal" placeholder="12.0" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-lg font-mono text-ink outline-none focus:border-teal-500 transition" />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    <span>Urine pH</span>
                    <input name="urinePh" type="number" step="0.01" inputMode="decimal" placeholder="7.2" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-lg font-mono text-ink outline-none focus:border-teal-500 transition" />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-ink">
                    <span>Saliva pH</span>
                    <input name="salivaPh" type="number" step="0.01" inputMode="decimal" placeholder="7.1" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-lg font-mono text-ink outline-none focus:border-teal-500 transition" />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2 lg:col-span-1">
                    <span>Urea</span>
                    <input name="ureaLevel" type="number" min="15" max="40" step="0.1" inputMode="decimal" placeholder="20" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-lg font-mono text-ink outline-none focus:border-teal-500 transition" />
                  </label>
                </div>
              </div>

              <label className="grid gap-3 rounded-[1.75rem] border border-ink/10 bg-sand p-6 text-sm font-medium text-ink">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Trainer notes</span>
                <input
                  name="trainingSession"
                  placeholder="Training session summary"
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none focus:border-teal-500"
                />
                <input
                  name="horseAttitude"
                  placeholder="Horse attitude"
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none focus:border-teal-500"
                />
                <input
                  name="jockeyComments"
                  placeholder="Jockey comments"
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none focus:border-teal-500"
                />
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Voice dictate or type additional context here..."
                  className="rounded-[1.5rem] border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none focus:border-teal-500"
                />
              </label>

              {/* Sticky bottom submit on mobile, normal on desktop */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur py-4 border-t border-ink/10 sm:static sm:bg-transparent sm:backdrop-blur-none sm:py-0 sm:border-0 mt-2">
                <button 
                  type="submit" 
                  onClick={() => {
                    // Small delay to allow form to submit before fully destroying modal visually if optimistic
                    setTimeout(() => setIsOpen(false), 300);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-teal-700 transition transform hover:scale-[1.01] active:scale-[0.98]"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit Test Results
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
