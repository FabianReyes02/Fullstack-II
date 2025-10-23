// ProductoCard.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductoCard from '../componentes/moleculas/ProductoCard';

describe('ProductoCard', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Test Product',
    precio: 100,
    imagen: 'test.jpg',
    descripcion: 'A test product description',
  };

  test('renders product information correctly', () => {
    render(<ProductoCard producto={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<ProductoCard producto={mockProduct} />);
    // If render doesn't throw an error, the test passes.
  });
});
