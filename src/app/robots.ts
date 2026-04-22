import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/kasse", "/warenkorb", "/danke", "/api/"],
      },
    ],
    sitemap: "https://www.leine-honig.de/sitemap.xml",
  };
}
