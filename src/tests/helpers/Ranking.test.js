import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

import App from '../../App';
import Ranking from '../../pages/Ranking';

describe('Testando a página Ranking', () => {
  test('Deve possuir o titulo Ranking na tela', () => {
    renderWithRouterAndRedux(<Ranking />);

    const ranking = screen.getByTestId('ranking-title')
    expect(ranking).toBeInTheDocument()
  });
  test('Deve possuir o botão para voltar pro inicio do jogo', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');

    const btnGoHome = screen.getByTestId('btn-go-home')
    expect(btnGoHome).toBeInTheDocument();

    userEvent.click(btnGoHome)
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Deve possuir o nome do jogador', async () => {
    renderWithRouterAndRedux(<Ranking />);

    const playerName = await screen.getByTestId('player-name-0')
    expect(playerName).toBeInTheDocument();
  });
  test('Deve possuir o score do jogador', async () => {
    renderWithRouterAndRedux(<Ranking />);

    const playerScore = await screen.getByTestId('player-score-0')
    expect(playerScore).toBeInTheDocument();
  });
});
//teste