import jwt from "jsonwebtoken";

// Vérifier que la clé secrète JWT est bien définie
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("ERREUR: JWT_SECRET n'est pas défini dans .env !");
}

// Générer un token JWT
export function generateToken(payload: object): string {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }); // Expire en 1 jour
  } catch (error: any) {
    console.error("❌ Erreur lors de la génération du token JWT:", error.message);
    throw new Error("Erreur interne lors de la création du token.");
  }
}

// Vérifier et décoder un token JWT
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error: any) {
    // console.error("Erreur de vérification du token JWT:", error.message);
    return null; // Retourne `null` en cas d'erreur
  }
}

// 🛠 Décoder un token sans vérification de la signature (utile pour debug)
export function decodeToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch (error: any) {
    console.error("Erreur de décodage du token JWT:", error.message);
    return null;
  }
}
