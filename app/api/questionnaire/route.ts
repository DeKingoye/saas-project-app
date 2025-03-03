import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {
  try {
    console.log('TETSTSTSTTS::::::');
    
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
        userId: decoded.id, 
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
