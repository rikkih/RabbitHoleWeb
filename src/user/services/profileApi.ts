import type { UserProfile } from "../types";

export const fetchUserProfile = async (
  getToken: () => Promise<string>
): Promise<UserProfile> => {
  const token = await getToken();
  const res = await fetch("http://localhost:8080/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile ${res.status}`);
  }

  return await res.json();
};
