import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

import App from '../../App';
import Feedback from '../../pages/Feedback';

describe('Testando a página Feedback', () => {
  test('Deve possuir um feedback para o jogador', () => {
    renderWithRouterAndRedux(<Feedback />);

    const message = screen.getByTestId('feedback-text')
    expect(message).toBeInTheDocument()
  });
  test('Deve possuir a pontuação do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);

    const score = screen.getByTestId('feedback-total-question')
    expect(score).toBeInTheDocument()
  });
  test('Deve possuir o total de acertos do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);

    const assertions = screen.getByTestId('feedback-total-question')
    expect(assertions).toBeInTheDocument()
  });
  test('Deve possuir um botão com o nome Ranking e leva para /ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnRanking = screen.getByTestId('btn-ranking')
    expect(btnRanking).toBeInTheDocument()

    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
  test('Deve possuir um botão com o nome Play Again e leva para a pagina inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    const btnPlayAgain = screen.getByTestId('btn-play-again')
    expect(btnPlayAgain).toBeInTheDocument()

    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});