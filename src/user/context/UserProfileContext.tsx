import { createContext, useContext } from "react";
import type { UserProfileDto } from "../types/UserProfileDto";

export const UserProfileContext = createContext<{
  profile: UserProfileDto | null;
  loading: boolean;
  error: string | null;
}>({ profile: null, loading: true, error: null });

export const useUserProfileContext = () => useContext(UserProfileContext);