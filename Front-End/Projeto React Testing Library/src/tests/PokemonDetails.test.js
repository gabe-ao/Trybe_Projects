import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests for PokemonDetails:', () => {
  it('1) Pokemon details are shown correct?', () => {
    renderWithRouter(<App />);
    const moreDetailsButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsButton);
    expect(moreDetailsButton).not.toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const detailsHeading = screen.getByRole('heading', {
      name: `${pokemonName.textContent} Details`,
      level: 2,
    });
    expect(detailsHeading).toBeInTheDocument();
    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const [currentPokemonData] = pokemons
      .filter((pokemon) => pokemon.name === pokemonName.textContent);
    const pokemonDescription = screen.getByText(currentPokemonData.summary);
    expect(pokemonDescription).toBeInTheDocument();
  });

  it('2) Page shows Game Locations section?', () => {
    renderWithRouter(<App />);
    const moreDetailsButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsButton);
    expect(moreDetailsButton).not.toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    const locationsHeading = screen.getByRole('heading', {
      name: `Game Locations of ${pokemonName.textContent}`,
      level: 2,
    });
    expect(locationsHeading).toBeInTheDocument();

    const [currentPokemonData] = pokemons
      .filter((pokemon) => pokemon.name === pokemonName.textContent);
    const maps = screen.getAllByAltText(`${pokemonName.textContent} location`);
    maps.forEach((map) => {
      expect(map).toBeInTheDocument();
      if (map.src === currentPokemonData.foundAt[0].map) {
        expect(map).toHaveProperty('src', currentPokemonData.foundAt[0].map);
        return;
      }
      expect(map).toHaveProperty('src', currentPokemonData.foundAt[1].map);
    });

    currentPokemonData.foundAt.forEach(({ location }) => {
      const pokemonLocation = screen.getByText(location);
      expect(pokemonLocation).toBeInTheDocument();
    });
  });

  it('3) Does favorite checkbox works?', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsButton);
    expect(moreDetailsButton).not.toBeInTheDocument();

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox).not.toBeChecked();
    expect(favoriteCheckbox).toHaveAccessibleName('Pokémon favoritado?');

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
    const emptyFavoriteMsg = screen.getByText(/no favorite pokemon found/i);
    expect(emptyFavoriteMsg).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
    userEvent.click(moreDetailsButton);
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    userEvent.click(favoritesLink);
    expect(emptyFavoriteMsg).not.toBeInTheDocument();
  });
});
