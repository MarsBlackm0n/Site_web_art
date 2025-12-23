import Link from "next/link";
import Image from "next/image";
import { artworks } from "@/data/artworks.mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artworks — ProcessOverResult",
  description: "Artworks gallery (drawings and paintings).",
  alternates: {
    canonical: "/en/artworks",
    languages: {
      fr: "/fr/oeuvres",
      en: "/en/artworks",
    },
  },
};


export default function ArtworksPage() {
  const publicArtworks = artworks.filter((a) => a.visibility === "public");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artworks</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {publicArtworks.map((art) => (
          <Link key={art.id} href={`/en/artworks/${art.slug}`} className="group">
            <article>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-black/5">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="mt-2 text-sm font-medium">{art.title}</h2>
              <p className="text-xs opacity-60">
                {art.year ?? "—"} · {art.type}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
