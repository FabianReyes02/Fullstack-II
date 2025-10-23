// Home.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../componentes/paginas/Home';

describe('Home', () => {
  test('renders the welcome message', () => {
    render(<Home />);
    // Assuming the Home page has a prominent welcome message.
    expect(screen.getByText(/welcome to our store/i)).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<Home />);
    // If render doesn't throw an error, the test passes.
  });

  // Add more tests if the Home component displays specific featured products, promotions, etc.
});
