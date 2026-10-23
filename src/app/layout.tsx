import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "DSHNT Studio · Photography by Dishant",
  description:
    "Portrait, creative, nature and commercial photography by Dishant. See the work and book a shoot with DSHNT Studio.",
  openGraph: {
    title: "DSHNT Studio · Photography by Dishant",
    description: "Every frame, from the heart.",
    type: "website",
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
