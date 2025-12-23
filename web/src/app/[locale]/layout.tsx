import "../globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";


type LocaleParams = { locale: "fr" | "en" };

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata(props: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFR = locale === "fr";

  return {
    title: isFR ? "ProcessOverResult — Œuvres" : "ProcessOverResult — Artworks",
    description: isFR
      ? "Portfolio d’œuvres : dessins et peintures."
      : "Art portfolio: drawings and paintings.",
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}) {
  const { locale } = await props.params;

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        {props.children}
      </body>
    </html>
  );

}
