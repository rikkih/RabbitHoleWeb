import type { ReactNode } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { UserProfileContext } from "./UserProfileContext";

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const value = useUserProfile();
  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}