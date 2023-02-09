import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests for the Pokemon component:', () => {
  const nameId = 'pokemon-name';
  it('1) Pokemon card is renderized correct?', () => {
    renderWithRouter(<App />);
    const currentPokemon = {
      name: screen.getByTestId(nameId).textContent,
      type: screen.getByTestId('pokemon-type').textContent,
      weight: screen.getByTestId('pokemon-weight').textContent,
      image: screen.getByRole('img', { name: /sprite/i, exact: false }),
      moreDetails: screen.getByRole('link', { name: /more details/i }),
    };

    const [cardData] = pokemons.filter(
      (pokemon) => pokemon.name === currentPokemon.name,
    );
    const { averageWeight: { value, measurementUnit } } = cardData;
    expect(currentPokemon.name).toBe(cardData.name);
    expect(currentPokemon.type).toBe(cardData.type);
    expect(currentPokemon.weight).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(currentPokemon.image.src).toBe(cardData.image);
    expect(currentPokemon.image.alt).toBe(`${cardData.name} sprite`);
    expect(currentPokemon.moreDetails.href).toMatch(`/pokemons/${cardData.id}`);
  });

  it('2) More details link works properly?', () => {
    const { history } = renderWithRouter(<App />);
    const currentPokemonName = screen.getByTestId(nameId).textContent;
    const [{ id }] = pokemons.filter((pokemon) => pokemon.name === currentPokemonName);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const detailsHeading = screen.getByRole('heading', {
      level: 2,
      name: `${currentPokemonName} Details`,
    });
    expect(detailsHeading).toBeInTheDocument();
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteCheckbox).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toMatch(`/pokemons/${id}`);
  });

  it('3) Does the favorite icon works?', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    const currentPokemonName = screen.getByTestId(nameId).textContent;
    const favoriteIcon = screen.getByRole('img', {
      name: `${currentPokemonName} is marked as favorite`,
    });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toBeVisible();
    expect(favoriteIcon.src).toMatch('/star-icon.svg');
    expect(favoriteIcon.alt).toMatch(`${currentPokemonName} is marked as favorite`);
  });
});
