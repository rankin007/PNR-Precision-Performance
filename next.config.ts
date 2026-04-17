import type { NextConfig } from "next";

const isVercelBuild = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  ...(isVercelBuild ? {} : { distDir: "build" }),
  reactStrictMode: true,
};

export default nextConfig;
