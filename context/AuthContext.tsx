// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// // Définition du contexte
// export const AuthContext = createContext<{ user: any; setUser: any; isLoading: boolean } | undefined>(undefined);

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // ✅ Ajout d'un état de chargement

//   useEffect(() => {
//     fetch("/api/auth/me")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.user) setUser(data.user);
//       })
//       .catch(() => setUser(null))
//       .finally(() => setIsLoading(false)); // ✅ Fin du chargement
//   }, []);

//   return <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>;
// }

// // Hook pour utiliser l'authentification
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";

// ✅ Définition du contexte
export const AuthContext = createContext<{ user: any; setUser: any; isLoading: boolean } | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>;
}

// ✅ Hook d'authentification
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
