import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

describe('Testa o componente Header', () => {
  test('Testa se os elementos são visiveis na rota /foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileIcon = await screen.findByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Foods');
  })

  test('Testa a funcionalidade do botão search', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(screen.queryByTestId('search-input')).toBeNull();
    userEvent.click(searchIcon);
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByTestId('search-input')).toBeNull();
  })

  test("Testa a funcionalidade do botão Profile", () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');

    userEvent.click(profileIcon);

    expect(history.location.pathname).toBe('/profile');
  })

  test("Testa o titulo da Pagina e o icone de pesquisa", async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {expect(screen.getByTestId('page-title').innerHTML).toBe('Foods')});
    expect(screen.queryByTestId('search-top-btn')).toBeInTheDocument();

    history.push('/drinks');
    await waitFor(() => {expect(screen.getByTestId('page-title').innerHTML).toBe('Drinks')});
    expect(screen.queryByTestId('search-top-btn')).toBeInTheDocument();

    history.push('/profile');
    await waitFor(() => {expect(screen.getByTestId('page-title').innerHTML).toBe('Profile')});
    expect(screen.queryByTestId('search-top-btn')).toBeNull();

    history.push('/done-recipes');
    await waitFor(() => {expect(screen.getByTestId('page-title').innerHTML).toBe('Done Recipes')});
    expect(screen.queryByTestId('search-top-btn')).toBeNull();

    history.push('/favorite-recipes');
    await waitFor(() => {expect(screen.getByTestId('page-title').innerHTML).toBe('Favorite Recipes')});
    expect(screen.queryByTestId('search-top-btn')).toBeNull();
  })
})