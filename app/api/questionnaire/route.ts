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


// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import cookie from "cookie";
// import { verifyToken } from "@/utils/jwt";

// export async function POST(req: NextRequest) {
//   console.log("📨 Requête POST reçue sur /api/questionnaire");

//   try {
//     const cookiesHeader = req.headers.get("cookie");
//     console.log("🔎 Cookies reçus :", cookiesHeader);

//     if (!cookiesHeader) {
//       return NextResponse.json({ error: "Non authentifié (aucun cookie reçu)" }, { status: 401 });
//     }

//     const parsedCookies = cookie.parse(cookiesHeader);
//     console.log("🔑 Cookies parsés :", parsedCookies);

//     const token = parsedCookies.token;

//     if (!token) {
//       return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
//     }

//     let decoded;
//     try {
//       decoded = verifyToken(token);
//       console.log("🔑 Token décodé avec succès :", decoded);
//     } catch (error) {
//       console.error("❌ Token invalide :", error);
//       return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
//     }

//     return NextResponse.json({ message: "Token valide, requête acceptée" }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Erreur API /api/questionnaire [POST]:", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

//Ce qui marche

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";

// 📌 Créer un questionnaire (Uniquement pour les utilisateurs connectés)
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 403 });
    }

    const { title, questions } = await req.json();

    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        userId: decoded.id, // ✅ Utilisation de `userId` pour lier le questionnaire au créateur
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });

    return NextResponse.json(questionnaire, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du questionnaire:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 📌 Récupérer les questionnaires créés par l'utilisateur connecté
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token introuvable" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 403 });
    }

    // ✅ Récupérer uniquement les questionnaires de l'utilisateur connecté
    const questionnaires = await prisma.questionnaire.findMany({
      where: { userId: decoded.id },
      select: { id: true, title: true, createdAt: true },
    });

    return NextResponse.json(questionnaires, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
