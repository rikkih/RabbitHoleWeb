import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import type { UserProfileDto } from "../types";

export function useAllUsers() {
  const { getAccessToken } = useAuth();
  const [users, setUsers] = useState<UserProfileDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const token = await getAccessToken();
        const response = await fetch("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [getAccessToken]);

  return { users, loading, error };
}
