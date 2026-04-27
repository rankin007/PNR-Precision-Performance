"use client";

import { useState } from "react";
import { importEtrakkaSession, type EtrakkaImportPayload } from "@/lib/actions/etrakka";

export function EtrakkaUploader({ horseId, horseName }: { horseId: string; horseName: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const parseDateTime = (dateStr: string, timeStr: string) => {
    try {
      const cleanDate = dateStr.replace(/^[a-zA-Z]+,\s*/, "").trim(); 
      const d = new Date(`${cleanDate} ${timeStr}`);
      return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    } catch {
      return new Date().toISOString(); 
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      const text = await file.text();
      // Remove quotes and carriage returns, then split by lines
      const cleanText = text.replace(/'/g, "").replace(/"/g, "").replace(/\r/g, "");
      const lines = cleanText.split("\n").map(l => l.trim()).filter(Boolean);

      const data: Partial<EtrakkaImportPayload> = {
        horseId, // Direct context insertion
        bt200: null, bt400: null, bt600: null, bt800: null, bt1000: null,
        s200: null, s400: null, s600: null, s800: null, s1000: null,
        hrMaxBpm: null, hr45: null, trotMeanHrBpm: null, canterMeanHrBpm: null, gallopMeanHrBpm: null,
        vmaxKph: null, v200: null, sl50: null, gallopOver60kph: null, secsOver60kph: null,
        recoveryAvgHr2_5minBpm: null, gallopMetres: null,
        note: null, trackName: "", etrakkaDevice: "", sessionType: "", riderName: ""
      };

      let sessionDateRaw = "";
      let sessionTimeRaw = "";

      // Smart Parser: Handles either vertical keys ("Track Name, Goulburn") OR horizontal table arrays
      // Look for the "Date" header to determine if it's horizontal
      const headerLineIndex = lines.findIndex(l => l.toLowerCase().includes("track name") || l.toLowerCase().includes("session type"));
      
      if (headerLineIndex !== -1 && lines[headerLineIndex + 1]) {
        // Appears to be horizontal CSV. Parse exactly via columns.
        const headers = lines[headerLineIndex].split(",").map(h => h.trim().toLowerCase());
        const rowData = lines[headerLineIndex + 1].split(",").map(c => c.trim());
        
        const getValue = (keyAliases: string[]) => {
          const idx = headers.findIndex(h => keyAliases.some(alias => h === alias || h.includes(alias)));
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
        
        // Exact matches needed so we don't accidentally pull bt200 for 200
        const getExactNum = (exactHeader: string) => {
          const idx = headers.findIndex(h => h === exactHeader);
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
        // Fallback Vertical Parser
        lines.forEach(line => {
          const parts = line.split(",").map(p => p.trim());
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
        setMessage({ text: `Successfully imported E-Trakka session for ${horseName}!`, type: "success" });
      } else {
        setMessage({ text: result.error || "Failed to upload", type: "error" });
      }

    } catch (err: unknown) {
      console.error(err);
      setMessage({ text: "Error parsing the CSV file. Please ensure it's a valid eTrakka text/CSV document.", type: "error" });
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 mt-6 max-w-xl">
      <h3 className="text-lg font-medium text-slate-900 mb-2">Import E-Trakka CSV</h3>
      <p className="text-sm text-slate-500 mb-6">
        Upload the E-Trakka CSV file here. The data will be automatically assigned and locked to <strong>{horseName}</strong>.
      </p>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-slate-500">
              <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400">CSV export file</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept=".csv,.txt"
            onChange={handleFileUpload}
            disabled={loading}
          />
        </label>

        {loading && (
          <div className="text-sm text-slate-600 flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Parsing & Uploading...
          </div>
        )}

        {message && (
          <div className={`p-3 rounded text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-700'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
