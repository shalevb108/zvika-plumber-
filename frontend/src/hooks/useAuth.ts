import { useState, useCallback } from 'react';
import { login as apiLogin } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!sessionStorage.getItem('admin_token')
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await apiLogin(password);
      sessionStorage.setItem('admin_token', token);
      setIsAuthenticated(true);
      return true;
    } catch {
      setError('סיסמה שגויה. נסה שנית.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout, loading, error };
};
