import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import renderWRP from '../helpers/renderWithRouterAndProvider';
import { validUser, invalidUser } from '../mocks/userMocks';

function getElementsOfInterest() {
  const nome = screen.getByRole('textbox', { name: /nome/i });
  const email = screen.getByRole('textbox', { name: /email/i });
  const senha = screen.getByLabelText(/senha/i);
  const botaoCadastro = screen.getByRole('button', { name: /cadastrar/i });
  const msgJaCadastrado = screen.getByText(/dados inválidos ou usuário já cadastrado!/i, { hidden: true });
  return { nome, email, senha, botaoCadastro, msgJaCadastrado };
}

describe('#### Avalia a Tela de Register ####', () => {
  beforeEach(() => {
    localStorage.clear();
    const { history } = renderWRP(<App />);
    history.push('/register');
  });

  it('1 - Os elementos básicos estão sendo exibidos?', () => {
    const { nome, email, senha,
      botaoCadastro, msgJaCadastrado } = getElementsOfInterest();
    expect(nome).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botaoCadastro).toBeInTheDocument();
    expect(msgJaCadastrado).toBeInTheDocument();
    expect(msgJaCadastrado).not.toBeVisible();
  });

  it('2 - Botão cadastro é liberado com dados válidos?', () => {
    const { nome, email, senha, botaoCadastro } = getElementsOfInterest();
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, validUser.name);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeEnabled();
  });

  it('3 - Nome inválido bloqueia cadastro?', () => {
    const { nome, email, senha, botaoCadastro } = getElementsOfInterest();
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, invalidUser.name);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeDisabled();
  });

  it('4 - Senha inválida bloqueia cadastro?', () => {
    const { nome, email, senha, botaoCadastro } = getElementsOfInterest();
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, validUser.name);
    userEvent.type(senha, invalidUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeDisabled();
  });

  it('5 - Email inválido bloqueia cadastro?', () => {
    const { nome, email, senha, botaoCadastro } = getElementsOfInterest();
    expect(botaoCadastro).toBeDisabled();

    userEvent.type(nome, validUser.name);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, invalidUser.email);
    expect(botaoCadastro).toBeDisabled();
  });

  it('6 - Conclui cadastro com dados válidos?', async () => {
    const { nome, email, senha, botaoCadastro } = getElementsOfInterest();

    userEvent.type(nome, validUser.name);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeEnabled();
    userEvent.click(botaoCadastro);
    await waitFor(() => expect(botaoCadastro).not.toBeInTheDocument());
  });

  it('7 - Lança mensagem de erro quando os dados já estão cadastrados?', async () => {
    const { nome, email, senha,
      botaoCadastro, msgJaCadastrado } = getElementsOfInterest();

    userEvent.type(nome, validUser.name);
    userEvent.type(senha, validUser.senha);
    userEvent.type(email, validUser.email);
    expect(botaoCadastro).toBeEnabled();
    userEvent.click(botaoCadastro);
    await waitFor(() => expect(msgJaCadastrado).toBeVisible());
  });
});
