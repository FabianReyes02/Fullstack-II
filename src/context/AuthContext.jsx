import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem('fs_token');
        if (!token) return;
        const res = await fetch('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) { localStorage.removeItem('fs_token'); return; }
        const data = await res.json();
        setCurrentUser({ ...data.user, token });
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    }
    init();
  }, []);

  const login = (email, password) => {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(async res => {
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('fs_token', data.token);
      const user = { ...data.user, token: data.token };
      setCurrentUser(user);
      return user;
    });
  };

  const logout = () => {
    localStorage.removeItem('fs_token');
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
