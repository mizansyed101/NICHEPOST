import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import { NextAuthProvider } from "@/components/Providers";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "NichePost AI | Automate Your Niche Presence",
  description: "Generate and schedule high-quality niche social media posts with AI. No complex API keys required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#0a0a0f] text-white selection:bg-purple-500/30`}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10">
          <NextAuthProvider>
            {children}
            <script src="https://sdk.cashfree.com/js/v3/cashfree.js" async />
          </NextAuthProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
