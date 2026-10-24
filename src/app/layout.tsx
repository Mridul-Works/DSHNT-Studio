import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

// Link previews need absolute image URLs. Set NEXT_PUBLIC_SITE_URL to the live
// domain; on Vercel the deployment URL is used automatically if it's unset.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// The share image itself is src/app/opengraph-image.jpg (+ twitter-image.jpg):
// a 1200x630 card built from Dishant's portrait. Next adds it to every page.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DSHNT Studio · Photography by Dishant",
  description:
    "Portrait, creative, nature and commercial photography by Dishant. See the work and book a shoot with DSHNT Studio.",
  openGraph: {
    title: "DSHNT Studio · Photography by Dishant",
    description: "Every frame, from the heart.",
    siteName: "DSHNT Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSHNT Studio · Photography by Dishant",
    description: "Every frame, from the heart.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
