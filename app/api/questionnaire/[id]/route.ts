import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!questionnaire) {
      return NextResponse.json({ error: "Questionnaire non trouvé" }, { status: 404 });
    }

    return NextResponse.json(questionnaire, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Récupère l'ID depuis l'URL

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await prisma.questionnaire.delete({ where: { id } });

    return NextResponse.json({ message: "Questionnaire supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
