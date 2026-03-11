import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
