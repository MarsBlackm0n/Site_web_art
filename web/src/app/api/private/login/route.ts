import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password?: string };

  const expected = process.env.PRIVATE_GALLERY_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  if (!password || password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: "por_private",
    value: "1",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });

  return res;
}
