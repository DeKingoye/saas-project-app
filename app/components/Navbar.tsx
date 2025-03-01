"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    setUser(null);
    router.push("/auth/sign-in");
  };

  // 🔴 Pendant le chargement, ne rien afficher
  if (isLoading) return null;

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
      <h1 className="text-lg font-bold">FormOrd</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <p>Bienvenue, {user.name} 👋</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <a href="/auth/sign-in" className="bg-white text-blue-500 px-4 py-2 rounded">
          Se connecter
        </a>
      )}
    </nav>
  );
}
