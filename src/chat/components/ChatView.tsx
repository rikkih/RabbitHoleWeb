import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useChat } from "../hooks/useChat";
import { useChatApi } from "../services/useChatApi";
import type { MessageDto } from "../types/MessageDto";
import ChatLayout from "./ChatLayout";

const ChatView: React.FC = () => {
  const { user } = useAuth();
  const { chatId } = useParams<{ chatId: string }>();
  const { getRecentMessages, getChatTitle } = useChatApi();
  const { chatMessages, sendMessage } = useChat(chatId);

  const [chatTitle, setChatTitle] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  const location = useLocation();

  const currentUserId = user.sub;

  console.log("CURRENT USER ID: " + currentUserId);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    if (location.state?.chatTitle) {
      setChatTitle(location.state.chatTitle);
    } else {
      getChatTitle(chatId).then((chatTitle) => {
        setChatTitle(chatTitle.title);
      });
    }

    setLoading(true);
    getRecentMessages(chatId).then((page) => {
      setMessages(page.content);
      setLoading(false);
    });
  }, [chatId, getRecentMessages, location.state, getChatTitle]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    sendMessage(messageInput);
    setMessageInput("");
  };

  const allMessages = [...messages, ...chatMessages];

  if (loading) return <Typography>Loading chat messages...</Typography>;

  return (
    <ChatLayout
      chatTitle={chatTitle ?? ""}
      allMessages={allMessages}
      currentUserId={currentUserId}
      messageInput={messageInput}
      setMessageInput={setMessageInput}
      handleSend={handleSend}
      messageEndRef={messageEndRef}
    />
  );
};

export default ChatView;
