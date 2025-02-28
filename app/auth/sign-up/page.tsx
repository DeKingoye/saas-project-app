// // 'use client';
// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';

// // export default function SignUpPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [name, setName] = useState('');
// //   const router = useRouter();

// //   async function handleSignUp() {
// //     const res = await fetch('/api/auth/register', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ email, password, name }),
// //     });
    
// //     if (res.ok) {
// //       router.push('/auth/sign-in'); // Redirection après inscription réussie
// //     } else {
// //       alert('Échec inscription');
// //     }
// //   }

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen">
// //       <h1 className="text-2xl font-bold mb-4">Inscription</h1>
// //       <input type="text" placeholder="Nom" className="border rounded p-2 mb-2" onChange={(e) => setName(e.target.value)} />
// //       <input type="email" placeholder="Email" className="border rounded p-2 mb-2" onChange={(e) => setEmail(e.target.value)} />
// //       <input type="password" placeholder="Mot de passe" className="border rounded p-2 mb-2" onChange={(e) => setPassword(e.target.value)} />
// //       <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSignUp}>S'inscrire</button>
// //       <p className="mt-4">Déjà inscrit ? <Link href="/auth/sign-in" className="text-blue-500">Se connecter</Link></p>
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";

// export default function SignUpPage() {
//   const { setUser } = useAuth();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Erreur lors de l'inscription");
//       return;
//     }

//     setUser({ name: data.user.name, email: data.user.email });
//     router.push("/");
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Créer un compte</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <form className="flex flex-col" onSubmit={handleSignUp}>
//           <input type="text" placeholder="Nom" className="mb-2 p-2 border rounded"
//             value={name} onChange={(e) => setName(e.target.value)} required />
//           <input type="email" placeholder="Email" className="mb-2 p-2 border rounded"
//             value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input type="password" placeholder="Mot de passe" className="mb-2 p-2 border rounded"
//             value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
//             S'inscrire
//           </button>
//         </form>

//         {/* 🔵 Ajouter un lien vers Sign In */}
//         <p className="text-center mt-4">
//           Déjà un compte ?{" "}
//           <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
//             Connectez-vous
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ Pour afficher un message de succès

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erreur lors de l'inscription");
      return;
    }

    setSuccess(true); // ✅ Afficher un message de succès
    setTimeout(() => {
      router.push("/auth/sign-in"); // ✅ Redirection après 2 secondes
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Créer un compte</h2>
        
        {success ? (
          <p className="text-green-500 text-center mb-4">✅ Inscription réussie ! Redirection...</p>
        ) : (
          <>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form className="flex flex-col" onSubmit={handleSignUp}>
              <input type="text" placeholder="Nom" className="mb-2 p-2 border rounded"
                value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="email" placeholder="Email" className="mb-2 p-2 border rounded"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Mot de passe" className="mb-2 p-2 border rounded"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                S'inscrire
              </button>
            </form>

            {/* 🔵 Ajouter un lien vers Sign In */}
            <p className="text-center mt-4">
              Déjà un compte ?{" "}
              <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
