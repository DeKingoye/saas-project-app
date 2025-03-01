// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { verifyToken } from "@/utils/jwt";
// import cookie from "cookie";

// // 📌 Créer un questionnaire (Uniquement pour les utilisateurs connectés)
// export async function POST(req: NextRequest) {
//   try {
//     const cookies = req.headers.get("cookie");
//     if (!cookies) {
//       return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
//     }

//     const parsedCookies = cookie.parse(cookies);
//     const token = parsedCookies.token;
//     if (!token) {
//       return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
//     }

//     const decoded: any = verifyToken(token);
//     if (!decoded) {
//       return NextResponse.json({ error: "Token invalide" }, { status: 403 });
//     }

//     const { title, questions } = await req.json();

//     const questionnaire = await prisma.questionnaire.create({
//       data: {
//         title,
//         userId: decoded.id, // ✅ Utilisation de `userId` pour lier le questionnaire au créateur
//         questions: {
//           create: questions,
//         },
//       },
//       include: { questions: true },
//     });

//     return NextResponse.json(questionnaire, { status: 201 });
//   } catch (error) {
//     console.error("Erreur lors de la création du questionnaire:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

// // 📌 Récupérer les questionnaires créés par l'utilisateur connecté
// export async function GET(req: NextRequest) {
//   try {
//     const cookies = req.headers.get("cookie");
//     if (!cookies) {
//       return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
//     }

//     const parsedCookies = cookie.parse(cookies);
//     const token = parsedCookies.token;
//     if (!token) {
//       return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
//     }

//     const decoded: any = verifyToken(token);
//     if (!decoded) {
//       return NextResponse.json({ error: "Token invalide" }, { status: 403 });
//     }

//     // ✅ Récupérer uniquement les questionnaires de l'utilisateur connecté
//     const questionnaires = await prisma.questionnaire.findMany({
//       where: { userId: decoded.id },
//       select: { id: true, title: true, createdAt: true },
//     });

//     return NextResponse.json(questionnaires, { status: 200 });
//   } catch (error) {
//     console.error("Erreur lors de la récupération:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cookie from "cookie";
import { verifyToken } from "@/utils/jwt";

// 🔹 Créer un nouveau questionnaire
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, questions } = body;

    // 🔎 Récupérer le token JWT depuis les cookies
    const cookies = req.headers.get("cookie");
    if (!cookies) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    if (!token) return NextResponse.json({ error: "Token introuvable" }, { status: 401 });

    // 🔎 Vérifier le token et récupérer l'ID de l'utilisateur
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
    }

    // 📌 Créer le questionnaire avec l'ID de l'utilisateur
    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        userId: decoded.id, // 🔹 Lien avec l'utilisateur
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });

    return NextResponse.json(questionnaire, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur API /api/questionnaire [POST]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 🔹 Récupérer tous les questionnaires de l'utilisateur connecté
export async function GET(req: NextRequest) {
  try {
    // 🔎 Récupérer le token JWT depuis les cookies
    const cookies = req.headers.get("cookie");
    if (!cookies) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    if (!token) return NextResponse.json({ error: "Token introuvable" }, { status: 401 });

    // 🔎 Vérifier le token et récupérer l'ID de l'utilisateur
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
    }

    // 📌 Récupérer uniquement les questionnaires de l'utilisateur
    const questionnaires = await prisma.questionnaire.findMany({
      where: { userId: decoded.id }, // 🔹 Filtrage par utilisateur
      select: { 
        id: true, 
        title: true,
        createdAt: true,
      },
    });

    return NextResponse.json(questionnaires, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API /api/questionnaire [GET]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
