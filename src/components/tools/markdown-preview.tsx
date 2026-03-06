"use client";

import { useState, useMemo } from "react";
import { marked } from "marked";
import { CopyButton } from "@/components/copy-button";

const SAMPLE = `# Hello World

This is a **markdown** preview tool with _GitHub-flavored_ markdown support.

## Features

- Live preview
- Code blocks
- Tables

| Feature | Status |
|---------|--------|
| Bold    | Yes    |
| Links   | Yes    |

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Blockquotes work too!

Visit [EigenTools](https://eigentools.vercel.app) for more tools.
`;

export function MarkdownPreview() {
  const [input, setInput] = useState(SAMPLE);

  const html = useMemo(() => {
    try {
      return marked.parse(input, { gfm: true, breaks: true }) as string;
    } catch {
      return "<p>Error parsing markdown</p>";
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInput("")} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Clear</button>
        <button onClick={() => setInput(SAMPLE)} className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors">Load Sample</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1">Markdown Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your markdown here..."
            className="w-full h-96 p-3 bg-zinc-900 border border-zinc-700 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-zinc-500"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-zinc-500">Preview</label>
            <CopyButton text={html} />
          </div>
          <div
            className="w-full h-96 p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm overflow-auto prose prose-invert prose-sm max-w-none
              [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-0
              [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4
              [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3
              [&_p]:mb-2 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2
              [&_li]:mb-1
              [&_code]:bg-zinc-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono
              [&_pre]:bg-zinc-800 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-600 [&_blockquote]:pl-3 [&_blockquote]:text-zinc-400 [&_blockquote]:italic [&_blockquote]:mb-2
              [&_table]:w-full [&_table]:mb-2 [&_th]:border [&_th]:border-zinc-700 [&_th]:p-2 [&_th]:text-left [&_th]:bg-zinc-800
              [&_td]:border [&_td]:border-zinc-700 [&_td]:p-2
              [&_a]:text-blue-400 [&_a]:underline
              [&_hr]:border-zinc-700 [&_hr]:my-4
              [&_img]:max-w-full [&_img]:rounded"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
