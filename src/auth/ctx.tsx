import * as React from "react";

import { useStorageState } from "@/storage";

type AuthSession = string | null;
type Ctx = {
  session: AuthSession;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<Ctx | null>(null);

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be wrapped in a <AuthProvider>");
  }
  return ctx;
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  // const [session, setSession] = React.useState<AuthSession>(null);
  const [[isLoading, session], setSession] = useStorageState("session");

  const login = async () => {
    await setSession("some-logged-in-session");
  };

  const logout = async () => {
    await setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
