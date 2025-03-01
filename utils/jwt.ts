// // // import jwt from "jsonwebtoken";

// // // const JWT_SECRET = process.env.JWT_SECRET as string;

// // // if (!JWT_SECRET) {
// // //   throw new Error("⚠️ JWT_SECRET is not défini dans .env.local");
// // // }

// // // // 🎟 Générer un token JWT
// // // export function generateToken(payload: object): string {
// // //   return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }); // Expire en 1 jour
// // // }

// // // // 🔍 Vérifier et décoder un token JWT
// // // export function verifyToken(token: string): any {
// // //   try {
// // //     return jwt.verify(token, JWT_SECRET);
// // //   } catch (error) {
// // //     return null;
// // //   }
// // // }


// // import jwt from "jsonwebtoken";

// // const JWT_SECRET = process.env.JWT_SECRET as string;

// // if (!JWT_SECRET) {
// //   throw new Error("⚠️ JWT_SECRET is not défini dans .env.local");
// // }

// // // 🎟 Générer un token JWT
// // export function generateToken(payload: object): string {
// //   return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
// // }

// // // 🔍 Vérifier et décoder un token JWT
// // export function verifyToken(token: string): any {
// //   try {
// //     return jwt.verify(token, JWT_SECRET);
// //   } catch (error) {
// //     return null;
// //   }
// // }


// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string;
// if (!JWT_SECRET) {
//   throw new Error("⚠️ JWT_SECRET n'est pas défini dans .env.local");
// }

// // 🎟 Générer un token JWT
// export function generateToken(payload: object): string {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }); // Expire en 1 jour
// }

// // 🔍 Vérifier et décoder un token JWT
// export function verifyToken(token: string): any {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     throw new Error("Token invalide");
//   }
// }

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("⚠️ JWT_SECRET is not défini dans .env.local");
}

// 🎟 Générer un token JWT
export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }); // Expire en 1 jour
}

// 🔍 Vérifier et décoder un token JWT
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
