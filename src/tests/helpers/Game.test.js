import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

import Game from '../../pages/Game';

describe('Testando a página Game', () => {
  test('Deve possuir a categoria da questão', async () => {
    renderWithRouterAndRedux(<Game />);

    const category = await screen.getByTestId('question-category')
    expect(category).toBeInTheDocument()
  });
  test('Deve possuir o texto da questão', async () => {
    renderWithRouterAndRedux(<Game />);

    const text = await screen.getByTestId('question-text')
    expect(text).toBeInTheDocument()
  });
  test('Deve possuir as alternativas da questão', async () => {
    renderWithRouterAndRedux(<Game />);

    const ansewerOptions = await screen.getByTestId('answer-options')
    expect(ansewerOptions).toBeInTheDocument()
  });
  test('Deve mostrar a imagem do jogador', async () => {
    renderWithRouterAndRedux(<Game />);

    const img = await screen.getByTestId('header-profile-picture')
    expect(img).toBeInTheDocument()
  });
  test('Deve mostrar o nome do jogador', async () => {
    renderWithRouterAndRedux(<Game />);

    const name = await screen.getByTestId('header-player-name')
    expect(name).toBeInTheDocument()
  });
  test('Deve mostrar o score do jogador', async () => {
    renderWithRouterAndRedux(<Game />);

    const score = await screen.getByTestId('header-score')
    expect(score).toBeInTheDocument()
  });
});