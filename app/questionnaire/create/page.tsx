'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Wrapper from '@/app/components/Wrapper';

type QuestionType = "TEXT" | "TRUE_FALSE" | "MULTIPLE_CHOICE";


interface Question {
  text: string;
  type: QuestionType;
}

export default function CreateQuestionnairePage() {
  const [questions, setQuestions] = useState<Question[]>([{ text: "", type: "TEXT" }]);
  const router = useRouter();

  
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  
  function handleQuestionChange<K extends keyof Question>(
    index: number,
    field: K,
    value: Question[K]
  ) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      )
    );
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
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value as QuestionType)}
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
