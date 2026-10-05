import type { MetadataRoute } from "next";
import { marca, navegacion } from "@/content/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", ...navegacion.map((n) => n.href), "/aplicar", "/candidato", "/legal"];
  return rutas.map((r) => ({ url: `${marca.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
