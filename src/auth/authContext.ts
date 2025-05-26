import { createContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string | undefined>;
}


export const AuthContext = createContext<AuthContextValue | undefined>(undefined);