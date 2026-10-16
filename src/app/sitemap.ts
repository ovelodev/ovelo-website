import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/about", "/contact", "/support", "/privacy", "/terms"];
  return [
    ...routes.map((path) => ({ url: `${site.url}${path}/`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
