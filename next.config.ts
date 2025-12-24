import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    domains: ["image.tmdb.org"],
  },
  async rewrites() {
    return [
      {
        source: "/api/tmdb/:path*",
        destination: "https://api.themoviedb.org/3/:path*",
      },
    ]
  },

};

export default nextConfig;
