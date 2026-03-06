"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  let output = "";
  let error = "";

  if (input) {
    try {
      if (mode === "encode") {
        output = btoa(
          new TextEncoder()
            .encode(input)
            .reduce((s, b) => s + String.fromCharCode(b), "")
        );
      } else {
        const binary = atob(input);
        output = new TextDecoder().decode(
          Uint8Array.from(binary, (c) => c.charCodeAt(0))
        );
      }
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
          <label className="block text-xs text-zinc-500 mb-1">
            {mode === "encode" ? "Plain Text" : "Base64 String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-zinc-500">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full h-64 p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400 overflow-auto">{error}</div>
          ) : (
            <pre className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto whitespace-pre-wrap break-all">{output}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
