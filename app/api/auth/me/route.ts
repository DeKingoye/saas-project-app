// import jwt from 'jsonwebtoken';
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get('auth_token');
//     if (!token) {
//       return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
//     }

//     const decoded: any = jwt.verify(token, JWT_SECRET);
//     const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, email: true, name: true } });

//     if (!user) {
//       return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
//     }

//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Erreur serveur:", error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import cookie from "cookie";

export async function GET(req: Request) {
  try {
    // Lire les cookies
    const cookies = req.headers.get("cookie");
    if (!cookies) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    // Extraire le token JWT
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;

    if (!token) return NextResponse.json({ error: "Token introuvable" }, { status: 401 });

    // Vérifier le token
    const decoded: any = verifyToken(token);

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true }
    });

    if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
