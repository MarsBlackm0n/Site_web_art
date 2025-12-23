import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";

  // Pour l’instant pages statiques. Plus tard on ajoutera les slugs depuis Strapi.
  return [
    { url: `${baseUrl}/fr`, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/fr/oeuvres`, lastModified: new Date() },
    { url: `${baseUrl}/en/artworks`, lastModified: new Date() },
  ];
}
