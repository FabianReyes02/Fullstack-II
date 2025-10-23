// Admin.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Admin from '../componentes/paginas/Admin';

describe('Admin', () => {
  test('renders the Admin page title', () => {
    render(<Admin />);
    // Assuming the Admin page has a main heading like "Admin Panel"
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<Admin />);
    // If render doesn't throw an error, the test passes.
  });

  // Add more specific tests if the Admin component has interactive elements or displays specific data.
  // For example, if it lists products or has forms.
});
