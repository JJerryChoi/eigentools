"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);

  let output = "";
  let error = "";

  if (input.trim()) {
    try {
      const parsed = JSON.parse(input);
      output = JSON.stringify(parsed, null, indent);
    } catch (e) {
      error = e instanceof Error ? e.message : "Invalid JSON";
    }
  }

  function minify() {
    try {
      setInput(JSON.stringify(JSON.parse(input)));
    } catch {}
  }

  function format() {
    try {
      setInput(JSON.stringify(JSON.parse(input), null, indent));
    } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button onClick={format} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Format</button>
        <button onClick={minify} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Minify</button>
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="px-2 py-1.5 text-xs bg-zinc-700 rounded-lg"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={1}>1 tab</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
            className="w-full h-80 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-zinc-500">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-80 p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400 overflow-auto">
              {error}
            </div>
          ) : (
            <pre className="w-full h-80 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto whitespace-pre-wrap">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
