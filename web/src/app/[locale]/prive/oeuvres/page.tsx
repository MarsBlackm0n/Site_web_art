export const metadata = {
  robots: { index: false, follow: false },
};

export default function PrivateOeuvresFR({ params }: { params: { locale: string } }) {
  if (params.locale !== "fr") return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Œuvres (privé)</h1>
      <p className="mt-2 opacity-80">Placeholder : ici on affichera les œuvres privées.</p>

      <form action="/api/private/logout" method="post" className="mt-6">
        <button className="rounded-md border px-3 py-2">Se déconnecter</button>
      </form>
    </main>
  );
}
