import React from 'react';
import { within, screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa CategoryFilters foods', () => {
  test('Testa category filters foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const shareBtn = screen.findByAltText(/compartilhar/i)
    userEvent.click(shareBtn);
    screen.findByText(/link copied/ig)

  });
});