import { headers } from "next/headers";

export type Artwork = {
  id: number;
  attributes: {
    title_fr: string;
    title_en?: string | null;
    slug: string;
    year?: number | null;
    type: "drawing" | "painting";
    visibility: "public" | "private";
    description_fr?: string | null;
    description_en?: string | null;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string | null;
        };
      } | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
  };
};

const STRAPI_URL = process.env.STRAPI_URL;

function mustStrapiUrl() {
  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL in web/.env.local");
  return STRAPI_URL;
}

export async function fetchPublicArtworks(): Promise<Artwork[]> {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    console.error("Missing SITE_URL");
    return [];
  }

  let res: Response;

  try {
    res = await fetch(`${siteUrl}/api/public-artworks`, {
      cache: "no-store",
    });
  } catch (e) {
    console.error("Fetch failed (network)", e);
    return [];
  }

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    console.error("Proxy error", res.status);
    return [];
  }

  // ⛔ NE JAMAIS parser si ce n’est pas du JSON
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", contentType);
    console.error("First chars:", text.slice(0, 200));
    return [];
  }

  try {
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    console.error("JSON parse failed", e);
    return [];
  }
}


export async function fetchPublicArtworkBySlug(slug: string) {
  const base = mustStrapiUrl();
  const url =
    `${base}/api/artworks` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&filters[visibility][$eq]=public` +
    `&populate=image`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Strapi error ${res.status} on /api/artworks?slug=${slug}`);
  const json = await res.json();
  const arr = json.data as Artwork[];
  return arr[0] ?? null;
}

export function strapiMediaUrl(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${mustStrapiUrl()}${path}`;
}
