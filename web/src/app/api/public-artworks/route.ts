import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const base = process.env.STRAPI_URL;
  if (!base) {
    return NextResponse.json({ error: "Missing STRAPI_URL" }, { status: 500 });
  }

  // Build encoded URL (important for filters[...])
  const u = new URL("/api/artworks", base);
  u.searchParams.set("filters[visibility][$eq]", "public");
  u.searchParams.set("sort", "year:desc");
  u.searchParams.set("pagination[pageSize]", "200");
  u.searchParams.set("populate", "image");

  const url = u.toString();
  console.log("Proxying to:", url);

  // Minimal headers: Accept + Cookie (codespaces auth)
  const headers = new Headers();
  headers.set("Accept", "application/json");

  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const res = await fetch(url, { headers, cache: "no-store" });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      {
        error: "Upstream did not return JSON",
        upstreamStatus: res.status,
        upstreamContentType: contentType,
        firstChars: text.slice(0, 200),
      },
      { status: 502 }
    );
  }

  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": "application/json" },
  });
}
