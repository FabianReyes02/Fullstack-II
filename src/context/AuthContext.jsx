import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Base URL for API calls (embedded at build time or falls back to relative paths)
  const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

  if (!process.env.REACT_APP_API_URL) {
    // Friendly console warning to help diagnose deploy misconfiguration
    console.warn('REACT_APP_API_URL is not defined. In production set REACT_APP_API_URL to your backend URL in the Static Site env vars. Falling back to relative /api paths which may fail cross-origin.');
  }

  useEffect(() => {
    async function init() {
      try {
        const token = localStorage.getItem('fs_token');
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) { localStorage.removeItem('fs_token'); return; }
        // Always read as text first to avoid json() on empty body
        const contentType = res.headers.get('content-type') || '';
        const text = await res.text();
        let data = {};
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (e) {
            // fallback: if content-type indicates json but parse failed, leave data empty
            console.warn('Auth profile: failed to parse JSON response', e);
            data = {};
          }
        }
        if (data && data.user) setCurrentUser({ ...data.user, token });
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    }
    init();
  }, []);

  const login = (email, password) => {
    return fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(async res => {
      // Always read response as text first to avoid json() on empty body
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();
      let data = {};
      if (text) {
        try { data = JSON.parse(text); } catch (e) { console.warn('Auth login: failed to parse JSON response', e); data = {}; }
      }

      if (!res.ok) {
        // surface server-provided error if present
        const msg = (data && data.error) ? data.error : 'Invalid credentials';
        throw new Error(msg);
      }

      if (!data || !data.token) throw new Error('Invalid server response');
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
