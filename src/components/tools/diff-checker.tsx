"use client";

import { useState, useMemo } from "react";
import { diffLines } from "diff";

export function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const changes = useMemo(() => {
    if (!original && !modified) return [];
    return diffLines(original, modified);
  }, [original, modified]);

  const stats = useMemo(() => {
    let added = 0, removed = 0;
    for (const c of changes) {
      const lines = c.value.split("\n").filter(Boolean).length;
      if (c.added) added += lines;
      else if (c.removed) removed += lines;
    }
    return { added, removed };
  }, [changes]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => { setOriginal(""); setModified(""); }} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
        {(original || modified) && (
          <span className="flex items-center gap-2 text-xs">
            <span className="text-green-400">+{stats.added}</span>
            <span className="text-red-400">-{stats.removed}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Original</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text..."
            className="w-full h-48 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Modified</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text..."
            className="w-full h-48 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
      </div>

      {changes.length > 0 && (original || modified) && (
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Diff Output</label>
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-auto max-h-96 font-mono text-sm">
            {changes.map((change, i) => {
              const lines = change.value.split("\n");
              if (lines[lines.length - 1] === "") lines.pop();
              return lines.map((line, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`px-3 py-0.5 whitespace-pre-wrap break-all ${
                    change.added
                      ? "bg-green-500/10 text-green-300"
                      : change.removed
                        ? "bg-red-500/10 text-red-300"
                        : "text-zinc-400"
                  }`}
                >
                  <span className="select-none mr-2 text-zinc-600">
                    {change.added ? "+" : change.removed ? "-" : " "}
                  </span>
                  {line}
                </div>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
}
