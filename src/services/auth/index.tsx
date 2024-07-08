import * as React from "react";

import { useStorageString } from "@/services/storage";

const STORAGE_KEY_AUTH_TOKEN = "key-app-auth-token";

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
  const [token, setToken] = useStorageString(STORAGE_KEY_AUTH_TOKEN);

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
