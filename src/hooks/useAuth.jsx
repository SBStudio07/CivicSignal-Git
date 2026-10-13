import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { api } from '@/services';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.getSession().then((s) => {
      if (active) { setSession(s); setLoading(false); }
    });
    const unsubscribe = api.onAuthChange(setSession);
    return () => { active = false; unsubscribe(); };
  }, []);

  const signIn = useCallback((email, password) => api.signIn(email, password), []);
  const signOut = useCallback(() => api.signOut(), []);

  const value = useMemo(() => ({
    session,
    loading,
    isAdmin: api.isAdminSession(session),
    signIn,
    signOut,
  }), [session, loading, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
