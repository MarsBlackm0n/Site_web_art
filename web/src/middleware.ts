import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["fr", "en"] as const;
const DEFAULT_LOCALE = "fr";

function hasLocale(pathname: string) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

function isPrivatePath(pathname: string) {
  return pathname.startsWith("/fr/prive") || pathname.startsWith("/en/private");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // On ignore les routes internes / assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Si l'URL n'a pas de locale, on préfixe par /fr
  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ Protection des routes privées
  if (isPrivatePath(pathname)) {
    const isLogin =
      pathname === "/fr/prive" ||
      pathname === "/fr/prive/" ||
      pathname === "/en/private" ||
      pathname === "/en/private/";

    if (!isLogin) {
      const hasCookie = req.cookies.get("por_private")?.value === "1";
      if (!hasCookie) {
        const url = req.nextUrl.clone();
        url.pathname = pathname.startsWith("/en/") ? "/en/private" : "/fr/prive";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
