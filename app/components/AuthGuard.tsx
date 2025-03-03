"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];


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
