import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'

describe('1) Tests Feedback Page:', () => {
  it('renders all correct texts and buttons', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const feedbackText = screen.getByText(/could be better/i)
    const btnRanking = screen.getByRole('button', { name: /ranking/i})
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i});
    
    expect(feedbackText).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
  });

  it('play again button redirects to home', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i});
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });

  it('ranking button redirects to ranking page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const btnRanking = screen.getByRole('button', { name: /ranking/i})
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });

  it('renders all correct texts with mock initial state', () => {
    const INITIAL_STATE = {
      player: {
        assertions: 4,
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE);
    history.push('/feedback');

    const feedbackText = screen.getByText(/well done/i)
    
    expect(feedbackText).toBeInTheDocument();

  });

});