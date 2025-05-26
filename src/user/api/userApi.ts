import type { UserProfileDto } from "../types/UserProfileDto";

export async function fetchAllUsers(token: string): Promise<UserProfileDto[]> {
  const response = await fetch("http://localhost:8080/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
