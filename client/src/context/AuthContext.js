import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user/token from localStorage
    const stored = localStorage.getItem('auth');
    if (stored) {
      const { user, token } = JSON.parse(stored);
      setUser(user);
      setToken(token);
    }
    setLoading(false);
  }, []);

  const saveAuth = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('auth', JSON.stringify({ user, token }));
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  const signup = async (email, password, name) => {
    const res = await fetch('https://mental-health-app-3xur.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Signup failed');
    const data = await res.json();
    saveAuth(data.user, data.token);
    return data.user;
  };

  const login = async (email, password) => {
    const res = await fetch('https://mental-health-app-3xur.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
    const data = await res.json();
    saveAuth(data.user, data.token);
    return data.user;
  };

  const logout = () => {
    clearAuth();
  };

  // Google login (client-side)
  const googleLogin = async (idToken) => {
    const res = await fetch('https://mental-health-app-3xur.onrender.com/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Google login failed');
    const data = await res.json();
    saveAuth(data.user, data.token);
    return data.user;
  };

  // Helper to attach JWT to fetch requests
  const fetchWithAuth = async (url, options = {}) => {
    const headers = options.headers || {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout, googleLogin, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
} 