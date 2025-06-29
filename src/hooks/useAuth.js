import { useState, useEffect } from 'react';

// Custom hook for authentication logic
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    // In a real app, you would validate stored tokens here
    setLoading(false);
  }, []);

  const login = async (credentials, apiService) => {
    try {
      const response = await apiService.login(credentials);
      // For mock API, the response is the user data directly
      const userData = response.user || response || {
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'user'
      };
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  };

  const logout = (apiService) => {
    apiService.clearToken();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
};