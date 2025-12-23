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
    return { title: "Artwork — ProcessOverResult" };
  }

  const title = `${artwork.title} — ProcessOverResult`;
  const description = `Artwork (${artwork.type})${artwork.year ? `, ${artwork.year}` : ""}.`;
  const url = `/en/artworks/${artwork.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `/fr/oeuvres/${artwork.slug}`,
        en: url,
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


export default function ArtworkDetailPage(props: { params: Promise<{ slug: string }> }) {
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
            {artwork.year ?? "—"} · {artwork.type}
          </p>

          <a href="/en/artworks" className="inline-block mt-8 rounded-md border px-3 py-2 text-sm hover:bg-white/5">
            ← Back to artworks
          </a>
        </div>
      </div>
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VisualArtwork",
            name: artwork.title,
            artform: artwork.type === "drawing" ? "Drawing" : "Painting",
            dateCreated: artwork.year ? String(artwork.year) : undefined,
            image: [artwork.image],
            inLanguage: "en",
          }),
        }}
      />
    </main>
  );
}
