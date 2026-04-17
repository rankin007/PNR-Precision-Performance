import type { NextConfig } from "next";

const isVercelBuild = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  ...(isVercelBuild ? {} : { distDir: "build" }),
  reactStrictMode: true,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
