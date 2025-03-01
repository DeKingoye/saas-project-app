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
    console.log("📨 Requête POST reçue sur /api/questionnaire");

    // 🔍 Récupération des cookies
    const cookieHeader = req.headers.get("cookie") || "";
    console.log("🔎 Cookies reçus :", cookieHeader);

    const parsedCookies = cookie.parse(cookieHeader);
    console.log("🔎 Cookies parsés :", parsedCookies);

    const token = parsedCookies.token;
    if (!token) {
      console.error("❌ Aucun token trouvé après parsing.");
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 🔍 Vérification et décodage du token
    let decoded;
    try {
      decoded = verifyToken(token);
      console.log("✅ Token décodé :", decoded);
    } catch (error) {
      console.error("❌ Erreur de vérification du token :", error);
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
    }

    // 🔍 Vérification de la connexion à la base de données
    await prisma.$connect();
    console.log("✅ Connexion à la base de données réussie");

    // 🔍 Extraction du corps de la requête
    const body = await req.json();
    console.log("📨 Données reçues :", body);

    const { title, questions } = body;
    if (!title || !questions) {
      console.error("❌ Données invalides (title ou questions manquants)");
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // 📌 Création du questionnaire
    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        userId: decoded.id, // 🔹 Associer le questionnaire à l'utilisateur
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });

    console.log("✅ Questionnaire créé avec succès :", questionnaire);
    return NextResponse.json(questionnaire, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur API /api/questionnaire [POST]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 🔹 Récupérer tous les questionnaires de l'utilisateur connecté
export async function GET(req: NextRequest) {
  try {
    console.log("📨 Requête GET reçue sur /api/questionnaire");

    // 🔍 Récupération des cookies
    const cookieHeader = req.headers.get("cookie") || "";
    console.log("🔎 Cookies reçus :", cookieHeader);

    const parsedCookies = cookie.parse(cookieHeader);
    console.log("🔎 Cookies parsés :", parsedCookies);

    const token = parsedCookies.token;
    if (!token) {
      console.error("❌ Aucun token trouvé après parsing.");
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 🔍 Vérification et décodage du token
    let decoded;
    try {
      decoded = verifyToken(token);
      console.log("✅ Token décodé :", decoded);
    } catch (error) {
      console.error("❌ Erreur de vérification du token :", error);
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
    }

    // 🔍 Vérification de la connexion à la base de données
    await prisma.$connect();
    console.log("✅ Connexion à la base de données réussie");

    // 📌 Récupération des questionnaires de l'utilisateur
    const questionnaires = await prisma.questionnaire.findMany({
      where: { userId: decoded.id }, // 🔹 Filtrage par utilisateur
      select: { id: true, title: true, createdAt: true },
    });

    console.log("✅ Questionnaires récupérés :", questionnaires.length);
    return NextResponse.json(questionnaires, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur API /api/questionnaire [GET]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
