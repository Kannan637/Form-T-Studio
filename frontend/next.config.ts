import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type checking is done locally via `tsc --noEmit`.
    // Skipping during build to avoid Vercel TS version mismatches.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
