import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa CategoryFilters foods', () => {
  test('Testa category filters foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn)
    expect(await screen.findAllByText(/corba/ig))
  
    const beefBtn = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beefBtn)
    expect(await screen.findAllByText(/beef and mustard pie/ig))
    
    const bfBtn = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(bfBtn)
    expect(await screen.findAllByText(/breakfast potatoes/ig))

    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    userEvent.click(chickenBtn)
    expect(await screen.findAllByText(/ayam percik/ig))

    const desBtn = await screen.findByTestId('Dessert-category-filter');
    userEvent.click(desBtn)
    expect(await screen.findAllByText(/apam balik/ig))

    const goatBtn = await screen.findByTestId('Goat-category-filter');
    userEvent.click(goatBtn)
    expect(await screen.findAllByText(/mbuzi choma/ig))

  });
});

describe('Testa CategoryFilters drinks', () => {
  test('Testa category filters drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn)
    expect(await screen.findAllByText(/adam/ig))

    const ordBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordBtn)
    expect(await screen.findAllByText(/410 gone/ig))

    const cockBtn = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(cockBtn)
    expect(await screen.findAllByText(/155 belmont/ig))

    const shakeBtn = await screen.findByTestId('Shake-category-filter');
    userEvent.click(shakeBtn)
    expect(await screen.findAllByText(/151 florida bushwacker/ig))

    const otherBtn = await screen.findByTestId('Other/Unknown-category-filter');
    userEvent.click(otherBtn)
    expect(await screen.findAllByText(/a piece of ass/ig))
    
    const cocoaBtn = await screen.findByTestId('Cocoa-category-filter');
    userEvent.click(cocoaBtn)
    expect(await screen.findAllByText(/chocolate drink/ig))    

  });
});