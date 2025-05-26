import type { UserProfileDto } from "../types/UserProfileDto";

export async function getOrCreateUserProfile(
  name: string,
  email: string,
  token: string
): Promise<UserProfileDto> {
  const response = await fetch("http://localhost:8080/api/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch or create User Profile.");
  }

  return await response.json();
}
