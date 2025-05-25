import { useAuth } from "../../auth/AuthProvider";


interface CreateChatPayload {
  title: string;
  userIds: string[];
}

export const useChatService = () => {
  const { getAccessToken } = useAuth();

  const createChat = async ({ title, userIds }: CreateChatPayload): Promise<string | null> => {
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

  return { createChat };
};