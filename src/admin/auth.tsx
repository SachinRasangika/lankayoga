import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextValue {
  email: string | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  email: null,
  ready: false,
  login: async () => 'Not ready',
  logout: async () => undefined
});

export function AuthProvider({ children }: {children: ReactNode;}) {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(!supabase);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }

    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setEmail(data.session?.user.email ?? null);
      setReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      setReady(true);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      email,
      ready,
      async login(nextEmail, password) {
        if (!supabase) {
          return 'The database is not connected yet.';
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: nextEmail.trim().toLowerCase(),
          password
        });
        if (error) {
          return error.message === 'Invalid login credentials' ? 'Email or password is wrong.' : error.message;
        }
        return null;
      },
      async logout() {
        if (supabase) {
          await supabase.auth.signOut();
        }
        setEmail(null);
      }
    }),
    [email, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
