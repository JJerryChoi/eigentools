"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/copy-button";

function parseCSV(csv: string): { headers: string[]; rows: string[][] } {
  const lines = csv.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
        else if (ch === '"') inQuotes = false;
        else current += ch;
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === ",") { result.push(current.trim()); current = ""; }
        else current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows };
}

export function CsvToJson() {
  const [input, setInput] = useState("");

  const { output, error, rowCount } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "", rowCount: 0 };
    try {
      const { headers, rows } = parseCSV(input);
      if (headers.length === 0) return { output: "", error: "No data found", rowCount: 0 };
      const json = rows.map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => { obj[h] = row[i] || ""; });
        return obj;
      });
      return { output: JSON.stringify(json, null, 2), error: "", rowCount: json.length };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Parse error", rowCount: 0 };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
        <button
          onClick={() => setInput('name,email,role\n"John Doe",john@example.com,admin\n"Jane Smith",jane@example.com,user')}
          className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
        >
          Load Sample
        </button>
        {rowCount > 0 && <span className="text-xs text-zinc-500">{rowCount} row{rowCount !== 1 ? "s" : ""} parsed</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">CSV Input (first row = headers)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"name,email,role\nJohn,john@example.com,admin"}
            className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-zinc-500">JSON Output</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-64 p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400 overflow-auto">{error}</div>
          ) : (
            <pre className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto whitespace-pre-wrap">{output}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
