import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["stripe"],
  agentRules: false,
  // Preview and browser tools hit 127.0.0.1; without this, Next blocks /_next/hmr
  // as cross-origin and the storefront never hydrates (dead Add to bag clicks).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
