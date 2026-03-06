import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { ToolRenderer } from "@/components/tool-renderer";

interface Props {
  params: Promise<{ tool: string }>;
}

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { tool: slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { tool: slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-mono font-bold">
            {tool.icon}
          </span>
          <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
        </div>
        <p className="text-zinc-400 text-sm">{tool.description}</p>
      </div>

      <ToolRenderer slug={slug} />
    </div>
  );
}
