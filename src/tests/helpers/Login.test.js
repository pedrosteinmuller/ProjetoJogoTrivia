import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';


describe('Testando a página Login', () => {
  test('Deve possuir um campo de texto para o nome', () => {
    render(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();
  });
  test('Deve possuir um campo de texto para o email', () => {
    render(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
  });
  test('Deve existir um botão play', () => {
    render(<Login />);

    const playButton = screen.getByTestId('btn-play');
    expect(playButton).toBeInTheDocument();
  });
  test('A pessoa que joga deve conseguir escrever seu nome no input de texto', () => {
    render(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(nameInput, 'Pessoa');
    expect(nameInput.value).toBe('Pessoa');
  });
  test('A pessoa que joga deve conseguir escrever seu email no input de email', () => {
    render(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'pessoa@gmail.com');
    expect(emailInput.value).toBe('pessoa@gmail.com');
  });
});
