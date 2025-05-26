import { useCallback } from "react";
import { useAuth } from "../../auth/useAuth";
import type { ChatDto } from "../types/ChatDto";
import * as chatApi from "../api/chatApi";

interface CreateChatPayload {
  title: string;
  userIds: string[];
}

export const useChatApi = () => {
  const { getAccessToken } = useAuth();

  const createChat = useCallback(
    async (payload: CreateChatPayload) => {
      const token = await getAccessToken();
      return chatApi.createChat(token, payload);
    },
    [getAccessToken]
  );

  const getUserChats = useCallback(async (): Promise<ChatDto[]> => {
    const token = await getAccessToken();
    return chatApi.getUserChats(token);
  }, [getAccessToken]);

  const getRecentMessages = useCallback(
    async (chatId: string, page = 0, size = 50) => {
      const token = await getAccessToken();
      return chatApi.getRecentMessages(token, chatId, page, size);
    },
    [getAccessToken]
  );

  return { createChat, getUserChats, getRecentMessages };
};
