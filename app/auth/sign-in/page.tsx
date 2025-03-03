// ça marche

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"; // 🔵 Importer Link pour la navigation

export default function SignInPage() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erreur lors de la connexion");
      return;
    }

    setUser({ name: data.user.name, email: data.user.email });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="mb-2 p-2 border rounded"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" className="mb-2 p-2 border rounded"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Se connecter
          </button>
        </form>

    
        <p className="text-center mt-4">
          Pas encore de compte ?{" "}
          <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
