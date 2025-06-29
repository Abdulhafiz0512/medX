import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/ApiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load persisted session
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const { token, user: storedUser } = JSON.parse(stored);
        if (token) {
          apiService.setToken(token);
          setUser(storedUser);
        }
      } catch (_) {}
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await apiService.login(credentials);
    apiService.setToken(data.token);
    setUser(data.user);
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
  };

  const logout = () => {
    apiService.clearToken();
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
