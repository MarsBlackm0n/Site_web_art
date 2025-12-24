"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Locale = "fr" | "en";

function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

function switchPathname(pathname: string, target: Locale) {
  const parts = pathname.split("/").filter(Boolean);

  // /fr
  if (parts.length === 1) return `/${target}`;

  const [, section, slug] = parts;

  const sectionMap: Record<string, string> = {
    oeuvres: "artworks",
    artworks: "oeuvres",
    prive: "private",
    private: "prive",
  };

  const nextSection = sectionMap[section] ?? section;

  return "/" + [target, nextSection, slug].filter(Boolean).join("/");
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = otherLocale(locale);

  const isFR = locale === "fr";
  const homeHref = `/${locale}`;
  const galleryHref = isFR ? `/${locale}/oeuvres` : `/${locale}/artworks`;
  const privateHref = isFR ? `/${locale}/prive` : `/${locale}/private`;
  const switchHref = switchPathname(pathname, other);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href={homeHref} className="font-semibold tracking-tight">
          ProcessOverResult
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href={galleryHref} className="opacity-90 hover:opacity-100">
            {isFR ? "Œuvres" : "Artworks"}
          </Link>

          <Link href={privateHref} className="opacity-90 hover:opacity-100">
            {isFR ? "Accès privé" : "Private"}
          </Link>

          <span className="opacity-30">|</span>

          <Link
            href={switchHref}
            className="rounded-md border border-white/15 px-2 py-1 opacity-90 hover:opacity-100"
            aria-label={isFR ? "Switch to English" : "Passer en français"}
            title={isFR ? "English" : "Français"}
          >
            {other.toUpperCase()}
          </Link>
        </nav>
      </div>
    </header>
  );
}
