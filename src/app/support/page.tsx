import type { Metadata } from "next";
import { SupportContent } from "./support-content";

export const metadata: Metadata = {
  title: "Support EigenTools - Donate with ETH",
  description:
    "EigenTools is free and open source. Support ongoing development with an ETH donation.",
  openGraph: {
    title: "Support EigenTools - Donate with ETH",
    description:
      "EigenTools is free and open source. Support ongoing development with an ETH donation.",
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
          consider supporting development with an ETH donation.
        </p>
      </div>

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
