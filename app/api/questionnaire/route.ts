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

// 🔹 Vérification et récupération de l'utilisateur via le token
const getUserFromToken = (req: NextRequest) => {
  try {
    const cookies = req.headers.get("cookie");
    if (!cookies) return null;

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    if (!token) return null;

    return verifyToken(token);
  } catch (error) {
    console.error("❌ Erreur de vérification du token :", error);
    return null;
  }
};

// 🔹 Création d'un questionnaire
export async function POST(req: NextRequest) {
  try {
    console.log("📨 Requête POST reçue sur /api/questionnaire");

    // 🔍 Vérifier si l'utilisateur est authentifié
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { title, questions } = body;

    if (!title || !questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // 📌 Création du questionnaire avec les questions associées
    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        userId: user.id,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ? { create: q.options.map((opt) => ({ text: opt.text })) } : undefined,
          })),
        },
      },
      include: { questions: { include: { options: true } } },
    });

    return NextResponse.json(questionnaire, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur API /api/questionnaire [POST]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 🔹 Récupération de tous les questionnaires de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    console.log("📨 Requête GET reçue sur /api/questionnaire");

    // 🔍 Vérifier si l'utilisateur est authentifié
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 📌 Récupérer uniquement les questionnaires de l'utilisateur
    const questionnaires = await prisma.questionnaire.findMany({
      where: { userId: user.id },
      select: { id: true, title: true, createdAt: true },
    });

    return NextResponse.json(questionnaires, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API /api/questionnaire [GET]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
