import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import type { UserProfileDto } from "../types/UserProfileDto";
import { getOrCreateUserProfile } from "../api/userProfileApi";

export function useUserProfile() {
  const { user, getAccessToken } = useAuth();
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const token = await getAccessToken();
        if (!token) {
          throw new Error("No access token available");
        }

        const profile = await getOrCreateUserProfile(
          user.name,
          user.email,
          token
        );
        setProfile(profile);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, getAccessToken]);

  return { profile, loading, error };
}
