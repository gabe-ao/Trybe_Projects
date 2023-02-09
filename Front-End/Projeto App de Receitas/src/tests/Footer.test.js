import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Footer', () => {
  test('Testa conteudo dentro do elemento Footer', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const foods = screen.getByTestId('drinks-bottom-btn')
    expect(foods).toBeInTheDocument();
    const drinks = screen.getByTestId('food-bottom-btn')
    expect(drinks).toBeInTheDocument();
  
  });
});
