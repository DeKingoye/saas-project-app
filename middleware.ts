// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/utils/jwt";
// import { cookies } from "next/headers";

// export async function middleware(req: NextRequest) {
//   const publicRoutes = ["/api/auth/register", "/api/auth/login"];

//   // ✅ Laisse passer les routes publiques
//   if (publicRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//     }

//     verifyToken(token);
//     return NextResponse.next();
//   } catch (error) {
//     console.error("❌ Erreur Middleware:", error);
//     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/api/:path*",
//     "/questionnaire/:path*", // Protège les questionnaires
//   ],
// };


import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const publicRoutes = [
    "/api/auth/register",
    "/api/auth/login",
    "/api/metrics", // 👈 Autoriser Prometheus à accéder aux métriques sans redirection
  ];

  // ✅ Laisse passer les routes publiques
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Erreur Middleware:", error);
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/questionnaire/:path*", // Protège les questionnaires
  ],
};
