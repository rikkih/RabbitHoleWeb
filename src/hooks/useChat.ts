import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import {
  createStompClient,
  disconnectStompClient,
  sendStompMessage,
} from "../services/chatService";
import type { Message } from "../types/chat";

export function useChat() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    const connect = async () => {
      const token = await getAccessTokenSilently();
      createStompClient({
        token,
        onMessage: (body) => {
          setChatMessages((prev) => [...prev, body]);
        },
      });
    };

    connect();
    return () => disconnectStompClient();
  }, [getAccessTokenSilently]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const name = user?.name || "Anonymous";
      const avatarUrl =
        user?.picture ||
        `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
          name
        )}`;

      const payload: Message = {
        from: name,
        text: trimmed,
        timestamp: new Date().toISOString(),
        avatarUrl,
      };

      sendStompMessage("/api/chat", payload);
    },
    [user]
  );

  return {
    chatMessages,
    sendMessage,
  };
}
