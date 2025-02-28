// import bcrypt from 'bcryptjs';
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password, name } = await req.json();
    
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await prisma.user.create({ data: { email, name, password: hashedPassword } });

//     return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });
//   } catch (error) {
//     console.error("Erreur serveur:", error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { hashPassword } from "../../../../utils/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Enregistrer le nouvel utilisateur
    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return NextResponse.json({ success: true, user: { email, name } });
  } catch (error) {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

