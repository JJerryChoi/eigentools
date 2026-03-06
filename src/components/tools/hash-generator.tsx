"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/copy-button";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function computeHash(algorithm: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }
    let cancelled = false;
    Promise.all(
      ALGORITHMS.map(async (algo) => {
        const hash = await computeHash(algo, input);
        return [algo, hash] as const;
      })
    ).then((results) => {
      if (!cancelled) {
        setHashes(Object.fromEntries(results));
      }
    });
    return () => { cancelled = true; };
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
      </div>

      <div>
        <label className="block text-xs text-zinc-500 mb-1">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
          spellCheck={false}
        />
      </div>

      <div className="space-y-3">
        {ALGORITHMS.map((algo) => (
          <div key={algo} className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-zinc-400">{algo}</label>
              {hashes[algo] && <CopyButton text={hashes[algo]} />}
            </div>
            <p className="font-mono text-sm text-zinc-300 break-all">
              {hashes[algo] || <span className="text-zinc-600">—</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
