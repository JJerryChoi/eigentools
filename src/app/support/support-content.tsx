"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const ETH_ADDRESS = "0xd451913DEc56abddA328DeBE412AdfdB6Ba815Ad";

export function SupportContent() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(ETH_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-xl">
          <QRCodeSVG
            value={`ethereum:${ETH_ADDRESS}`}
            size={180}
            level="M"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          ETH Address
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm bg-zinc-800 text-zinc-300 px-3 py-2 rounded-lg font-mono break-all">
            {ETH_ADDRESS}
          </code>
          <button
            onClick={copyAddress}
            className="shrink-0 px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
