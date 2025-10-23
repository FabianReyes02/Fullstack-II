import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('fs_user'));
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }, []);

  const login = (email, password) => {
    let user;
    if (email === 'admin@admin.cl' && password === 'admin123') {
      user = { email: email, isAdmin: true };
    } else {
      user = { email: email, isAdmin: false };
    }
    localStorage.setItem('fs_user', JSON.stringify(user));
    setCurrentUser(user);
    return user; // Return user for potential testing assertions
  };

  const logout = () => {
    localStorage.removeItem('fs_user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
