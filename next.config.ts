import initializeBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = initializeBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = withBundleAnalyzer({
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
});

export default nextConfig;
