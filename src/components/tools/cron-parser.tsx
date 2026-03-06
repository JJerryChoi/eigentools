"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/copy-button";

const FIELD_NAMES = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"] as const;
const FIELD_RANGES: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseField(field: string, min: number, max: number): number[] | null {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    const step = stepMatch ? parseInt(stepMatch[2]) : 1;
    const range = stepMatch ? stepMatch[1] : part;

    if (range === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes("-")) {
      const [a, b] = range.split("-").map(Number);
      if (isNaN(a) || isNaN(b) || a < min || b > max) return null;
      for (let i = a; i <= b; i += step) values.add(i);
    } else {
      const n = parseInt(range);
      if (isNaN(n) || n < min || n > max) return null;
      values.add(n);
    }
  }
  return [...values].sort((a, b) => a - b);
}

function describeField(values: number[], fieldIndex: number): string {
  const [min, max] = FIELD_RANGES[fieldIndex];
  if (values.length === max - min + 1) return `every ${FIELD_NAMES[fieldIndex].toLowerCase()}`;
  if (fieldIndex === 3) return values.map((v) => MONTH_NAMES[v]).join(", ");
  if (fieldIndex === 4) return values.map((v) => DAY_NAMES[v]).join(", ");
  return values.join(", ");
}

function describeCron(fields: number[][]): string {
  const parts: string[] = [];
  const [mins, hours, doms, months, dows] = fields;

  // Minutes
  if (mins.length === 60) parts.push("Every minute");
  else if (mins.length === 1 && mins[0] === 0) parts.push("At the start of the hour");
  else parts.push(`At minute ${mins.join(", ")}`);

  // Hours
  if (hours.length < 24) {
    parts.push(`past hour ${hours.map((h) => h.toString().padStart(2, "0")).join(", ")}`);
  }

  // Day of month
  if (doms.length < 31) parts.push(`on day ${doms.join(", ")} of the month`);

  // Month
  if (months.length < 12) parts.push(`in ${describeField(months, 3)}`);

  // Day of week
  if (dows.length < 7) parts.push(`on ${describeField(dows, 4)}`);

  return parts.join(" ");
}

function getNextRuns(fields: number[][], count: number): Date[] {
  const [mins, hours, doms, months, dows] = fields;
  const runs: Date[] = [];
  const now = new Date();
  const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);

  let safety = 0;
  while (runs.length < count && safety < 525600) {
    const m = candidate.getMonth() + 1;
    const d = candidate.getDate();
    const dow = candidate.getDay();
    const h = candidate.getHours();
    const min = candidate.getMinutes();

    if (months.includes(m) && doms.includes(d) && dows.includes(dow) && hours.includes(h) && mins.includes(min)) {
      runs.push(new Date(candidate));
    }
    candidate.setMinutes(candidate.getMinutes() + 1);
    safety++;
  }
  return runs;
}

const PRESETS: [string, string][] = [
  ["* * * * *", "Every minute"],
  ["0 * * * *", "Every hour"],
  ["0 0 * * *", "Every day at midnight"],
  ["0 0 * * 1", "Every Monday at midnight"],
  ["0 0 1 * *", "First day of every month"],
  ["*/5 * * * *", "Every 5 minutes"],
];

export function CronParser() {
  const [input, setInput] = useState("*/15 9-17 * * 1-5");

  const result = useMemo(() => {
    const parts = input.trim().split(/\s+/);
    if (parts.length !== 5) return { error: "Cron expression must have exactly 5 fields" };

    const fields: number[][] = [];
    for (let i = 0; i < 5; i++) {
      const parsed = parseField(parts[i], FIELD_RANGES[i][0], FIELD_RANGES[i][1]);
      if (!parsed) return { error: `Invalid ${FIELD_NAMES[i].toLowerCase()} field: ${parts[i]}` };
      fields.push(parsed);
    }

    return {
      description: describeCron(fields),
      fields: fields.map((f, i) => ({ name: FIELD_NAMES[i], value: parts[i], expanded: describeField(f, i) })),
      nextRuns: getNextRuns(fields, 5),
    };
  }, [input]);

  const descriptionText = "error" in result ? "" : result.description;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
        {PRESETS.map(([expr, label]) => (
          <button
            key={expr}
            onClick={() => setInput(expr)}
            className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
            title={label}
          >
            {expr}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs text-zinc-500 mb-1">Cron Expression (5 fields: min hour dom month dow)</label>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="*/15 9-17 * * 1-5"
            className="flex-1 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
          {descriptionText && <CopyButton text={descriptionText} />}
        </div>
      </div>

      {"error" in result ? (
        <div className="p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400">{result.error}</div>
      ) : (
        <>
          <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
            <div className="text-sm text-zinc-300">{result.description}</div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {result.fields.map((f) => (
              <div key={f.name} className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-center">
                <div className="text-xs text-zinc-500 mb-1">{f.name}</div>
                <div className="font-mono text-sm text-white">{f.value}</div>
                <div className="text-xs text-zinc-400 mt-1 truncate" title={f.expanded}>{f.expanded}</div>
              </div>
            ))}
          </div>

          {result.nextRuns.length > 0 && (
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Next 5 Runs</label>
              <div className="space-y-1">
                {result.nextRuns.map((date, i) => (
                  <div key={i} className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-xs flex justify-between">
                    <span className="text-zinc-500">#{i + 1}</span>
                    <span>{date.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
