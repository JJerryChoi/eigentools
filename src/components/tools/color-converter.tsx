"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/copy-button";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

type Mode = "hex" | "rgb" | "hsl";

export function ColorConverter() {
  const [mode, setMode] = useState<Mode>("hex");
  const [input, setInput] = useState("#3b82f6");

  const result = useMemo(() => {
    try {
      let r: number, g: number, b: number;
      if (mode === "hex") {
        const rgb = hexToRgb(input.trim());
        if (!rgb) return { error: "Invalid hex (e.g. #ff6600)" };
        [r, g, b] = rgb;
      } else if (mode === "rgb") {
        const m = input.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (!m) return { error: "Invalid RGB (e.g. 255, 100, 0)" };
        [r, g, b] = [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
        if ([r, g, b].some((v) => v < 0 || v > 255)) return { error: "RGB values must be 0-255" };
      } else {
        const m = input.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (!m) return { error: "Invalid HSL (e.g. 220, 90, 56)" };
        const [h, s, l] = [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
        if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) return { error: "H: 0-360, S: 0-100, L: 0-100" };
        [r, g, b] = hslToRgb(h, s, l);
      }
      const hex = rgbToHex(r, g, b);
      const [h, s, l] = rgbToHsl(r, g, b);
      return { hex, rgb: `${r}, ${g}, ${b}`, hsl: `${h}, ${s}, ${l}`, r, g, b };
    } catch {
      return { error: "Invalid input" };
    }
  }, [mode, input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["hex", "rgb", "hsl"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(""); }}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors uppercase ${mode === m ? "bg-zinc-600 text-white" : "bg-zinc-700 hover:bg-zinc-600"}`}
          >
            {m}
          </button>
        ))}
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
      </div>

      <div>
        <label className="block text-xs text-zinc-500 mb-1">
          {mode === "hex" ? "Hex Color (e.g. #3b82f6)" : mode === "rgb" ? "RGB (e.g. 59, 130, 246)" : "HSL (e.g. 217, 91, 60)"}
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "hex" ? "#3b82f6" : mode === "rgb" ? "59, 130, 246" : "217, 91, 60"}
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm focus:outline-none focus:border-zinc-500"
          spellCheck={false}
        />
      </div>

      {"error" in result ? (
        <div className="p-3 bg-zinc-900 border border-red-800 rounded-lg font-mono text-sm text-red-400">{result.error}</div>
      ) : (
        <>
          <div
            className="w-full h-24 rounded-lg border border-zinc-700"
            style={{ backgroundColor: result.hex }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {([
              ["HEX", result.hex],
              ["RGB", result.rgb],
              ["HSL", result.hsl],
            ] as const).map(([label, value]) => (
              <div key={label} className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-500">{label}</span>
                  <CopyButton text={label === "HEX" ? value : `${label.toLowerCase()}(${value})`} />
                </div>
                <div className="font-mono text-sm">{value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
