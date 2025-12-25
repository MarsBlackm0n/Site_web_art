import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "musical-space-doodle-7gpqg6w4xj5hr75j-1337.app.github.dev",
      },
      {
        protocol: "https",
        hostname: "processoverresult-cms-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
