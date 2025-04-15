import bcrypt from "bcryptjs";

// 🔐 Hacher un mot de passe avant de l'enregistrer en base de données
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 🔍 Vérifier si un mot de passe correspond à son hash
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
