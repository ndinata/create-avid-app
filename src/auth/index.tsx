import * as React from "react";

import { useStorageString } from "@/storage";

const AUTH_TOKEN_STORAGE_KEY = "key-app-auth-token";

type AuthCtx = {
  isLoggedIn: boolean;
  login: (authToken: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be wrapped in a <AuthProvider>");
  }
  return ctx;
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useStorageString(AUTH_TOKEN_STORAGE_KEY);

  const login = (authToken: string) => {
    setToken(authToken);
  };

  const logout = () => {
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
