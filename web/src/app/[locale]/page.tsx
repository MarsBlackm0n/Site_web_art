import Link from "next/link";

export default async function Home(props: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await props.params;
  const isFR = locale === "fr";

  return (
    <main className="p-8 mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold">ProcessOverResult</h1>
      <p className="mt-3 opacity-80">
        {isFR
          ? "Un portfolio d’œuvres : dessins et peintures."
          : "An art portfolio: drawings and paintings."}
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium"
          href={isFR ? `/${locale}/oeuvres` : `/${locale}/artworks`}
        >
          {isFR ? "Voir les œuvres" : "View artworks"}
        </Link>

        <Link
          className="rounded-md border border-white/15 px-4 py-2 text-sm"
          href={isFR ? `/${locale}/prive` : `/${locale}/private`}
        >
          {isFR ? "Accès privé" : "Private access"}
        </Link>
      </div>
    </main>
  );
}
