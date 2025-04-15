'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Wrapper from '@/app/components/Wrapper';

interface Questionnaire {
  id: string;
  title: string;
  createdAt: string;
}

export default function AllQuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  async function fetchQuestionnaires() {
    try {
      const res = await fetch('/api/questionnaire', {
        method: 'GET',
        credentials: 'include',
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setQuestionnaires(data);
      } catch (err) {
        console.error(" Erreur de parsing JSON :", text);
        throw new Error("Le serveur a retourné une réponse invalide.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuestionnaire(id: string) {
    try {
      const res = await fetch(`/api/questionnaire/${id}`, {
        method: 'DELETE',
        credentials: 'include', // 🔥 Envoie les cookies JWT
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      fetchQuestionnaires(); // Rafraîchir la liste après suppression
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Wrapper>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Liste des Questionnaires</h1>

        {loading ? (
          <p className="text-gray-500">Chargement en cours...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : questionnaires.length === 0 ? (
          <p className="text-gray-500">Aucun questionnaire disponible.</p>
        ) : (
          <ul className="list-disc pl-5">
            {questionnaires.map((q) => (
              <li key={q.id} className="mb-2 flex items-center justify-between">
                <Link href={`/questionnaire/${q.id}`} className="text-blue-500 hover:underline">
                  {q.title} (créé le {new Date(q.createdAt).toLocaleDateString()})
                </Link>
                <button
                  onClick={() => deleteQuestionnaire(q.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}

        <Link href="/">
          <button className="mt-6 bg-gray-400 text-white px-4 py-2 rounded">
            Retour à l'accueil
          </button>
        </Link>
      </main>
    </Wrapper>
  );
}
