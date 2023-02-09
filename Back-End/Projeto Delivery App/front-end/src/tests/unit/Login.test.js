import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import renderWRP from '../helpers/renderWithRouterAndProvider';
import { validUser, invalidUser, customerUser,
  sellerUser, adminUser } from '../mocks/userMocks';

describe('#### Avalia a Tela de Login ####', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1 - Os elementos básicos estão sendo exibidos?', () => {
    renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });
    const novaConta = screen.getByRole('button', { name: /ainda não tenho conta/i });
    const msgLoginInvalido = screen.getByText(/email ou senha invalido!/i);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botaoLogin).toBeInTheDocument();
    expect(novaConta).toBeInTheDocument();
    expect(msgLoginInvalido).toBeInTheDocument();
    expect(msgLoginInvalido).not.toBeVisible();
  });

  it('2 - Clicar no botão de cadastro leva para a página de cadastro?', async () => {
    const { history } = renderWRP(<App />);
    const novaConta = screen.getByRole('button', { name: /ainda não tenho conta/i });

    expect(history.location.pathname).toBe('/login');
    userEvent.click(novaConta);
    expect(history.location.pathname).toBe('/register');
    expect(novaConta).not.toBeInTheDocument();
  });

  it('3 - A rota "/" é redirecionada para "/login"?', async () => {
    const { history } = renderWRP(<App />);
    const novaConta = screen.getByRole('button', { name: /ainda não tenho conta/i });

    userEvent.click(novaConta);
    expect(history.location.pathname).toBe('/register');
    history.push('/');
    expect(history.location.pathname).toBe('/login');
    history.push('/test');
    expect(history.location.pathname).toBe('/test');
    history.push('/');
    expect(history.location.pathname).toBe('/login');
  });

  it('4 - Botão login é liberado com dados válidos?', () => {
    renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });
    expect(botaoLogin).toBeDisabled();

    userEvent.type(email, validUser.email);
    userEvent.type(senha, validUser.senha);
    expect(botaoLogin).toBeEnabled();
  });

  it('5 - Email inválido bloqueia login?', () => {
    renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });
    expect(botaoLogin).toBeDisabled();

    userEvent.type(email, invalidUser.email);
    userEvent.type(senha, validUser.senha);
    expect(botaoLogin).toBeDisabled();
  });

  it('6 - Senha inválida bloqueia login?', () => {
    renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });
    expect(botaoLogin).toBeDisabled();

    userEvent.type(email, validUser.email);
    userEvent.type(senha, invalidUser.senha);
    expect(botaoLogin).toBeDisabled();
  });

  it('7 - Login falha com dados válidos não cadastrados?', async () => {
    renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });
    const msgLoginInvalido = screen.getByText(/email ou senha invalido!/i);

    userEvent.type(email, validUser.email);
    userEvent.type(senha, validUser.senha);
    expect(botaoLogin).toBeEnabled();
    userEvent.click(botaoLogin);
    await waitFor(() => expect(msgLoginInvalido).toBeVisible());
    expect(msgLoginInvalido).toBeVisible();
  });

  it('8 - Customer pode logar com sucesso?', async () => {
    const { history } = renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(email, customerUser.email);
    userEvent.type(senha, customerUser.senha);
    expect(botaoLogin).toBeEnabled();
    userEvent.click(botaoLogin);
    await waitForElementToBeRemoved(botaoLogin);
    expect(history.location.pathname).toBe('/customer/products');
  });

  it('9 - Seller pode logar com sucesso?', async () => {
    const { history } = renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(email, sellerUser.email);
    userEvent.type(senha, sellerUser.senha);
    expect(botaoLogin).toBeEnabled();
    userEvent.click(botaoLogin);
    await waitForElementToBeRemoved(botaoLogin);
    expect(history.location.pathname).toBe('/seller/orders');
  });

  it('10 - Admin pode logar com sucesso?', async () => {
    const { history } = renderWRP(<App />);

    const email = screen.getByRole('textbox', { name: /login/i });
    const senha = screen.getByLabelText(/senha/i);
    const botaoLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(email, adminUser.email);
    userEvent.type(senha, adminUser.senha);
    expect(botaoLogin).toBeEnabled();
    userEvent.click(botaoLogin);
    await waitForElementToBeRemoved(botaoLogin);
    expect(history.location.pathname).toBe('/admin/manage');
  });

  it('11 - Redireciona customer logado previamente?', async () => {
    localStorage.setItem('user', JSON.stringify({ role: 'customer' }));
    const { history } = renderWRP(<App />);
    expect(history.location.pathname).toBe('/customer/products');
  });

  it('12 - Redireciona seller logado previamente?', async () => {
    localStorage.setItem('user', JSON.stringify({ role: 'seller' }));
    const { history } = renderWRP(<App />);
    expect(history.location.pathname).toBe('/seller/orders');
  });
});
