// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// // ✅ Pages accessibles sans authentification
// const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { user, isLoading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     // ✅ Si l'utilisateur n'est pas connecté et qu'il n'est pas sur une page publique ➜ Redirection
//     if (!isLoading && !user && !publicRoutes.includes(pathname)) {
//       router.push("/auth/sign-in");
//     }
//   }, [user, isLoading, pathname, router]);

//   if (isLoading) return <p className="text-center mt-10">Chargement...</p>;
//   if (!user && !publicRoutes.includes(pathname)) return null;

//   return <>{children}</>;
// }


"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// ✅ Pages accessibles sans authentification
const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

// ✅ Pages qui doivent rediriger **instantanément** sans affichage du loader
const instantRedirectRoutes = ["/", "/questionnaire/create", "/questionnaire/preview", "/questionnaire/all"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      if (instantRedirectRoutes.includes(pathname)) {
        // ✅ Redirection immédiate sans loader
        router.replace("/auth/sign-in");
      } else if (!publicRoutes.includes(pathname)) {
        // ✅ Redirection normale avec léger chargement
        router.push("/auth/sign-in");
      }
    }
  }, [user, isLoading, pathname, router]);

  // ✅ Empêcher l'affichage du contenu si la page nécessite une redirection instantanée
  if (!user && instantRedirectRoutes.includes(pathname)) return null;

  return <>{children}</>;
}
