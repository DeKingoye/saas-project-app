// import { NextResponse } from "next/server";
// import { comparePasswords } from "../../../../utils/auth";
// import { generateToken } from "../../../../utils/jwt";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
//     }

//     const isMatch = await comparePasswords(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
//     }

//     // Générer le token JWT
//     const token = generateToken({ id: user.id, name: user.name, email: user.email });

//     // Définir le cookie JWT
//     const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
//     response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

//     return response;
//   } catch (error) {
//     console.error("Erreur serveur:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

// Ce qui marche
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePasswords } from "../../../../utils/auth";
import { generateToken } from "../../../../utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Générer le token JWT
    const token = generateToken({ id: user.id, name: user.name, email: user.email });

    // Définir le cookie avec le token
    const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
    response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

    return response;
  } catch (error) {
    console.error("❌ Erreur lors de la connexion:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


// //Ce qui marche aussi
// export const runtime = "nodejs";  // ✅ Force l'exécution en Node.js

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { comparePasswords } from "../../../../utils/auth";
// import { generateToken } from "../../../../utils/jwt";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     // Vérifier si l'utilisateur existe
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
//     }

//     // Vérifier si le mot de passe est correct
//     const isMatch = await comparePasswords(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
//     }

//     // Générer le token JWT
//     const token = generateToken({ id: user.id, name: user.name, email: user.email });

//     // Définir le cookie avec le token
//     const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
//     response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

//     return response;
//   } catch (error) {
//     console.error("❌ Erreur lors de la connexion:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
