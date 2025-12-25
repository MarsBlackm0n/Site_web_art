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
    const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const url = base ? `${base}/api/public-artworks` : "/api/public-artworks";

    const res = await fetch(url, { cache: "no-store" });

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
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.STRAPI_INTERNAL_URL ||
    process.env.STRAPI_URL;
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
  if (!path) return null;
  if (path.startsWith("http")) return path;

  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_INTERNAL_URL ||
    process.env.STRAPI_URL;

  if (!base) throw new Error("Missing Strapi base url env var");

  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
}


export function bestArtworkImageUrl(
  image?: Artwork["image"] | null,
  size: "thumb" | "small" | "medium" | "large" = "medium"
) {
  if (!image) return null;

  const pick =
    (size === "large" && image.formats?.large?.url) ||
    (size === "medium" && image.formats?.medium?.url) ||
    (size === "small" && image.formats?.small?.url) ||
    (size === "thumb" && image.formats?.thumbnail?.url) ||
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.url;

  return strapiMediaUrl(pick ?? null);
}