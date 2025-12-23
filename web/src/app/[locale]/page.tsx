export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>ProcessOverResult</h1>
      <p style={{ marginTop: 12 }}>Locale: {params.locale}</p>

      <ul style={{ marginTop: 16 }}>
        <li>
          <a href={`/${params.locale === "fr" ? "en" : "fr"}`}>
            Switch to {params.locale === "fr" ? "English" : "Français"}
          </a>
        </li>
        <li style={{ marginTop: 8 }}>
          <a href={`/${params.locale}/oeuvres`}>Galerie (FR route test)</a>
        </li>
      </ul>
    </main>
  );
}
