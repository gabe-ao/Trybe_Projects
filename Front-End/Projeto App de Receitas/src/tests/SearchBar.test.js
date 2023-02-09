import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa SearchBar', () => {
  test('Testa procurando por nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn)

    const inputSearch = await screen.findByTestId('search-input');
    userEvent.type(inputSearch, 'chocolate')

    const nameRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameRadio)

    const btnSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(btnSearch)

    expect(await screen.findAllByText(/chocolate gateau/ig))
  
  });
  test('Testa window.alert para mais de 1 caracter na opção first letter', async () => {
    const { history } = renderWithRouter(<App />);
    const globalAlertMock = jest.spyOn(global, 'alert').mockImplementation();
    history.push('/foods');

    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn)

    const inputSearch = await screen.findByTestId('search-input');
    userEvent.type(inputSearch, 'choc')

    const ingRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(ingRadio)

    
    const btnSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(btnSearch)

    expect(globalAlertMock ).toHaveBeenCalledTimes(1);
  
  });

  test('Testa window.alert para nenhum receita encontrada', async () => {
    const { history } = renderWithRouter(<App />);
    const globalAlertMock = jest.spyOn(global, 'alert').mockImplementation(() =>{});
    history.push('/foods');

    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn)

    const inputSearch = await screen.findByTestId('search-input');
    userEvent.type(inputSearch, 'juninho')

    const ingRadio = await screen.findByTestId('ingredient-search-radio');
    userEvent.click(ingRadio)

    
    const btnSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(btnSearch)

    await waitFor(() => {expect(globalAlertMock).toBeCalled();});
  
  });

  test('Testa procurando por nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn)

    const inputSearch = await screen.findByTestId('search-input');
    userEvent.type(inputSearch, 'adam')

    const nameRadio = await screen.findByTestId('name-search-radio');
    userEvent.click(nameRadio)

    const btnSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(btnSearch)

    expect(await screen.findAllByText(/Adam bomb/ig))
  
  });

});


