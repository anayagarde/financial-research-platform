import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // TODO(phase-9): experimental webpack config or route handlers for WebSocket proxy if needed
};

export default nextConfig;
