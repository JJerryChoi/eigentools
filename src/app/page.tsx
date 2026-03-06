import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">EigenTools</h1>
        <p className="text-zinc-400">
          Fast, free, client-side developer utilities. No data leaves your
          browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/80 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center text-sm font-mono font-bold mb-3 transition-colors">
              {tool.icon}
            </div>
            <h2 className="font-semibold text-white mb-1">{tool.name}</h2>
            <p className="text-sm text-zinc-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
