'use client';

import Link from 'next/link';
import Wrapper from './components/Wrapper';

export default function HomePage() {
  return (
    <Wrapper>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Bienvenue sur l'outil de Questionnaires</h1>
        <p className="mb-6">
          Créez des questionnaires interactifs, collectez des réponses, et analysez facilement les résultats.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/questionnaire/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Créer un questionnaire
            </button>
          </Link>
          <Link href="/questionnaire/preview">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Prévisualiser le questionnaire
            </button>
          </Link>
          <Link href="/results">
            <button className="bg-gray-500 text-white px-4 py-2 rounded">
              Voir les résultats
            </button>
          </Link>
          <Link href="/questionnaire/all">
            <button className="bg-purple-500 text-white px-4 py-2 rounded">
              Tous les questionnaires
            </button>
          </Link>
        </div>
      </main>
    </Wrapper>
  );
}
