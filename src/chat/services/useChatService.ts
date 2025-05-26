import { useCallback } from "react";
import { useAuth } from "../../auth/AuthProvider";
import type { ChatDto } from "../types/ChatDto";

interface CreateChatPayload {
  title: string;
  userIds: string[];
}

export const useChatService = () => {
  const { getAccessToken } = useAuth();

  const createChat = async ({
    title,
    userIds,
  }: CreateChatPayload): Promise<string | null> => {
    try {
      const token = await getAccessToken();
      const response = await fetch("http://localhost:8080/api/chats", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      return await response.json(); // UUID from backend
    } catch (error) {
      console.error("Chat creation error:", error);
      return null;
    }
  };

  const getUserChats = async (): Promise<ChatDto[]> => {
    try {
      const token = await getAccessToken();
      const response = await fetch("http://localhost:8080/api/chats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch chats");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getRecentMessages = useCallback(
    async (chatId: string, page = 0, size = 50) => {
      const token = await getAccessToken();
      const url = new URL(
        `/api/chats/${chatId}/messages`,
        window.location.origin
      );
      url.searchParams.append("page", page.toString());
      url.searchParams.append("size", size.toString());

      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch recent messages", error);
        return { content: [], totalElements: 0, totalPages: 0, number: 0 };
      }
    },
    []
  );

  return { createChat, getUserChats, getRecentMessages };
};
