// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const response = NextResponse.json({ message: 'Déconnexion réussie' }, { status: 200 });
//     response.cookies.set('auth_token', '', { httpOnly: true, secure: true, path: '/', maxAge: 0 });
//     return response;
//   } catch (error) {
//     console.error("Erreur serveur:", error);
//     return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

export async function GET() {
  // Supprime le cookie JWT en définissant Max-Age=0
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");

  return response;
}
