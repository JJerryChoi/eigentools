"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);
  const [count, setCount] = useState(1);

  function generate() {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
  }

  const allText = uuids.join("\n");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button onClick={generate} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Generate</button>
        <label className="text-xs text-zinc-500">Count:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          className="w-16 px-2 py-1.5 text-xs bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-500"
        />
        <CopyButton text={allText} />
      </div>

      <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-auto">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <span className="text-zinc-400 select-all">{uuid}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
