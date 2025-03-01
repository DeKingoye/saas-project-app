// // import { NextResponse } from "next/server";
// // import { comparePasswords } from "../../../../utils/auth";
// // import { generateToken } from "../../../../utils/jwt";
// // import prisma from "@/lib/prisma";

// // export async function POST(req: Request) {
// //   try {
// //     const { email, password } = await req.json();

// //     const user = await prisma.user.findUnique({ where: { email } });
// //     if (!user) {
// //       return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
// //     }

// //     const isMatch = await comparePasswords(password, user.password);
// //     if (!isMatch) {
// //       return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
// //     }

// //     // Générer le token JWT
// //     const token = generateToken({ id: user.id, name: user.name, email: user.email });

// //     // Définir le cookie JWT
// //     const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
// //     response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

// //     return response;
// //   } catch (error) {
// //     console.error("Erreur serveur:", error);
// //     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
// //   }
// // }


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


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateToken } from "@/utils/jwt"; // Assurez-vous d'avoir cette fonction
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    // Vérification de l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Génération du token
    const token = generateToken({ id: user.id, email: user.email });

    // Définition du cookie sécurisé
    const response = NextResponse.json({ message: "Connexion réussie" }, { status: 200 });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=None; Domain=.ymouandza.fr; Max-Age=86400`
    );

    return response;
  } catch (error) {
    console.error("❌ Erreur API /api/auth/login :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
