import { headers } from "next/headers";

export type Artwork = {
  id: number;
  documentId?: string;
  title_fr: string;
  title_en: string;
  slug: string;
  year?: number | null;
  type: "drawing" | "painting";
  visibility: "public" | "private";
  description_fr?: string | null;
  description_en?: string | null;
  image?: {
    url: string;
    alternativeText?: string | null;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
};


const STRAPI_URL = process.env.STRAPI_URL;

function mustStrapiUrl() {
  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL in web/.env.local");
  return STRAPI_URL;
}

export async function fetchPublicArtworks(): Promise<Artwork[]> {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/public-artworks", {
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    if (!res.ok || !contentType.includes("application/json")) return [];

    const json = await res.json();
    return Array.isArray(json.data) ? (json.data as Artwork[]) : [];
  } catch (e) {
    console.error("fetchPublicArtworks failed", e);
    return [];
  }
}

export async function fetchPublicArtworkBySlug(slug: string): Promise<Artwork | null> {
  const base = process.env.STRAPI_INTERNAL_URL || process.env.STRAPI_URL;
  if (!base) return null;

  const u = new URL("/api/artworks", base);
  u.searchParams.set("filters[visibility][$eq]", "public");
  u.searchParams.set("filters[slug][$eq]", slug);
  u.searchParams.set("populate", "image");

  const res = await fetch(u.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok || !ct.includes("application/json")) return null;

  const json = await res.json();
  const data = Array.isArray(json.data) ? (json.data as Artwork[]) : [];
  return data[0] ?? null;
}


export function strapiMediaUrl(path?: string | null) {
  const base = process.env.STRAPI_URL;
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (!base) throw new Error("Missing STRAPI_URL in web/.env.local");
  return `${base}${path}`;
}

