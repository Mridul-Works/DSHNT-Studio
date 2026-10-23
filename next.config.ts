import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photos come from picsum.photos. Once Dishant's own photos
    // live in /public/work, these entries can be removed.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
