import type { Metadata } from "next";
import { SupportContent } from "./support-content";

export const metadata: Metadata = {
  title: "Support EigenTools",
  description:
    "EigenTools is free and open source. Support ongoing development via GitHub Sponsors or ETH donation.",
  openGraph: {
    title: "Support EigenTools",
    description:
      "EigenTools is free and open source. Support ongoing development via GitHub Sponsors or ETH donation.",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Support EigenTools
        </h1>
        <p className="text-zinc-400">
          EigenTools is free and open source. If you find these tools useful,
          consider supporting development.
        </p>
      </div>

      <a
        href="https://github.com/sponsors/JJerryChoi"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 hover:border-pink-500/50 transition-colors"
      >
        <div className="flex items-center gap-3 mb-2">
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-pink-500 fill-current">
            <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.6 20.6 0 0 0 8 13.393a20.6 20.6 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z" />
          </svg>
          <h2 className="text-lg font-semibold text-white">GitHub Sponsors</h2>
        </div>
        <p className="text-sm text-zinc-400">
          Sponsor via GitHub — zero platform fees. GitHub covers all processing costs.
        </p>
      </a>

      <h2 className="text-lg font-semibold text-zinc-300 mb-4">Donate with ETH</h2>
      <SupportContent />

      <div className="mt-10 space-y-4 text-sm text-zinc-500">
        <h2 className="text-lg font-semibold text-zinc-300">
          What donations fund
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Hosting and infrastructure costs</li>
          <li>Development of new developer tools</li>
          <li>Keeping EigenTools ad-free and open source</li>
        </ul>
      </div>
    </div>
  );
}
