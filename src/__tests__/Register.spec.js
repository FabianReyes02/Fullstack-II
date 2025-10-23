// Register.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../componentes/paginas/Register';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is exported

describe('Register', () => {
  const mockAuthContextValue = {
    register: jest.fn(), // Assuming a register function exists in AuthContext
    user: null,
  };

  test('renders registration form with required fields', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Register />
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('calls register function with credentials when register button is clicked', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Register />
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    expect(mockAuthContextValue.register).toHaveBeenCalledTimes(1);
    expect(mockAuthContextValue.register).toHaveBeenCalledWith('testuser', 'test@example.com', 'password123');
  });

  test('displays error message if registration fails (mocked)', () => {
    // Similar to Login.spec.js, this would require mocking the register function to simulate failure.
  });
});
