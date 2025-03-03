import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userEmail, answers } = body;

        // Vérifier si userEmail et answers sont bien fournis
        if (!userEmail || !answers || answers.length === 0) {
            return NextResponse.json({ error: "Données manquantes ou invalides" }, { status: 400 });
        }

        // Vérifier si l'utilisateur existe bien en base de données
        const userExists = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!userExists) {
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
        }

        // Insérer les réponses dans la base de données
        await prisma.response.createMany({
            data: answers.map((answer: any) => ({
                userEmail,  // ✅ Vérifié qu'il existe dans la table User
                questionId: answer.questionId,
                answer: answer.answer,
            })),
        });

        return NextResponse.json({ message: "Réponses enregistrées avec succès" }, { status: 201 });
    } catch (error) {
        console.error("Erreur serveur:", error);
        return NextResponse.json({ error: "Erreur lors de la soumission des réponses" }, { status: 500 });
    }
}
