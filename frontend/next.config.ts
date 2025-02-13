import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/marketplace',
        permanent: true, // ou false si c'est temporaire
      },
    ];
  },
};

export default nextConfig;
