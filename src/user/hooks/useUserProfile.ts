import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import type { UserProfileDto } from "../types";

export function useUserProfile() {
  const { getAccessToken, isAuthenticated, user } = useAuth();
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
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
        }),
        method: "PUT",
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
  }, [isAuthenticated, getAccessToken, user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error };
}

export default useUserProfile;
