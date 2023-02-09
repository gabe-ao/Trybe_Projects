import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';



describe('Testa o componente Profile', () => {
  test('Testa rotas botões Profile', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const doneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
    
    history.push('/profile');
    const FavRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(FavRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
    
    history.push('/profile');
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');    

  });
test('Testa retorno da função getEmail do localstorage', async () => {
    const { history } = renderWithRouter(<App />);

    const email = { email: 'beto@uol.com.br' }  
    localStorage.setItem('user',JSON.stringify(email));
  
    history.push('/profile');
 
    expect(screen.getByText(/beto@uol.com.br/ig)).toBeInTheDocument();
  });

});