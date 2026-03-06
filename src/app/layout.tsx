import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { CommandPalette } from "@/components/command-palette";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  title: "EigenTools - Free Online Developer Utilities",
  description:
    "Fast, free, client-side developer tools. JSON formatter, Base64 encoder, JWT decoder, UUID generator, hash generator, regex tester, and more. No data leaves your browser.",
  openGraph: {
    title: "EigenTools - Free Online Developer Utilities",
    description:
      "Fast, free, client-side developer tools. JSON formatter, Base64 encoder, JWT decoder, and more. No data leaves your browser.",
    type: "website",
    siteName: "EigenTools",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "IbPeO-g-IeAWlPUBKST_UFTmxiLDflhsX6qqPiqZBGk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex">
        <JsonLd />
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-auto">{children}</main>
        <CommandPalette />
      </body>
    </html>
  );
}
