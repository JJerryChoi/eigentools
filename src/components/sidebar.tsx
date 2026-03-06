"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { tools } from "@/lib/tools";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-zinc-800 p-2 rounded-lg"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/"
          className="p-4 border-b border-zinc-800 flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-lg font-bold text-white">EigenTools</span>
        </Link>

        <nav className="flex-1 overflow-y-auto p-2">
          <p className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Tools
          </p>
          {tools.map((tool) => {
            const href = `/tools/${tool.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={tool.slug}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
              >
                <span className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {tool.icon}
                </span>
                {tool.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <kbd className="text-xs text-zinc-500">
            <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
              Cmd+K
            </span>{" "}
            to search tools
          </kbd>
        </div>
      </aside>
    </>
  );
}
