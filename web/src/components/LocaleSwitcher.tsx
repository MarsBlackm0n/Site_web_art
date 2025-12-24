"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function switchPath(pathname: string, targetLocale: "fr" | "en") {
  // Découpe l’URL
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${targetLocale}`;

  // parts[0] = locale actuelle
  const [, section, slug] = parts;

  // mapping FR <-> EN
  const sectionMap: Record<string, string> = {
    oeuvres: "artworks",
    artworks: "oeuvres",
  };

  const newSection =
    section && sectionMap[section]
      ? sectionMap[section]
      : section;

  // Reconstruit l’URL
  const next = [targetLocale, newSection, slug].filter(Boolean);
  return "/" + next.join("/");
}

export default function LocaleSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 text-sm">
      <Link
        href={switchPath(pathname, "fr")}
        className="underline underline-offset-4"
      >
        FR
      </Link>
      <span className="opacity-50">/</span>
      <Link
        href={switchPath(pathname, "en")}
        className="underline underline-offset-4"
      >
        EN
      </Link>
    </div>
  );
}
