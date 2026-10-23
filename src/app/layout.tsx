import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk, IBM_Plex_Mono, Permanent_Marker } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./sections.css";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-display", adjustFontFallback: false });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const pencil = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-pencil" });

export const metadata: Metadata = {
  title: "DSHNT Studio · Photography by Dishant",
  description:
    "Portrait, creative, nature and commercial photography by Dishant. See the work and book a shoot with DSHNT Studio.",
  openGraph: {
    title: "DSHNT Studio · Photography by Dishant",
    description: "My first salary bought a camera. The rest is history.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0f10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${pencil.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
