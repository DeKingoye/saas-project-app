// // // // import Link from 'next/link';
// // // // export default function Navbar() {
// // // //   return (
// // // //     <nav>
// // // //       <Link href='/'>Accueil</Link>
// // // //       <Link href='/questionnaire/all'>Questionnaires</Link>
// // // //     </nav>
// // // //   );
// // // // }


// // // "use client";

// // // import { useContext } from "react";
// // // import { AuthContext } from "@/context/AuthContext";

// // // export default function Navbar() {
// // //   const { user } = useContext(AuthContext);

// // //   return (
// // //     <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
// // //       <h1 className="text-lg font-bold">Mon App</h1>
// // //       {user ? (
// // //         <p>Bienvenue, {user.name} 👋</p>
// // //       ) : (
// // //         <a href="/login" className="bg-white text-blue-500 px-4 py-2 rounded">Se connecter</a>
// // //       )}
// // //     </nav>
// // //   );
// // // }


// // "use client";

// // import { useAuth } from "@/context/AuthContext";
// // import { useRouter } from "next/navigation";

// // export default function Navbar() {
// //   const { user, setUser } = useAuth();
// //   const router = useRouter();

// //   // 🔴 Fonction pour se déconnecter et rediriger vers `/auth/sign-in`
// //   const handleLogout = async () => {
// //     await fetch("/api/auth/logout"); // Supprime le token JWT
// //     setUser(null); // Réinitialise l'état utilisateur
// //     router.push("/auth/sign-in"); // Redirige vers la page de connexion
// //   };

// //   return (
// //     <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
// //       <h1 className="text-lg font-bold">Mon App</h1>

// //       {user ? (
// //         <div className="flex items-center gap-4">
// //           <p>Bienvenue, {user.name} 👋</p>
// //           <button
// //             onClick={handleLogout}
// //             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
// //           >
// //             Déconnexion
// //           </button>
// //         </div>
// //       ) : (
// //         <a href="/auth/sign-in" className="bg-white text-blue-500 px-4 py-2 rounded">
// //           Se connecter
// //         </a>
// //       )}
// //     </nav>
// //   );
// // }


// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { user, setUser } = useAuth();
//   const router = useRouter();

//   // 🔴 Fonction de déconnexion
//   const handleLogout = async () => {
//     await fetch("/api/auth/logout");
//     setUser(null); // 🔴 Mettre à jour l'état immédiatement
//     router.push("/auth/sign-in");
//   };

//   return (
//     <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
//       <h1 className="text-lg font-bold">Mon App</h1>

//       {user ? (
//         <div className="flex items-center gap-4">
//           <p>Bienvenue, {user.name} 👋</p>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Déconnexion
//           </button>
//         </div>
//       ) : (
//         <a href="/auth/sign-in" className="bg-white text-blue-500 px-4 py-2 rounded">
//           Se connecter
//         </a>
//       )}
//     </nav>
//   );
// }


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
      <h1 className="text-lg font-bold">Mon App</h1>

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
