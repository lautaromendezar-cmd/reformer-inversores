import type { MetadataRoute } from "next";
import { marca } from "@/content/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/legal"].map((r) => ({ url: `${marca.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.3 }));
}
