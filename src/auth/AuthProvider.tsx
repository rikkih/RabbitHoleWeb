import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = () => {
    console.warn("login() called but no routing context is available");
  };
  const logoutUser = () =>
    logout({ logoutParams: { returnTo: `${window.location.origin}/login` } });
  const getAccessToken = () =>
    getAccessTokenSilently({
      authorizationParams: {
        audience: "https://REDACTED/api/v2/",
      },
    });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout: logoutUser,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
