import "../globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import { notFound } from "next/navigation";

const LOCALES = ["fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        {children}
      </body>
    </html>
  );
}
