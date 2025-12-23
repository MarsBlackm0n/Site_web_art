export const metadata = {
  robots: { index: false, follow: false },
};

export default function PrivateArtworksEN({ params }: { params: { locale: string } }) {
  if (params.locale !== "en") return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Artworks (private)</h1>
      <p className="mt-2 opacity-80">Placeholder: private artworks will be shown here.</p>

      <form action="/api/private/logout" method="post" className="mt-6">
        <button className="rounded-md border px-3 py-2">Logout</button>
      </form>
    </main>
  );
}
