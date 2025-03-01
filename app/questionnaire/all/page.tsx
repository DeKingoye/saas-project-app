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

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  async function fetchQuestionnaires() {
    const res = await fetch('/api/questionnaire');
    const data = await res.json();
    setQuestionnaires(data);
  }

  async function deleteQuestionnaire(id: string) {
    const res = await fetch(`/api/questionnaire/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchQuestionnaires();
    } else {
      alert('Erreur lors de la suppression.');
    }
  }

  return (
    <Wrapper>
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des Questionnaires</h1>
      {questionnaires.length === 0 ? (
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
