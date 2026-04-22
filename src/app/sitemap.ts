import { MetadataRoute } from "next";

const BASE = "https://www.leine-honig.de";

async function getProductHandles(): Promise<string[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/products?limit=100&fields=handle`;
    const res = await fetch(url, {
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const { products } = await res.json();
    return (products ?? []).map((p: any) => p.handle).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const handles = await getProductHandles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/honig`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/bienen-mieten`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ueber-uns`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/kontakt`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/agb`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/widerruf`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const productPages: MetadataRoute.Sitemap = handles.map((handle) => ({
    url: `${BASE}/honig/${handle}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
