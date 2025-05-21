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
    (message: string) => {
      if (message.trim()) {
        const payload: Message = {
          from: user?.name || "Anonymous",
          text: message.trim(),
        };

        sendStompMessage("/api/chat", payload);
      }
    },
    [user]
  );

  return {
    chatMessages,
    sendMessage,
  };
}
