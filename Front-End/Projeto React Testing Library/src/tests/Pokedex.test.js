import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests for Pokedex component:', () => {
  const nextId = 'next-pokemon';
  const typeId = 'pokemon-type';
  it('1) Contains the correct heading?', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('2) Does Proximo Pokemon button works?', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId(nextId);
    expect(buttonNextPokemon).toBeDefined();
    expect(buttonNextPokemon).toHaveAccessibleName(/próximo pokémon/i);
    expect(buttonNextPokemon).toBeEnabled();

    pokemons.forEach((pokemon) => {
      const currentPokemon = screen.getByTestId('pokemon-name');
      expect(currentPokemon).toHaveTextContent(pokemon.name);
      const currentSprite = screen.getByAltText(`${pokemon.name} sprite`);
      expect(currentSprite.src).toBe(pokemon.image);
      userEvent.click(buttonNextPokemon);
    });

    const backToFirstPokemon = screen.getByTestId('pokemon-name');
    expect(backToFirstPokemon).toHaveTextContent(pokemons[0].name);
    const backToFirstSprite = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(backToFirstSprite.src).toBe(pokemons[0].image);
  });

  it('3) Does it show only one pokemon at a time?', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId(nextId);
    const pokemonQuantity = 7;
    for (let count = 0; count <= pokemonQuantity; count += 1) {
      const pokemonDescription = screen.queryAllByTestId(typeId);
      expect(pokemonDescription[0]).toBeInTheDocument();
      expect(pokemonDescription.length).toBe(1);
      const pokemonSprite = screen.queryAllByAltText(/sprite/i, { exact: false });
      expect(pokemonSprite[0]).toBeDefined();
      expect(pokemonSprite.length).toBe(1);
      userEvent.click(buttonNextPokemon);
    }
  });

  it('4) Filter buttons are working?', () => {
    renderWithRouter(<App />);
    const filterAll = screen.getByRole('button', { name: 'All' });
    expect(filterAll).toBeDefined();
    expect(filterAll).toBeVisible();

    let typesList = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(typesList.length); // Testa se a quatidade de filtros e igual a quantidade de tipos de pokemons
    filterButtons.forEach((button) => {
      expect(typesList).toContain(button.textContent); // Testa se o texto do botao corresponde a um tipo de pokemon valido.
      typesList = typesList.filter((type) => type !== button.textContent); // Elimina o tipo ja validado como presente nos botoes, assim, se outro botao possuir um tipo repetido, o testa apontara a falha.
      expect(filterAll).toBeVisible();
    });
    expect(typesList.length).toBe(0); // Testa se todos os tipos de pokemons foram validados e portanto estao presentes nos botoes. Note que quando o tipo e validado, ele "e riscado da lista" de tipos e por isso ela deve terminar com tamanho 0.

    const repeatTypes = ['Fire', 'Psychic'];
    const buttonNextPokemon = screen.getByTestId(nextId);
    filterButtons.forEach((button) => {
      userEvent.click(button);
      let pokemonType = screen.getByTestId(typeId);
      expect(pokemonType.textContent).toEqual(button.textContent);
      if (repeatTypes.includes(button.textContent)) {
        userEvent.click(buttonNextPokemon);
        pokemonType = screen.getByTestId(typeId);
        expect(pokemonType.textContent).toEqual(button.textContent);
      }
      expect(filterAll).toBeVisible();
    });
  });

  it('5) Contains filter reset button All?', () => {
    renderWithRouter(<App />);
    const filterAll = screen.getByRole('button', { name: /all/i });
    expect(filterAll).toBeDefined();
    expect(filterAll).toBeEnabled();
    expect(filterAll).toHaveTextContent('All');
    userEvent.click(filterAll);
    const buttonNextPokemon = screen.getByTestId(nextId);
    expect(buttonNextPokemon).toBeInTheDocument();
    expect(buttonNextPokemon).toBeEnabled();
  });
});
