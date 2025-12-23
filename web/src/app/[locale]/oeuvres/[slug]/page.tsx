import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { artworks } from "@/data/artworks.mock";
import type { Metadata } from "next";


export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const artwork = artworks.find((a) => a.slug === slug && a.visibility === "public");
  if (!artwork) {
    return { title: "Œuvre — ProcessOverResult" };
  }

  const title = `${artwork.title} — ProcessOverResult`;
  const description = `Œuvre (${artwork.type === "drawing" ? "dessin" : "peinture"})${artwork.year ? `, ${artwork.year}` : ""}.`;

  const url = `/fr/oeuvres/${artwork.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: url,
        en: `/en/artworks/${artwork.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: artwork.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [artwork.image],
    },
  };
}

export default function OeuvreDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(props.params);

  const artwork = artworks.find((a) => a.slug === slug && a.visibility === "public");
  if (!artwork) notFound();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5">
          <Image src={artwork.image} alt={artwork.title} fill className="object-contain" priority />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{artwork.title}</h1>
          <p className="mt-2 text-sm opacity-70">
            {artwork.year ?? "—"} · {artwork.type === "drawing" ? "Dessin" : "Peinture"}
          </p>

          <a href="/fr/oeuvres" className="inline-block mt-8 rounded-md border px-3 py-2 text-sm hover:bg-white/5">
            ← Retour aux œuvres
          </a>
        </div>
      </div>
            <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VisualArtwork",
            name: artwork.title,
            artform: artwork.type === "drawing" ? "Drawing" : "Painting",
            dateCreated: artwork.year ? String(artwork.year) : undefined,
            image: [artwork.image],
            inLanguage: "fr",
          }),
        }}
      />
    </main>
  );
}
