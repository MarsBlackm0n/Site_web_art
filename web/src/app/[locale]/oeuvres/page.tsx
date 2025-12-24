import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchPublicArtworks, strapiMediaUrl, type Artwork } from "@/lib/strapi";

export default async function OeuvresPage() {
  let artworks: Artwork[] = [];

  try {
    artworks = await fetchPublicArtworks();
  } catch (e) {
    console.error("Failed to load artworks", e);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Œuvres</h1>

      {artworks.length === 0 ? (
        <p className="opacity-60">Aucune œuvre pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((art) => {
            const attrs = art.attributes;
            const imageUrl = strapiMediaUrl(attrs.image?.data?.attributes.url);

            return (
              <Link key={art.id} href={`/fr/oeuvres/${attrs.slug}`} className="group">
                <article>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-black/5">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={attrs.title_fr}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <h2 className="mt-2 text-sm font-medium">{attrs.title_fr}</h2>
                  <p className="text-xs opacity-60">
                    {attrs.year ?? "—"} · {attrs.type === "drawing" ? "Dessin" : "Peinture"}
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
