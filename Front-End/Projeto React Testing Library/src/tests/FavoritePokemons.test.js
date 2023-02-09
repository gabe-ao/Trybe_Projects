import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Tests for component FavoritePokemons:', () => {
  it('Shows the no-favorites message?', () => {
    render(<FavoritePokemons />);
    const defaultMessage = screen.getByText(/no favorite pokemon found/i);
    expect(defaultMessage).toBeInTheDocument();
  });

  it('Shows favorites pokemons cards?', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonsButtons = [/electric/i, /fire/i, /bug/i, /poison/i,
      /psychic/i, /normal/i, /dragon/i];
    const homeLink = screen.getByRole('link', { name: /home/i });

    pokemonsButtons.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      userEvent.click(button);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      const favoriteCheckbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado/i,
      });
      userEvent.click(favoriteCheckbox);
      userEvent.click(homeLink);
    });
    const favoritesButton = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesButton);
    expect(history.location.pathname).toEqual('/favorites');
    const favorites = screen.getAllByTestId('pokemon-type');
    expect(favorites.length).toEqual(pokemonsButtons.length);
  });
});
