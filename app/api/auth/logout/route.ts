import { NextResponse } from "next/server";

export async function GET() {
  // Supprime le cookie JWT en définissant Max-Age=0
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");

  return response;
}
