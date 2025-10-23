import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { name: /Tienda Online/i });
  expect(header).toBeInTheDocument();
});
