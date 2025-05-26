import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { fetchAllUsers } from "../api/userApi";
import type { UserProfileDto } from "../types/UserProfileDto";

export function useUserApi() {
  const { getAccessToken } = useAuth();
  const [users, setUsers] = useState<UserProfileDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const token = await getAccessToken();
        if (!token) {
          throw new Error("No access token available");
        }

        const data = await fetchAllUsers(token);
        setUsers(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [getAccessToken]);

  return { users, loading, error };
}
