import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  // Nextra 4 options
  defaultShowCopyCode: true,
});



const nextConfig: NextConfig = {
  output: 'standalone',
};

export default withNextra(nextConfig);
