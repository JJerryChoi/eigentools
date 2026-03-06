"use client";

import { useState, useMemo } from "react";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const results: { match: string; index: number; groups: Record<string, string> }[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((m = regex.exec(testString)) !== null) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.groups ? { ...m.groups } : {},
          });
          if (m[0] === "") regex.lastIndex++;
        }
      } else {
        m = regex.exec(testString);
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.groups ? { ...m.groups } : {},
          });
        }
      }
      return { matches: results, error: "" };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, testString]);

  const highlighted = useMemo(() => {
    if (!pattern || !testString || error) return null;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; highlight: boolean }[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;

      while ((m = regex.exec(testString)) !== null) {
        if (m.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, m.index), highlight: false });
        }
        parts.push({ text: m[0], highlight: true });
        lastIndex = m.index + m[0].length;
        if (m[0] === "") { regex.lastIndex++; lastIndex++; }
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), highlight: false });
      }
      return parts;
    } catch {
      return null;
    }
  }, [pattern, flags, testString, error]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => { setPattern(""); setTestString(""); }} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Pattern</label>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Flags</label>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-20 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400">{error}</div>
      )}

      <div>
        <label className="block text-xs text-zinc-500 mb-1">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter test string..."
          className="w-full h-32 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
          spellCheck={false}
        />
      </div>

      {highlighted && highlighted.length > 0 && (
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Highlighted Matches</label>
          <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm whitespace-pre-wrap">
            {highlighted.map((part, i) =>
              part.highlight ? (
                <mark key={i} className="bg-yellow-500/30 text-yellow-200 rounded px-0.5">{part.text}</mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div>
          <label className="block text-xs text-zinc-500 mb-1">{matches.length} Match{matches.length !== 1 ? "es" : ""}</label>
          <div className="space-y-1">
            {matches.map((m, i) => (
              <div key={i} className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-xs">
                <span className="text-zinc-500">#{i + 1}</span>{" "}
                <span className="text-green-400">&quot;{m.match}&quot;</span>{" "}
                <span className="text-zinc-500">at index {m.index}</span>
                {Object.keys(m.groups).length > 0 && (
                  <span className="text-blue-400 ml-2">
                    groups: {JSON.stringify(m.groups)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
