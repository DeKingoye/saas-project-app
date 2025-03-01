import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Créer un nouveau questionnaire
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, questions } = body;

    const questionnaire = await prisma.questionnaire.create({
      data: {
        title,
        questions: {
          create: questions,
        },
      },
      include: { questions: true },
    });

    return NextResponse.json(questionnaire, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}

// Récupérer tous les questionnaires (avec date de création)
export async function GET() {
  try {
    const questionnaires = await prisma.questionnaire.findMany({
      select: { 
        id: true, 
        title: true,
        createdAt: true  // Ajout de la date de création ici
      },
    });

    return NextResponse.json(questionnaires, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}



