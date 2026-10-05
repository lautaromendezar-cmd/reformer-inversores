import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
  },
  async headers() {
    // Bajo NDA: mientras NEXT_PUBLIC_ALLOW_INDEXING no sea "true", cada respuesta lleva noindex
    // (además del meta robots y del robots.txt). Cubre PDFs, imágenes y lo que no tenga <head>.
    const indexar = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
    return [
      ...(indexar ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
};

export default nextConfig;
