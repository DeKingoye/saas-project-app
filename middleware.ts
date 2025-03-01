import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import cookie from "cookie";

export async function middleware(req: NextRequest) {
  const publicRoutes = ["/api/auth/register", "/api/auth/login"];

  // ✅ Laisse passer les routes publiques (inscription et connexion)
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const cookies = req.headers.get("cookie");
  if (!cookies) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.token;

  if (!token) {
    return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};


