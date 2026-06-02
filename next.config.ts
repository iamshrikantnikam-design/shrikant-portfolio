import type { NextConfig } from "next";

// Allow dev access from common LAN IP ranges. Next.js 16 blocks
// cross-origin requests to dev resources (HMR, etc.) by default,
// so list any hostnames you want to open the dev server from on
// another device on the same Wi-Fi.
const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.0/16",
    "10.0.0.0/8",
    "172.16.0.0/12",
  ],
};

export default nextConfig;
