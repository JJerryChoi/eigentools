"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  let output = "";
  let error = "";

  if (input) {
    try {
      output = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch (e) {
      error = e instanceof Error ? e.message : "Invalid input";
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${mode === "encode" ? "bg-zinc-600 text-white" : "bg-zinc-700 hover:bg-zinc-600"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${mode === "decode" ? "bg-zinc-600 text-white" : "bg-zinc-700 hover:bg-zinc-600"}`}
        >
          Decode
        </button>
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter URL to encode..." : "Enter encoded URL to decode..."}
            className="w-full h-48 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-zinc-500">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-48 p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400">{error}</div>
          ) : (
            <pre className="w-full h-48 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto whitespace-pre-wrap break-all">{output}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
