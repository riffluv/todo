import initializeBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = initializeBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = withBundleAnalyzer({
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
});

export default nextConfig;
