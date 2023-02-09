import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testing the About component: ', () => {
  it('Contains pokedex description?', () => {
    render(<About />);
    const firstPhrase = screen.getByText(/this application simulates a pokédex,/i);
    expect(firstPhrase).toBeInTheDocument();
    const secondPhrase = screen.getByText(
      / a digital encyclopedia containing all Pokémons/i,
    );
    expect(secondPhrase).toBeInTheDocument();
    const thirdPhrase = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    expect(thirdPhrase).toBeDefined();
  });

  it('Contains correct heading?', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Contains the pokedex image?', () => {
    render(<About />);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { src: imageURL });
    expect(image).toBeDefined();
    expect(image.src).toEqual(imageURL);
  });
});
