import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'

describe('Tests for Ranking page:', () => {
  const initialState = {
    player: {
      name: 'Player Tester',
      assertions: 3,
      score: 236,
      gravatarEmail: 'tester@tester.com',
    },
  };

  it('1) Tests if texts and elements are renderized correct', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');
    const heading = screen.getByRole('heading', {
      name: /ranking/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
    const avatar = screen.getByRole('img', {  name: initialState.player.name });
    expect(avatar).toBeInTheDocument();
    const playerName = screen.getByText(initialState.player.name);
    expect(playerName).toBeInTheDocument();
    const playerScore = screen.getByText(initialState.player.score);
    expect(playerScore).toBeInTheDocument();
    const homeButton = screen.getByRole('button', {  name: /home/i});
    expect(homeButton).toBeDefined();
    userEvent.click(homeButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('2) Tests if localStorage integration is working', () => {
    const previousRanking = [
      { name: 'Tester 1', assertions: 5, score: 328, gravatarEmail: 'tester1@tester.com' },
      { name: 'Tester 2', assertions: 2, score: 128, gravatarEmail: 'testermail@tester.com' },
      { name: 'Tester 3', assertions: 4, score: 299, gravatarEmail: 'testergmail@tester.com' },
    ];
    localStorage.setItem('ranking', JSON.stringify(previousRanking));
    renderWithRouterAndRedux(<App />, initialState, '/ranking');
    previousRanking.forEach((player) => {
      const avatar = screen.getByRole('img', {  name: player.name });
      expect(avatar).toBeInTheDocument();
      const playerName = screen.getByText(player.name);
      expect(playerName).toBeInTheDocument();
      const playerScore = screen.getByText(player.score);
      expect(playerScore).toBeInTheDocument();
    });
  });
});