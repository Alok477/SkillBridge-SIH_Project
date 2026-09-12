import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    authService.restore().then((session) => {
      if (mounted) setUser(session?.user || null);
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const session = await authService.login(email, password, role);
      setUser(session.user);
      return session.user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, role, additionalData) => {
    setLoading(true);
    try {
      const session = await authService.signup(email, password, role, additionalData);
      setUser(session.user);
      return session.user;
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const session = await authService.restore();
    setUser(session?.user || null);
    return session?.user || null;
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
