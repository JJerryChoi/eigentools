"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded);
}

interface JwtParts {
  header: string;
  payload: string;
  signature: string;
  expired?: boolean;
  expiresAt?: string;
}

function decodeJwt(token: string): JwtParts {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts");

  const header = JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2);
  const payloadObj = JSON.parse(decodeBase64Url(parts[1]));
  const payload = JSON.stringify(payloadObj, null, 2);

  let expired: boolean | undefined;
  let expiresAt: string | undefined;
  if (payloadObj.exp) {
    const expDate = new Date(payloadObj.exp * 1000);
    expired = expDate < new Date();
    expiresAt = expDate.toISOString();
  }

  return { header, payload, signature: parts[2], expired, expiresAt };
}

export function JwtDecoder() {
  const [input, setInput] = useState("");

  let result: JwtParts | null = null;
  let error = "";

  if (input.trim()) {
    try {
      result = decodeJwt(input);
    } catch (e) {
      error = e instanceof Error ? e.message : "Invalid JWT";
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
      </div>

      <div>
        <label className="block text-xs text-zinc-500 mb-1">JWT Token</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JWT token here..."
          className="w-full h-24 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400">{error}</div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-zinc-500">Header</label>
              <CopyButton text={result.header} />
            </div>
            <pre className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto text-blue-400">{result.header}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-zinc-500">Payload</label>
              <CopyButton text={result.payload} />
            </div>
            <pre className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto text-green-400">{result.payload}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-zinc-500">Signature</label>
              <CopyButton text={result.signature} />
            </div>
            <pre className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm overflow-auto text-yellow-400 break-all">{result.signature}</pre>
          </div>
          {result.expiresAt && (
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Expiration</label>
              <div className={`p-3 bg-zinc-900 border rounded-lg text-sm ${result.expired ? "border-red-800 text-red-400" : "border-green-800 text-green-400"}`}>
                {result.expired ? "Expired" : "Valid"} — {result.expiresAt}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
