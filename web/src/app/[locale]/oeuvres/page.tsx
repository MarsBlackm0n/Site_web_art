import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchPublicArtworks, strapiMediaUrl } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Œuvres — ProcessOverResult",
  description: "Galerie d’œuvres (dessins et peintures).",
  alternates: {
    canonical: "/fr/oeuvres",
    languages: {
      fr: "/fr/oeuvres",
      en: "/en/artworks",
    },
  },
};

export default async function OeuvresPage() {
  const artworks = await fetchPublicArtworks();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Œuvres</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((art) => {
          const attrs = art.attributes;
          const imageUrl = strapiMediaUrl(
            attrs.image?.data?.attributes.url
          );

          return (
            <Link
              key={art.id}
              href={`/fr/oeuvres/${attrs.slug}`}
              className="group"
            >
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

                <h2 className="mt-2 text-sm font-medium">
                  {attrs.title_fr}
                </h2>

                <p className="text-xs opacity-60">
                  {attrs.year ?? "—"} ·{" "}
                  {attrs.type === "drawing" ? "Dessin" : "Peinture"}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
