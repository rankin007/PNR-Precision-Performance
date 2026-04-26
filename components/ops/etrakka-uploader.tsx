"use client";

import { useState } from "react";
import { importEtrakkaSession, type EtrakkaImportPayload } from "@/lib/actions/etrakka";

export function EtrakkaUploader() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  // Helper to convert "Saturday, April 25, 2026" and "08:03" into a valid ISO string
  const parseDateTime = (dateStr: string, timeStr: string) => {
    try {
      // Strips day of week "Saturday," -> "April 25, 2026"
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
      // Since CSVs can be messy, we extract cleanly using Regex over the raw text file
      
      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      
      // 1. Look for the top row format: "Dancing Man Saturday, April 25, 2026 (Mary Bray)"
      // Alternatively, we use flexible regex matches anywhere in the file.
      
      // Fallback object
      const data: Partial<EtrakkaImportPayload> = {
        temperatureC: null, humidityPercentage: null,
        work1_200mTime: null, work1_400mTime: null,
        work2_200mTime: null, work2_400mTime: null,
        hrMaxBpm: null, trotMeanHrBpm: null, canterMeanHrBpm: null,
        vmaxKph: null, gallopMetres: null, recoveryAvgHr2_5minBpm: null
      };

      // Best effort text parse:
      const nameMatch = text.match(/^([a-zA-Z\s]+)\s+(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
      if (nameMatch) data.horseName = nameMatch[1].trim();
      
      const trackMatch = text.match(/(Goulburn|Randwick|Rosehill)/i); // Adjust your typical track names
      if (trackMatch) data.track = trackMatch[1];
      
      const tempMatch = text.match(/Temp\s*(\d+)C/i);
      if (tempMatch) data.temperatureC = parseFloat(tempMatch[1]);
      
      const humMatch = text.match(/Humidity\s*(\d+)%/i);
      if (humMatch) data.humidityPercentage = parseFloat(humMatch[1]);
      
      const hrMaxMatch = text.match(/HR Max[,\s]+(\d+)/i);
      if (hrMaxMatch) data.hrMaxBpm = parseFloat(hrMaxMatch[1]);
      
      const canterMatch = text.match(/Canter Mean HR[,\s]+(\d+)/i);
      if (canterMatch) data.canterMeanHrBpm = parseFloat(canterMatch[1]);
      
      const vmaxMatch = text.match(/Vmax[,\s]+([\d.]+)/i);
      if (vmaxMatch) data.vmaxKph = parseFloat(vmaxMatch[1]);

      const recoveryMatch = text.match(/AvgHR2_5min[,\s]+(\d+)/i);
      if (recoveryMatch) data.recoveryAvgHr2_5minBpm = parseFloat(recoveryMatch[1]);

      // Example checking split rows (this looks for line starting with 1 or 2, then picking numbers)
      const split1 = text.match(/1[,\s]+Best Time[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
      if (split1) {
        data.work1_200mTime = parseFloat(split1[1]);
        data.work1_400mTime = parseFloat(split1[2]);
      }
      const split2 = text.match(/2[,\s]+Best Time[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
      if (split2) {
        data.work2_200mTime = parseFloat(split2[1]);
        data.work2_400mTime = parseFloat(split2[2]);
      }

      // Hardcode missing values as a fallback if regex fails
      if (!data.horseName) {
         // Ask user to fix format if completely unrecognized
         setMessage({ text: "Could not auto-detect Horse Name from the file. Please check the format.", type: "error" });
         setLoading(false);
         return;
      }

      // Finalize ISO Date
      data.sessionDateIso = parseDateTime(
        text.match(/[a-zA-Z]+,\s*[a-zA-Z]+\s*\d{1,2},\s*\d{4}/)?.[0] || "",
        text.match(/\b([0-1]?[0-9]|2[0-3]):([0-5][0-9])\b/)?.[0] || ""
      );

      // Call Server Action
      const result = await importEtrakkaSession(data as EtrakkaImportPayload);
      
      if (result.success) {
        setMessage({ text: `Successfully imported E-Trakka session for ${data.horseName}!`, type: "success" });
      } else {
        setMessage({ text: result.error || "Failed to upload", type: "error" });
      }

    } catch (err: any) {
      console.error(err);
      setMessage({ text: "Error parsing the CSV file. Please ensure it's a valid eTrakka text/CSV document.", type: "error" });
    } finally {
      setLoading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 mt-6 max-w-xl">
      <h3 className="text-lg font-medium text-slate-900 mb-2">Import E-Trakka CSV</h3>
      <p className="text-sm text-slate-500 mb-6">
        Upload the raw E-Trakka Export file here. We will auto-detect the horse, track variables, and splits to link against Biochemistry results.
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
            <p className="text-xs text-slate-400">CSV, TXT exports</p>
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
