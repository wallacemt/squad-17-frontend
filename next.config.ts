import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.NEXT_PUBLIC_URL || "localhost:3000", "192.168.248.200"],

  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31_536_000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
