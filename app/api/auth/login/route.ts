import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePasswords } from "../../../../utils/auth";
import { generateToken } from "../../../../utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();


    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

   
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

   
    const token = generateToken({ id: user.id, name: user.name, email: user.email });

    const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=86400`
    );

    return response;
  } catch (error) {
    console.error("❌ Erreur lors de la connexion:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
