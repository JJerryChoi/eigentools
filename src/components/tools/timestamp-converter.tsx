"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");

  const now = Math.floor(Date.now() / 1000);

  // Timestamp -> Date
  let tsDate = "";
  let tsError = "";
  if (timestamp.trim()) {
    const num = Number(timestamp);
    if (isNaN(num)) {
      tsError = "Invalid timestamp";
    } else {
      // Auto-detect seconds vs milliseconds
      const ms = num > 1e12 ? num : num * 1000;
      tsDate = new Date(ms).toISOString();
    }
  }

  // Date -> Timestamp
  let dateTs = "";
  let dateError = "";
  if (dateStr.trim()) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      dateError = "Invalid date";
    } else {
      dateTs = String(Math.floor(d.getTime() / 1000));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setTimestamp(String(now))}
          className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
        >
          Use Current Time
        </button>
        <button
          onClick={() => { setTimestamp(""); setDateStr(""); }}
          className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm">
        <span className="text-zinc-500">Current Unix time: </span>
        <span className="font-mono text-zinc-300">{now}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs text-zinc-500">Unix Timestamp</label>
          <input
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g. 1700000000"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm focus:outline-none focus:border-zinc-500"
          />
          {tsError ? (
            <div className="p-3 bg-zinc-900 border border-red-800 rounded-lg text-sm text-red-400">{tsError}</div>
          ) : tsDate ? (
            <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-green-400">{tsDate}</span>
                <CopyButton text={tsDate} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {new Date(tsDate).toLocaleString()}
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-zinc-500">Date String</label>
          <input
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            placeholder="e.g. 2024-01-15T12:00:00Z"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm focus:outline-none focus:border-zinc-500"
          />
          {dateError ? (
            <div className="p-3 bg-zinc-900 border border-red-800 rounded-lg text-sm text-red-400">{dateError}</div>
          ) : dateTs ? (
            <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-green-400">{dateTs}</span>
                <CopyButton text={dateTs} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
