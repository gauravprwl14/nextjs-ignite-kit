import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  // Nextra 4 options
  defaultShowCopyCode: true,
});

const nextConfig: NextConfig = {
  output: "standalone",

  /**
   * Configure image domains and optimization settings
   * Note: Instrumentation is automatically enabled when src/instrumentation.ts exists
   * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
   */
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
};

export default withNextra(nextConfig);
