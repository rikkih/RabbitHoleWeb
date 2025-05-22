import { useEffect, useState, useCallback } from "react";
import type { UserProfile } from "./UserProfile";

const useUserProfile = (
  isAuthenticated: boolean,
  getAccessTokenSilently: () => Promise<string>
) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:8080/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Profile fetch failed");

      const data: UserProfile = await res.json();
      setProfile(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refreshProfile: fetchProfile };
};

export default useUserProfile;
