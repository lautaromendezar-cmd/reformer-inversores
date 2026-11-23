import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Hasta 3840 para pantallas grandes y retina; calidad 85 (la 75 por defecto se veía blanda)
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560, 3840],
    qualities: [85],
  },
  // Las páginas del sitio anterior (7 páginas, hasta el 14-oct-2026) llevan a su bloque de la
  // landing. Temporales (307): si el cliente vuelve a pedir páginas internas, no quedan cacheadas.
  async redirects() {
    const a = (source: string, destination: string) => ({ source, destination, permanent: false });
    return [
      a("/modelo", "/#metodo"),
      a("/co-propiedad", "/#comparativa"),
      a("/inversion", "/#formatos"),
      a("/proceso", "/#sistema"),
      a("/academia", "/#sistema"),
      a("/faq", "/#sistema"),
      a("/candidato", "/#postular"),
      a("/aplicar", "/#postular"),
      a("/portal", "/"),
    ];
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
