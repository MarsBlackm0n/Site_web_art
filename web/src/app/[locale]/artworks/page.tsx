import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchPublicArtworks, strapiMediaUrl, type Artwork } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Artworks — ProcessOverResult",
  description: "Gallery of artworks (drawings and paintings).",
  alternates: {
    canonical: "/en/artworks",
    languages: {
      fr: "/fr/oeuvres",
      en: "/en/artworks",
    },
  },
};

export default async function ArtworksPage() {
  let artworks: Artwork[] = [];

  try {
    artworks = await fetchPublicArtworks();
  } catch (e) {
    console.error("Failed to load artworks", e);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artworks</h1>

      {artworks.length === 0 ? (
        <p className="opacity-60">No artworks yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((art) => {
            const title = art.title_en || art.title_fr;
            const imageUrl = strapiMediaUrl(art.image?.formats?.medium?.url ?? art.image?.url);

            return (
              <Link key={art.id} href={`/en/artworks/${art.slug}`} className="group">
                <article>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-black/5">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        unoptimized={process.env.NODE_ENV !== "production"}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <h2 className="mt-2 text-sm font-medium">{title}</h2>
                  <p className="text-xs opacity-60">
                    {art.year ?? "—"} · {art.type === "drawing" ? "Drawing" : "Painting"}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
