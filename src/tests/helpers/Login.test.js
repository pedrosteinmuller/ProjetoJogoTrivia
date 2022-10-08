import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';

describe('Testando a página Login', () => {
  test('Deve possuir um campo de texto para o nome', () => {
    renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();
  });
  test('Deve possuir um campo de texto para o email', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
  });
  test('Deve existir um botão play', () => {
    renderWithRouterAndRedux(<Login />);

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
  });
  test('A pessoa que joga deve conseguir escrever seu nome no input de texto', () => {
    renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(nameInput, 'Pessoa');
    expect(nameInput.value).toBe('Pessoa');
  });
  test('A pessoa que joga deve conseguir escrever seu email no input de email', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'pessoa@gmail.com');
    expect(emailInput.value).toBe('pessoa@gmail.com');
  });
  test('Testa se existe um botão para ir em configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const btnConfig = screen.getByRole('button', {
      name: /configurações/i,
    });
    expect(btnConfig).toBeInTheDocument();

    userEvent.click(btnConfig);

    const { pathname } = history.location;
    expect(pathname).toBe('/config');
  });
  test('Testa se existe um botão para ir a tela de game', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, 'pessoa1@gmail.com');
    expect(email.value).toBe('pessoa1@gmail.com');

    const nameInput = screen.getByPlaceholderText(/nome/i);
    userEvent.type(nameInput, 'Pessoa1');
    expect(nameInput.value).toBe('Pessoa1');

    const btnPlay = screen.getByRole('button', {
      name: /play/i,
    });
    expect(btnPlay).toBeInTheDocument();

    userEvent.click(btnPlay);
  });
});
