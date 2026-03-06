import { tools } from "@/lib/tools";

export function ToolHeader({ slug }: { slug: string }) {
  const tool = tools.find((t) => t.slug === slug)!;
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-mono font-bold">
          {tool.icon}
        </span>
        <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
      </div>
      <p className="text-zinc-400 text-sm">{tool.description}</p>
    </div>
  );
}
