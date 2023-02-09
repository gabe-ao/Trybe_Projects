import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Tests for Not Found component:', () => {
  it('Contains the correct heading?', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found crying emoji/i,
    });
    expect(heading).toBeDefined();
    expect(heading).toBeInTheDocument();
  });

  it('Contains the pikachu gif?', () => {
    render(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(
      /pikachu crying because the page requested was not found/i,
    );
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual(imageURL);
  });
});
