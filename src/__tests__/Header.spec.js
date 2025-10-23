// Header.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../componentes/plantillas/Header';

describe('Header', () => {
  test('renders the application title or logo', () => {
    render(<Header />);
    // Assuming the Header component displays a title like "My E-commerce App" or a logo.
    // Adjust the text content based on the actual Header implementation.
    expect(screen.getByText(/my e-commerce app/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    // Assuming there are navigation links like Home, Products, Cart, Login.
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<Header />);
    // If render doesn't throw an error, the test passes.
  });
});
