'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Wrapper from '@/app/components/Wrapper';

export default function PreviewQuestionnairePage() {
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  async function sendQuestionnaire() {
    const response = await fetch('/api/questionnaire', {
      method: 'POST',
      body: JSON.stringify({
        title: "Évaluation de la Formation",
        questions,
      }),
    });

    if (response.ok) {
      alert('Questionnaire envoyé avec succès !');
      localStorage.removeItem('questions');
      router.push('/');
    } else {
      alert('Erreur lors de l’envoi.');
    }
  }

  return (
    <Wrapper>
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Prévisualisation du Questionnaire</h1>
      <form className="mb-4">
        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold mb-2">{q.text}</p>
            {q.type === "TRUE_FALSE" && (
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                <span className="ml-2">Oui / Non</span>
              </label>
            )}
            {q.type === "TEXT" && (
              <textarea className="border rounded p-2 w-full" rows={3} />
            )}
            {q.type === "MULTIPLE_CHOICE" && (
              <select className="border rounded p-2 w-full">
                <option value="">Sélectionnez une option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            )}
          </div>
        ))}
      </form>
      <div className="flex space-x-4">
        <Link href="/questionnaire/create">
          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            Modifier
          </button>
        </Link>
        <button
          onClick={sendQuestionnaire}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </div>
    </main>
    </Wrapper>
  );
}
