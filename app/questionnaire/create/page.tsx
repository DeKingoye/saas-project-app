'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Wrapper from '@/app/components/Wrapper';


export default function CreateQuestionnairePage() {
  const [questions, setQuestions] = useState([{ text: "", type: "TEXT" }]);
  const router = useRouter();

  // Charger les questions existantes depuis localStorage
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  function handleQuestionChange(index: number, field: string, value: string) {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  }

  function addQuestion() {
    setQuestions([...questions, { text: "", type: "TEXT" }]);
  }

  function goToPreview() {
    localStorage.setItem('questions', JSON.stringify(questions));
    router.push('/questionnaire/preview');
  }

  return (
    <Wrapper>
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Créer un questionnaire</h1>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Texte de la question"
            className="border rounded p-2 w-full mb-2"
            value={q.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
          />
          <select
            className="border rounded p-2 w-full"
            value={q.type}
            onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
          >
            <option value="TEXT">Texte libre</option>
            <option value="TRUE_FALSE">Vrai / Faux</option>
            <option value="MULTIPLE_CHOICE">Choix multiples</option>
          </select>
        </div>
      ))}
      <div className="flex space-x-4 mb-4">
        <button
            onClick={addQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            Ajouter une question
        </button>
        <button
            onClick={goToPreview}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Créer le questionnaire
        </button>
      </div>
    </main>
    </Wrapper>
  );
}
