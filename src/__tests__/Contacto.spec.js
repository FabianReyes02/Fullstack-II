// Contacto.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from '../componentes/paginas/Contacto';

describe('Contacto', () => {
  test('renders contact form with name, email, and message fields', () => {
    render(<Contacto />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('allows user to type into form fields', () => {
    render(<Contacto />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message.');
  });

  test('handles form submission (basic check)', () => {
    render(<Contacto />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });
    fireEvent.click(sendButton);

    // In a real app, you'd check if an API call was made or a success message was displayed.
    // For this basic test, we just ensure the button click doesn't crash the app.
  });
});
