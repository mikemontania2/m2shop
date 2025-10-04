import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Api } from '../lib/api';

interface AuthUser { id: number; firstName: string; lastName: string; email: string }
interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (params: { firstName: string; lastName: string; email: string; phone?: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const { token, user } = JSON.parse(saved);
      setToken(token);
      setUser(user);
      Api.setToken(token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await Api.login({ email, password });
    setToken(data.token);
    setUser(data.customer);
    Api.setToken(data.token);
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.customer }));
  };

  const register = async (params: { firstName: string; lastName: string; email: string; phone?: string; password: string }) => {
    const data = await Api.register(params);
    setToken(data.token);
    setUser(data.customer);
    Api.setToken(data.token);
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.customer }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Api.setToken(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
