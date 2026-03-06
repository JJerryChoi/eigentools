"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { CopyButton } from "@/components/copy-button";

export function YamlJsonConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");

  let output = "";
  let error = "";

  if (input.trim()) {
    try {
      if (mode === "yaml-to-json") {
        const parsed = yaml.load(input);
        output = JSON.stringify(parsed, null, 2);
      } else {
        const parsed = JSON.parse(input);
        output = yaml.dump(parsed, { indent: 2, lineWidth: -1 });
      }
    } catch (e) {
      error = e instanceof Error ? e.message : "Invalid input";
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("yaml-to-json"); setInput(""); }}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${mode === "yaml-to-json" ? "bg-zinc-600 text-white" : "bg-zinc-700 hover:bg-zinc-600"}`}
        >
          YAML to JSON
        </button>
        <button
          onClick={() => { setMode("json-to-yaml"); setInput(""); }}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${mode === "json-to-yaml" ? "bg-zinc-600 text-white" : "bg-zinc-700 hover:bg-zinc-600"}`}
        >
          JSON to YAML
        </button>
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">
            {mode === "yaml-to-json" ? "YAML Input" : "JSON Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "yaml-to-json" ? "Paste YAML here..." : "Paste JSON here..."}
            className="w-full h-64 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-zinc-500">
              {mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
            </label>
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
