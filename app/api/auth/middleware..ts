import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export async function middleware(req: NextRequest) {
  const publicRoutes = ['/api/auth/register', '/api/auth/login'];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('auth_token');
  if (!token) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
