import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ Import des matchers Jest (ex: .toBeInTheDocument())
import userEvent from '@testing-library/user-event';
import HomePage from '../../../../app/page';

describe('<HomePage />', async () => {
  beforeEach(() => {
    // 🎯 ARRANGE: Rendu du composant
    render(<HomePage />);
  });

  test('✅ Affiche le titre principal', () => {
    // 🎯 ASSERT: Vérifier si le titre principal est affiché
    expect(screen.getByText(/Bienvenue sur l'outil de Questionnaires/i)).toBeInTheDocument();
  });

  test('✅ Affiche la description', () => {
    // 🎯 ASSERT: Vérifier si la description est bien présente
    expect(screen.getByText(/Créez des questionnaires interactifs, collectez des réponses/i)).toBeInTheDocument();
  });

  test('✅ Vérifie la présence de tous les boutons', () => {
    // 🎯 ASSERT: Vérifier si chaque bouton est bien rendu
    expect(screen.getByRole('button', { name: /Créer un questionnaire/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Prévisualiser le questionnaire/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voir les résultats/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tous les questionnaires/i })).toBeInTheDocument();
  });

  test('✅ Vérifie que les boutons sont cliquables', async () => {
    // 🎯 ARRANGE: Récupération du bouton
    const user = userEvent.setup();
    const createBtn = screen.getByRole('button', { name: /Créer un questionnaire/i });

    // 🎯 ACT: L'utilisateur clique sur le bouton
    await user.click(createBtn);

    // 🎯 ASSERT: Vérifier que le bouton est bien interactif
    expect(createBtn).toBeEnabled();
  });

  test('✅ Vérifie que les liens redirigent correctement', () => {
    // 🎯 ASSERT: Vérifier les URLs des liens
    expect(screen.getByRole('link', { name: /Créer un questionnaire/i })).toHaveAttribute('href', '/questionnaire/create');
    expect(screen.getByRole('link', { name: /Prévisualiser le questionnaire/i })).toHaveAttribute('href', '/questionnaire/preview');
    expect(screen.getByRole('link', { name: /Voir les résultats/i })).toHaveAttribute('href', '/results');
    expect(screen.getByRole('link', { name: /Tous les questionnaires/i })).toHaveAttribute('href', '/questionnaire/all');
  });

  test('✅ Vérifie que le composant `Wrapper` est bien utilisé', () => {
    // 🎯 ASSERT: Vérifier que `Wrapper` est bien affiché via son testID
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  test('✅ Vérifie l’application des styles Tailwind', () => {
    // 🎯 ARRANGE: Sélection de l'élément <main>
    const mainElement = screen.getByRole('main');

    // 🎯 ASSERT: Vérifier si les classes Tailwind sont bien appliquées
    expect(mainElement).toHaveClass('container mx-auto p-6');
  });
});
