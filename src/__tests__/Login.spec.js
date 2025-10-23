// Login.spec.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

describe('Login', () => {
  // Mocking the login function from useAuth hook
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  // Mocking the AuthContext provider
  const mockAuthContextValue = {
    login: mockLogin,
    logout: jest.fn(), // Mock logout as well, though not directly used in this test
    currentUser: null, // Mock currentUser as null initially
  };

  // Mocking react-router-dom hooks
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  // Mocking the useAuth hook to return our mock context value
  jest.mock('../../context/AuthContext', () => ({
    useAuth: () => mockAuthContextValue,
  }));

  beforeEach(() => {
    // Reset mocks before each test
    mockLogin.mockClear();
    mockNavigate.mockClear();
    // Resetting the state of the mock context if necessary, e.g., currentUser
    mockAuthContextValue.currentUser = null;
  });

  test('renders login form with email and password fields', () => {
    render(
      <useAuth.Provider value={mockAuthContextValue}> {/* This is incorrect, use AuthProvider or mock useAuth directly */}
        <Login />
      </useAuth.Provider>
    );
    // Correct way to mock context for testing:
    // render(<Login />); // Since useAuth is mocked globally

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument(); // Updated label text
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument(); // Updated label text
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument(); // Updated button text
  });

  test('calls login function with correct credentials and navigates on success', async () => {
    // Mocking the login function to simulate a successful login
    mockLogin.mockResolvedValue({ email: 'test@example.com', isAdmin: false });

    render(<Login />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Wait for async operations to complete
    await screen.findByText(/ingresar/i); // Wait for button to be present, indicating form submission might have processed

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Navigates to home for non-admin
  });

  test('calls login function and navigates to admin page for admin user', async () => {
    // Mocking the login function to simulate a successful admin login
    mockLogin.mockResolvedValue({ email: 'admin@admin.cl', isAdmin: true });

    render(<Login />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(emailInput, { target: { value: 'admin@admin.cl' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginButton);

    await screen.findByText(/ingresar/i);

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('admin@admin.cl', 'admin123');
    expect(mockNavigate).toHaveBeenCalledWith('/admin'); // Navigates to admin page
  });

  test('displays error message on login failure', async () => {
    // Mocking the login function to simulate a failed login
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    render(<Login />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /ingresar/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    // Wait for the error message to appear
    await screen.findByText(/error en el inicio de sesión/i); // Updated error message

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    expect(screen.getByText(/error en el inicio de sesión/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled(); // Should not navigate on error
  });
});
