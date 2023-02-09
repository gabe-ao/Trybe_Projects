import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";
import renderWithRouter from "./renderWithRouter";

describe('Testes da tela de Login', () => {
  it('1 - Verifica se os componentes estão na tela', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
  });

  it('2 - Verifica se o botão está desabilitado caso o email seja inválido', () => {
    renderWithRouter(<App />);

    const invalidEmail = 'lucas.com';
    const userPassword = '1234567';

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    userEvent.type(email, invalidEmail);
    userEvent.type(password, userPassword);
    expect(button).toBeDisabled()
  });

  it('3 - Verifica se o botão está desabilitado caso a senha seja inválido', () => {
    renderWithRouter(<App />);

    const invalidPassword = '0123';
    const userEmail = 'lucas@mail.com';

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    userEvent.type(email, userEmail);
    userEvent.type(password, invalidPassword);
    expect(button).toBeDisabled();
  });

  it('4 - Verifica se o botão está Habilitado caso o email e a senha sejam válidos', () => {
    renderWithRouter(<App />);

    const validPassword = '1234567';
    const validEmail = 'lucas@mail.com';

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);

    expect(button).not.toBeDisabled();
  });

  it('5 - Verifica se ao logar o email é salvo no local Storage', () => {
    renderWithRouter(<App />);

    const validPassword = '1234567';
    const validEmail = 'lucas@mail.com';
    const user = { email: validEmail }

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    expect((localStorage.getItem('user'))).toBe(JSON.stringify(user));
    expect((localStorage.getItem('mealsToken'))).toBe(JSON.stringify(1));
    expect((localStorage.getItem('cocktailsToken'))).toBe(JSON.stringify(1));
  })

})