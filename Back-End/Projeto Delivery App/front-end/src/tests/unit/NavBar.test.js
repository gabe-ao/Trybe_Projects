import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../App';
import renderWRP from '../helpers/renderWithRouterAndProvider';
import { customerUser, setUserLocalStorage } from '../mocks/userMocks';

const productsPath = '/customer/products';
const ordersPath = '/customer/orders';

describe('#### Avalia o componente NavBar ####', () => {
  localStorage.clear();
  const localData = JSON.stringify(setUserLocalStorage(customerUser));
  localStorage.setItem('user', localData);

  it('1 - Os elementos básicos estão sendo exibidos?', async () => {
    const { history } = renderWRP(<App />);
    await waitFor(() => expect(history.location.pathname).toBe(productsPath));

    const produtos = screen.getByRole('button', { name: /produtos/i });
    const pedidos = screen.getByRole('button', { name: /meus pedidos/i });
    const userName = screen.getByText(/cliente zé birita/i);
    const sair = screen.getByRole('button', { name: /sair/i });

    expect(produtos).toBeInTheDocument();
    expect(pedidos).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(sair).toBeInTheDocument();
  });

  it('2 - O botão Meus Pedidos redireciona para a tela de pedidos?', async () => {
    const { history } = renderWRP(<App />);
    await waitFor(() => expect(history.location.pathname).toBe(productsPath));

    const pedidos = screen.getByRole('button', { name: /meus pedidos/i });
    userEvent.click(pedidos);
    await waitFor(() => expect(history.location.pathname).toBe(ordersPath));
  });

  it('3 - O botão Produtos redireciona para a tela de Produtos?', async () => {
    const { history } = renderWRP(<App />);
    await waitFor(() => expect(history.location.pathname).toBe(productsPath));

    history.push(ordersPath);
    await waitFor(() => expect(history.location.pathname).toBe(ordersPath));

    const produtos = screen.getByRole('button', { name: /produtos/i });
    userEvent.click(produtos);
    await waitFor(() => expect(history.location.pathname).toBe(productsPath));
  });

  it('4 - Sair apaga os dados de acesso e redireciona à tela de login?', async () => {
    const { history } = renderWRP(<App />);
    await waitFor(() => expect(history.location.pathname).toBe(productsPath));
    const sair = screen.getByRole('button', { name: /sair/i });

    userEvent.click(sair);
    await waitFor(() => expect(history.location.pathname).toBe('/login'));
    expect(localStorage.getItem('user')).toBe(null);
  });
});
