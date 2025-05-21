import { useEffect, useState } from "react";
import { fetchUserProfile } from "./profileApi";
import type { UserProfile } from "../user/UserProfile";

export const useUserProfile = (
  isAuthenticated: boolean,
  getToken: () => Promise<string>
) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProfile(getToken);
        setProfile(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else if (typeof err === "string") setError(err);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, getToken]);

  return { profile, loading, error };
};
