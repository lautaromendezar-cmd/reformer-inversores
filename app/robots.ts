import type { MetadataRoute } from "next";
import { marca } from "@/content/sitio";

// Bajo NDA: bloquea todo hasta que NEXT_PUBLIC_ALLOW_INDEXING sea "true".
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${marca.url}/sitemap.xml` };
}
