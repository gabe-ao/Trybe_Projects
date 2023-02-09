import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('1) Tests Login Page:', () => {
  it('renders all correct inputs and submit buttons', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const settingsBtn = screen.getByRole('button', { name: /settings/i });
    const nameInput = screen.getByPlaceholderText('nome');
    const emailInput = screen.getByPlaceholderText('email');
    expect(playBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  it('renders with disabled play button', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    expect(playBtn).toBeDisabled();
  });
  it('enables button after complete input fields', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const nameInput = screen.getByPlaceholderText('nome');
    const emailInput = screen.getByPlaceholderText('email');
    userEvent.type(nameInput, 'Rafael');
    userEvent.type(emailInput, 'rafael@teste.com');
    expect(playBtn).toBeEnabled();
  });
  it('settings button redirects to /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByRole('button', { name: /settings/i });
    userEvent.click(settingsBtn);
    expect(history.location.pathname).toBe('/settings');
  });
  it('play button redirects to /game', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', { name: /play/i });
    const nameInput = screen.getByPlaceholderText('nome');
    const emailInput = screen.getByPlaceholderText('email');
    userEvent.type(nameInput, 'Rafael');
    userEvent.type(emailInput, 'rafael@teste.com');
    userEvent.click(playBtn);
    const game = await screen.findByRole('img', {  name: /gravatar/i})
    expect(game).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game');
    expect(screen.getByText('Rafael')).toBeInTheDocument()
    debug()
  });
});