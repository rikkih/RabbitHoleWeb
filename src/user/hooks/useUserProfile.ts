import { useEffect, useState, useCallback } from "react";
import type { UserProfileDto } from "../types";
import { useAuth } from "../../auth/AuthProvider";

export function useUserProfile() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false); // prevent spinner hang
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getAccessToken();
      const res = await fetch("http://localhost:8080/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Profile fetch failed");

      const data: UserProfileDto = await res.json();
      setProfile(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getAccessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error };
}

export default useUserProfile;
