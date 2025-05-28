import { useAuth0 } from "@auth0/auth0-react";
import { type ReactNode } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading, user, logout, getAccessTokenSilently } =
    useAuth0();

  const login = () => {
    console.warn("login() called but no routing context is available");
  };
  const logoutUser = () =>
    logout({ logoutParams: { returnTo: `${window.location.origin}/login` } });
  const getAccessToken = () => getAccessTokenSilently();

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
