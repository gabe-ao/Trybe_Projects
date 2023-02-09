import React from 'react';
import { setTimeout } from 'timers/promises';
import { screen, waitFor } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */

import App from '../../App';
import renderWRP from '../helpers/renderWithRouterAndProvider';
import productsMock from '../mocks/productsMock';
import { customerUser, setUserLocalStorage } from '../mocks/userMocks';

const pageLoadingTime = 2000;
const numCardsPerPage = 11;

describe('#### Avalia a Tela Customer Products ####', () => {
  localStorage.clear();
  const localData = JSON.stringify(setUserLocalStorage(customerUser));
  localStorage.setItem('user', localData);

  beforeEach(async () => {
    const { history } = renderWRP(<App />);
    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));
    await setTimeout(pageLoadingTime);
  });

  it('1 - Os nomes dos produtos estão sendo exibidos?', () => {
    productsMock.forEach(({ name }) => {
      const target = screen.getByText(`${name}`);
      expect(target).toBeInTheDocument();
    });
  });

  it('2 - Os preços dos produtos estão sendo exibidos?', () => {
    productsMock.forEach((_product, index) => {
      const testId = `customer_products__element-card-price-${index + 1}`;
      const target = screen.getByTestId(testId);
      expect(target).toBeInTheDocument();
    });
  });

  it('3 - As imagens dos produtos estão sendo exibidas?', () => {
    productsMock.forEach(({ name, url_image: urlImage }) => {
      const target = screen.getByRole('img', { name });
      expect(target).toBeInTheDocument();
      expect(target).toHaveAttribute('src', urlImage);
    });
  });

  it('4 - Os botões "-" estão sendo exibidos?', () => {
    const buttons = screen.getAllByRole('button', { name: '-' });
    expect(buttons.length).toBe(numCardsPerPage);
    buttons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('5 - Os botões "+" estão sendo exibidos?', () => {
    const buttons = screen.getAllByRole('button', { name: '+' });
    expect(buttons.length).toBe(numCardsPerPage);
    buttons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('6 - Os inputs de quantidade estão sendo exibidos?', () => {
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(numCardsPerPage);
    inputs.forEach((input) => expect(input).toBeInTheDocument());
  });

  it('7 - O botão de carrinho está sendo exibido?', () => {
    const carrinho = screen.getByRole('button', { name: /ver carrinho:/i });
    expect(carrinho).toBeInTheDocument();
    expect(carrinho).toBeDisabled();
  });
});
