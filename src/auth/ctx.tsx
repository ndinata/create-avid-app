import * as React from "react";

type AuthSession = string | null;
type Ctx = {
  session: AuthSession;
  login: () => void;
  logout: () => void;
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
  const [session, setSession] = React.useState<AuthSession>(null);

  const login = () => {
    setSession("some-logged-in-session");
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
