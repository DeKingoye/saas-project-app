import { NextResponse } from "next/server";

export const runtime = "nodejs"; 

export async function GET() {
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");

  return response;
}
