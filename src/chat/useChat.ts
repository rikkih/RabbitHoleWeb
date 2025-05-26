import { useCallback, useEffect, useState } from "react";
import {
  createStompClient,
  disconnectStompClient,
  sendStompMessage,
} from "./chatService";
import type { MessageDto } from "./types/MessageDto";
import { useAuth } from "../auth/AuthProvider";

export function useChat(chatId?: string) {
  const { getAccessToken, user } = useAuth();
  const [chatMessages, setChatMessages] = useState<MessageDto[]>([]);

  useEffect(() => {
    if (!chatId) return;

    const connect = async () => {
      const token = await getAccessToken();
      createStompClient({
        token,
        onMessage: (body) => {
          setChatMessages((prev) => [...prev, body]);
        },
        destination: `/topic/chat.${chatId}`,
      });
    };

    connect();
    return () => disconnectStompClient();
  }, [getAccessToken, chatId]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !chatId) return;

      const name = user?.name || "Anonymous";
      const avatarUrl =
        user?.picture ||
        `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
          name
        )}`;

      const payload: MessageDto = {
        id: chatId,
        from: name,
        text: trimmed,
        timestamp: new Date().toISOString(),
        avatarUrl,
      };

      sendStompMessage(`/api/chat.${chatId}`, payload);
    },
    [user, chatId]
  );

  return {
    chatMessages,
    sendMessage,
  };
}
