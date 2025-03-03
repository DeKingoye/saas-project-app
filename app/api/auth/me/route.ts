// import { NextResponse } from "next/server";
// import { verifyToken } from "@/utils/jwt";
// import prisma from "@/lib/prisma";
// import { cookies } from "next/headers";

// export async function GET(req: Request) {
//   try {
//     const cookieStore = await cookies(); 
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
//     }

//     // Vérifier le token
//     const decoded: any = verifyToken(token);

//     // Récupérer l'utilisateur
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//       select: { id: true, email: true, name: true }
//     });

//     if (!user) {
//       return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
//     }

//     return NextResponse.json({ user });
//   } catch (error) {
//     console.error("Erreur serveur:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
    }

    // Vérifier le token
    const decoded: any = verifyToken(token);

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
