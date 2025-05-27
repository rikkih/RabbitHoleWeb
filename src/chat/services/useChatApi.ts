import { useCallback } from "react";
import { useAuth } from "../../auth/useAuth";
import * as chatApi from "../api/chatApi";
import type { ChatDto } from "../types/ChatDto";
import type { ChatTitle } from "../types/ChatTitle";

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

  const getChatTitle = useCallback(async (chatId: string): Promise<ChatTitle> => {
    const token = await getAccessToken();
    if (!token) {
      throw new Error("No access token available");
    }
    return chatApi.getChatTitle(token, chatId);
  }, [getAccessToken]);

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

  return { createChat, getChatTitle, getUserChats, getRecentMessages };
};
