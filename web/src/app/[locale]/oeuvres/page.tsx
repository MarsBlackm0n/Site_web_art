import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchPublicArtworks, strapiMediaUrl, type Artwork } from "@/lib/strapi";

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
  const imageUrl =
    strapiMediaUrl(art.image?.formats?.medium?.url ?? art.image?.url) ?? "";

  return (
    <Link key={art.id} href={`/fr/oeuvres/${art.slug}`} className="group">
      <article>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-black/5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={art.title_fr}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-xs opacity-60">
              Pas d’image
            </div>
          )}
        </div>

        <h2 className="mt-2 text-sm font-medium">{art.title_fr}</h2>
        <p className="text-xs opacity-60">
          {art.year ?? "—"} · {art.type === "drawing" ? "Dessin" : "Peinture"}
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
