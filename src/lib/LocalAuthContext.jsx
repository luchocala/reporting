// src/lib/LocalAuthContext.jsx

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { validateCredentials } from './auth-service';

const SESSION_KEY = 'reporting_session';

export const LocalAuthContext = createContext(null);

function applyTheme(theme) {
  const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', normalizedTheme === 'dark');
  localStorage.setItem('theme', normalizedTheme);
}

function getInitials(user) {
  const first = user?.firstName?.trim()?.[0] || '';
  const last = user?.lastName?.trim()?.[0] || '';

  if (first || last) {
    return `${first}${last}`.toUpperCase();
  }

  return (user?.username?.trim()?.slice(0, 2) || 'U').toUpperCase();
}

export function LocalAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed?.id) {
          setUser(parsed);
          applyTheme(parsed.theme || localStorage.getItem('theme') || 'light');
        }
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } else {
      applyTheme(localStorage.getItem('theme') || 'light');
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const userData = await validateCredentials(username, password);

    const userForSession = {
      id: userData.id,
      username: userData.username,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      timezone: userData.timezone || 'UTC-3',
      role: userData.role || 'user',
      theme: userData.theme || localStorage.getItem('theme') || 'light',
      language: userData.language || 'es',
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userForSession));
    setUser(userForSession);
    applyTheme(userForSession.theme);

    return userForSession;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    userInitials: getInitials(user),
    login,
    logout,
    isAdmin,
  }), [user, loading]);

  return (
    <LocalAuthContext.Provider value={value}>
      {children}
    </LocalAuthContext.Provider>
  );
}

export function useLocalAuth() {
  const context = useContext(LocalAuthContext);

  if (!context) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider');
  }

  return context;
}