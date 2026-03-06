"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
