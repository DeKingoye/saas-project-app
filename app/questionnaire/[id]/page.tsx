'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Question = {
  id: string;
  text: string;
  type: string;
};

export default function QuestionnairePage() {
  const params = useParams();
  const questionnaireId = params.id as string; 

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(`/api/questionnaire/${questionnaireId}`);
      const data = await res.json();
      setQuestions(data.questions);
    }
    fetchQuestions();
  }, [questionnaireId]);

  function handleChange(questionId: string, value: string) {
    setAnswers({ ...answers, [questionId]: value });
  }

  async function handleSubmit() {
    const userEmail = "billy@gmail.com"; // Remplacer par l'email de l'utilisateur connecté

    const formattedAnswers = Object.keys(answers).map(questionId => ({
      questionId,
      answer: answers[questionId]
    }));

    const response = await fetch('/api/response', {
      method: 'POST',
      body: JSON.stringify({ userEmail, answers: formattedAnswers }),
    });

    if (!response.ok) {
      console.error('Erreur lors de la soumission:', await response.json());
    } else {
      alert('Merci ! Vos réponses ont bien été envoyées.');
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6">Évaluation de la Formation</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold mb-2">{q.text}</p>
          {q.type === "TEXT" && (
            <textarea
              className="border rounded p-2 w-full"
              rows={3}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "TRUE_FALSE" && (
            <select
              className="border rounded p-2 w-full"
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              <option value="">Sélectionnez</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          )}
          {q.type === "MULTIPLE_CHOICE" && (
            <select
              className="border rounded p-2 w-full"
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              <option value="">Sélectionnez</option>
              <option value="Excellent">Excellent</option>
              <option value="Bon">Bon</option>
              <option value="Moyen">Moyen</option>
              <option value="Faible">Faible</option>
            </select>
          )}
        </div>
      ))}
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>Envoyer</button>
    </div>
  );
}