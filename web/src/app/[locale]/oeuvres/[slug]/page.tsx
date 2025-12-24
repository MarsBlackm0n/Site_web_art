import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPublicArtworkBySlug, strapiMediaUrl } from "@/lib/strapi";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const artwork = await fetchPublicArtworkBySlug(slug);
  if (!artwork) return { title: "Œuvre — ProcessOverResult" };

  const title = `${artwork.title_fr} — ProcessOverResult`;
  const description = `Œuvre (${artwork.type === "drawing" ? "dessin" : "peinture"})${
    artwork.year ? `, ${artwork.year}` : ""
  }.`;

  const url = `/fr/oeuvres/${artwork.slug}`;
  const ogImage = strapiMediaUrl(artwork.image?.formats?.large?.url ?? artwork.image?.url);

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
    openGraph: ogImage
      ? {
          title,
          description,
          url,
          type: "article",
          images: [{ url: ogImage }],
        }
      : { title, description, url, type: "article" },
    twitter: ogImage
      ? {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
        }
      : { card: "summary", title, description },
  };
}

export default async function OeuvreDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const artwork = await fetchPublicArtworkBySlug(slug);
  if (!artwork) notFound();
  
  const description = artwork.description_fr || artwork.description_en;
 
  const imageUrl = strapiMediaUrl(artwork.image?.formats?.large?.url ?? artwork.image?.url);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={artwork.title_fr}
              fill
              unoptimized={process.env.NODE_ENV !== "production"}
              className="object-contain"
              priority
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{artwork.title_fr}</h1>
          <p className="mt-2 text-sm opacity-70">
            {artwork.year ?? "—"} · {artwork.type === "drawing" ? "Dessin" : "Peinture"}
          </p>

          <a href="/fr/oeuvres" className="inline-block mt-8 rounded-md border px-3 py-2 text-sm hover:bg-white/5">
            ← Retour aux œuvres
          </a>
        </div>
      </div>

      {description && <div className="mt-6 whitespace-pre-line leading-relaxed">{description}</div>}
      
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VisualArtwork",
            name: artwork.title_fr,
            artform: artwork.type === "drawing" ? "Drawing" : "Painting",
            dateCreated: artwork.year ? String(artwork.year) : undefined,
            image: imageUrl ? [imageUrl] : undefined,
            inLanguage: "fr",
          }),
        }}
      />
    </main>
  );
}
