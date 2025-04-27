'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
});

export function AuthProviderClient({
  children,
  token: initialToken,
}: {
  children: React.ReactNode;
  token: string | null;
}) {
  const [token, setToken] = useState<string | null>(initialToken);

  // Optional: listen for changes to cookies if you implement client-side login/logout
  useEffect(() => {
    setToken(initialToken);
  }, [initialToken]);

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
