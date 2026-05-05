"use client";

import { useEffect, useState } from "react";
import { importEtrakkaSession, type EtrakkaImportPayload } from "@/lib/actions/etrakka";

export function EtrakkaUploader({ horseId, horseName }: { horseId: string; horseName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === "#etrakka-import") {
        setIsOpen(true);
      }
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const parseDateTime = (dateStr: string, timeStr: string) => {
    try {
      const cleanDate = dateStr.replace(/^[a-zA-Z]+,\s*/, "").trim();
      const d = new Date(`${cleanDate} ${timeStr}`);
      return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const parseAndImportFile = async (file: File) => {
    setSelectedFileName(file.name);
    setLoading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const cleanText = text.replace(/'/g, "").replace(/"/g, "").replace(/\r/g, "");
      const lines = cleanText.split("\n").map((line) => line.trim()).filter(Boolean);

      const data: Partial<EtrakkaImportPayload> = {
        horseId,
        bt200: null,
        bt400: null,
        bt600: null,
        bt800: null,
        bt1000: null,
        s200: null,
        s400: null,
        s600: null,
        s800: null,
        s1000: null,
        hrMaxBpm: null,
        hr45: null,
        trotMeanHrBpm: null,
        canterMeanHrBpm: null,
        gallopMeanHrBpm: null,
        vmaxKph: null,
        v200: null,
        sl50: null,
        gallopOver60kph: null,
        secsOver60kph: null,
        recoveryAvgHr2_5minBpm: null,
        gallopMetres: null,
        note: null,
        trackName: "",
        etrakkaDevice: "",
        sessionType: "",
        riderName: "",
      };

      let sessionDateRaw = "";
      let sessionTimeRaw = "";

      const headerLineIndex = lines.findIndex(
        (line) => line.toLowerCase().includes("track name") || line.toLowerCase().includes("session type"),
      );

      if (headerLineIndex !== -1 && lines[headerLineIndex + 1]) {
        const headers = lines[headerLineIndex].split(",").map((header) => header.trim().toLowerCase());
        const rowData = lines[headerLineIndex + 1].split(",").map((cell) => cell.trim());

        const getValue = (keyAliases: string[]) => {
          const idx = headers.findIndex((header) => keyAliases.some((alias) => header === alias || header.includes(alias)));
          return idx !== -1 && rowData[idx] ? rowData[idx] : null;
        };

        const getNum = (aliases: string[]) => {
          const val = getValue(aliases);
          if (!val || val === "N/A" || val === "") return null;
          const parsed = parseFloat(val);
          return isNaN(parsed) ? null : parsed;
        };

        sessionDateRaw = getValue(["date"]) || "";
        sessionTimeRaw = getValue(["start time"]) || "";
        data.trackName = getValue(["track name", "track"]) || "";
        data.riderName = getValue(["rider"]) || "";
        data.etrakkaDevice = getValue(["blanket"]) || "";
        data.sessionType = getValue(["session type"]) || "";

        data.bt200 = getNum(["bt200"]);
        data.bt400 = getNum(["bt400"]);
        data.bt600 = getNum(["bt600"]);
        data.bt800 = getNum(["bt800"]);
        data.bt1000 = getNum(["bt1000"]);

        const getExactNum = (exactHeader: string) => {
          const idx = headers.findIndex((header) => header === exactHeader);
          if (idx === -1 || !rowData[idx] || rowData[idx] === "N/A") return null;
          return parseFloat(rowData[idx]) || null;
        };

        data.s200 = getExactNum("200");
        data.s400 = getExactNum("400");
        data.s600 = getExactNum("600");
        data.s800 = getExactNum("800");
        data.s1000 = getExactNum("1000");

        data.hrMaxBpm = getNum(["hr max"]);
        data.hr45 = getNum(["hr 45"]);
        data.trotMeanHrBpm = getNum(["trot mean hr"]);
        data.canterMeanHrBpm = getNum(["canter mean hr"]);
        data.gallopMeanHrBpm = getNum(["gallop mean hr"]);
        data.vmaxKph = getNum(["vmax"]);
        data.v200 = getNum(["v200"]);
        data.sl50 = getNum(["sl 50"]);
        data.gallopOver60kph = getNum(["gallop>60kph"]);
        data.secsOver60kph = getNum(["secs>60kph"]);
        data.recoveryAvgHr2_5minBpm = getNum(["avghr2_5min"]);
        data.gallopMetres = getNum(["gallop metres"]);
        data.note = getValue(["note"]) || null;
      } else {
        lines.forEach((line) => {
          const parts = line.split(",").map((part) => part.trim());
          if (parts.length < 2) return;
          const key = parts[0].toLowerCase();
          const val = parts[1];
          const num = parseFloat(val);

          if (key.includes("date")) sessionDateRaw = val;
          if (key.includes("start time")) sessionTimeRaw = val;
          if (key.includes("track name")) data.trackName = val;
          if (key.includes("rider")) data.riderName = val;
          if (key.includes("blanket")) data.etrakkaDevice = val;
          if (key.includes("session type")) data.sessionType = val;

          if (key === "bt200" && !isNaN(num)) data.bt200 = num;
          if (key === "bt400" && !isNaN(num)) data.bt400 = num;
          if (key === "bt600" && !isNaN(num)) data.bt600 = num;
          if (key === "bt800" && !isNaN(num)) data.bt800 = num;
          if (key === "bt1000" && !isNaN(num)) data.bt1000 = num;

          if (key === "200" && !isNaN(num)) data.s200 = num;
          if (key === "400" && !isNaN(num)) data.s400 = num;
          if (key === "600" && !isNaN(num)) data.s600 = num;
          if (key === "800" && !isNaN(num)) data.s800 = num;
          if (key === "1000" && !isNaN(num)) data.s1000 = num;

          if (key.includes("hr max") && !isNaN(num)) data.hrMaxBpm = num;
          if (key.includes("hr 45") && !isNaN(num)) data.hr45 = num;
          if (key.includes("trot mean hr") && !isNaN(num)) data.trotMeanHrBpm = num;
          if (key.includes("canter mean hr") && !isNaN(num)) data.canterMeanHrBpm = num;
          if (key.includes("gallop mean hr") && !isNaN(num)) data.gallopMeanHrBpm = num;
          if (key === "vmax" && !isNaN(num)) data.vmaxKph = num;
          if (key === "v200" && !isNaN(num)) data.v200 = num;
          if (key === "sl 50" && !isNaN(num)) data.sl50 = num;
          if (key.includes("gallop>60kph") && !isNaN(num)) data.gallopOver60kph = num;
          if (key.includes("secs>60kph") && !isNaN(num)) data.secsOver60kph = num;
          if (key.includes("avghr2_5min") && !isNaN(num)) data.recoveryAvgHr2_5minBpm = num;
          if (key.includes("gallop metres") && !isNaN(num)) data.gallopMetres = num;
          if (key === "note") data.note = val;
        });
      }

      data.sessionDateIso = parseDateTime(sessionDateRaw || new Date().toDateString(), sessionTimeRaw || "12:00");

      const result = await importEtrakkaSession(data as EtrakkaImportPayload);

      if (result.success) {
        setMessage({ text: `Successfully imported E-Trakka session for ${horseName}.`, type: "success" });
      } else {
        setMessage({ text: result.error || "Failed to upload.", type: "error" });
      }
    } catch (error: unknown) {
      console.error(error);
      setMessage({
        text: "Error parsing the CSV file. Please ensure it's a valid E-Trakka text or CSV export.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await parseAndImportFile(file);
    event.target.value = "";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-teal-300 bg-gradient-to-br from-teal-50 via-white to-[#f7efe3] px-6 py-8 text-center shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Performance Import</p>
        <h3 className="mt-3 font-display text-3xl text-ink">Import E-Trakka</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">
          Open the dedicated import panel for a cleaner upload flow, better mobile handling, and faster CSV processing locked to {horseName}.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-6 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          Open Import Panel
        </button>
        <p className="mt-3 text-xs text-steel">Supports `.csv` and `.txt` exports from E-Trakka.</p>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-sand/95 backdrop-blur-sm sm:p-6">
          <div className="flex min-h-full w-full flex-1 flex-col bg-white sm:mx-auto sm:min-h-0 sm:max-w-5xl sm:rounded-[2rem] sm:shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-white/95 px-6 py-4 backdrop-blur sm:rounded-t-[2rem]">
              <div>
                <p className="eyebrow text-teal-600">Performance Import</p>
                <h2 className="mt-1 font-display text-2xl text-ink">E-Trakka Upload</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close E-Trakka upload modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid flex-1 gap-6 overflow-y-auto p-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-6">
                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Import Target</p>
                  <div className="mt-4 rounded-2xl border border-ink/10 bg-white px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">Horse</p>
                    <p className="mt-2 text-2xl font-display text-ink">{horseName}</p>
                    <p className="mt-2 text-sm text-steel">All parsed performance data will be attached directly to this horse record.</p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">What&apos;s Improved</p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Full-screen import panel for easier mobile use</div>
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Drag-and-drop support with clearer upload state</div>
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Automatic opening from the existing workspace import link</div>
                    <div className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink">Escape-to-close and stronger success or failure feedback</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-[1.75rem] border-2 border-teal-500/20 bg-teal-50/10 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Upload File</p>
                  <label
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragActive(true);
                    }}
                    onDragLeave={() => setIsDragActive(false)}
                    onDrop={(event) => {
                      event.preventDefault();
                      setIsDragActive(false);
                      const file = event.dataTransfer.files?.[0];
                      if (file && !loading) {
                        void parseAndImportFile(file);
                      }
                    }}
                    className={`mt-5 flex min-h-[18rem] cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed px-6 py-8 text-center transition ${
                      isDragActive
                        ? "border-teal-500 bg-teal-50"
                        : "border-slate-300 bg-white hover:border-teal-400 hover:bg-slate-50"
                    } ${loading ? "pointer-events-none opacity-70" : ""}`}
                  >
                    <div className="rounded-full bg-teal-100 p-4 text-teal-700">
                      <svg className="h-8 w-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    </div>
                    <p className="mt-5 text-base font-semibold text-ink">
                      {loading ? "Parsing and importing file..." : "Click to upload or drag and drop"}
                    </p>
                    <p className="mt-2 text-sm text-steel">Use an E-Trakka CSV or TXT export with track, session, split, and heart-rate fields.</p>
                    <p className="mt-4 rounded-full bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                      {selectedFileName || "No file selected yet"}
                    </p>
                    <input type="file" className="hidden" accept=".csv,.txt" onChange={handleFileUpload} disabled={loading} />
                  </label>
                </div>

                {loading ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-4 text-sm font-medium text-teal-800">
                    <svg className="h-5 w-5 animate-spin text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importing performance session into the horse workspace.
                  </div>
                ) : null}

                {message ? (
                  <div
                    className={`rounded-2xl border px-4 py-4 text-sm font-medium ${
                      message.type === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-teal-200 bg-teal-50 text-teal-700"
                    }`}
                  >
                    {message.text}
                  </div>
                ) : null}

                <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Import Notes</p>
                  <div className="mt-4 grid gap-3 text-sm text-steel">
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">Horizontal and vertical E-Trakka export formats are both supported.</p>
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">Unknown or missing numeric fields are safely stored as blank values.</p>
                    <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3">Session date and time are merged automatically before the upload is saved.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-ink/10 bg-white/95 px-6 py-4 backdrop-blur sm:rounded-b-[2rem]">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
