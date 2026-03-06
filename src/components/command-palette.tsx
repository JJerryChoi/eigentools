"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/lib/tools";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      inputRef.current?.focus();
    }
  }, [open]);

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
  );

  function navigate(slug: string) {
    setOpen(false);
    router.push(`/tools/${slug}`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full px-4 py-3 bg-transparent text-zinc-100 placeholder-zinc-500 outline-none border-b border-zinc-700"
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered.length > 0) {
              navigate(filtered[0].slug);
            }
          }}
        />
        <ul className="max-h-64 overflow-y-auto p-2">
          {filtered.map((tool) => (
            <li key={tool.slug}>
              <button
                onClick={() => navigate(tool.slug)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {tool.icon}
                </span>
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-xs text-zinc-500">{tool.description}</p>
                </div>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-zinc-500">
              No tools found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
