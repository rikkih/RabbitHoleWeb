import type { ChatDto } from "../types/ChatDto";

interface CreateChatPayload {
  title: string;
  userIds: string[];
}

export async function createChat(
  token: string | undefined,
  payload: CreateChatPayload
): Promise<string | null> {
  const response = await fetch("http://localhost:8080/api/chats", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Failed to create chat");
  return await response.json();
}

export async function getUserChats(
  token: string | undefined
): Promise<ChatDto[]> {
  const response = await fetch("http://localhost:8080/api/chats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch chats");
  return await response.json();
}

export async function getRecentMessages(
  token: string | undefined,
  chatId: string,
  page = 0,
  size = 50
) {
  const url = new URL(
    `http://localhost:8080/api/chats/${chatId}/messages`,
    window.location.origin
  );
  url.searchParams.append("page", page.toString());
  url.searchParams.append("size", size.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch recent messages");
  return await response.json();
}
