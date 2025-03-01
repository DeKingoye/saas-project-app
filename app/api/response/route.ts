
import { NextRequest, NextResponse } from 'next/server'; // ✅ vérifie cet import
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { userEmail, answers } = body;

      if (!userEmail || !answers) {
        return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
      }
  
      await prisma.response.createMany({
        data: answers.map((answer: any) => ({
          userEmail,
          questionId: answer.questionId,
          answer: answer.answer,
        })),
      });
  
      return NextResponse.json({ message: "Réponses enregistrées" }, { status: 201 });
    } catch (error) {
      console.error("Erreur serveur:", error); // 👈 Affiche l'erreur
      return NextResponse.json({ error: "Erreur lors de la soumission" }, { status: 500 });
    }
}
