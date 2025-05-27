import { Box, Button, List, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useChatApi } from "../services/useChatApi";
import type { MessageDto } from "../types/MessageDto";
import MessageBubble from "./MessageBubble";
import { useAuth } from "../../auth/useAuth";

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

  const currentUserId = user?.sub;

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // vertically center entire chat box
        bgcolor: "background.default",
        overflow: "hidden", // prevent page scroll
      }}
    >
      {/* Chat container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh", // fix height smaller than viewport
          width: "100%",
          maxWidth: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden", // clip internal scrollable content
        }}
      >
        {/* Title bar */}
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.7)",
            color: "primary.contrastText",
            p: 2,
            flexShrink: 0,
          }}
        >
          <Typography variant="h6" noWrap>
            {chatTitle}
          </Typography>
        </Box>

        {/* Scrollable messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 2,
            py: 1,
          }}
        >
          {allMessages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.fromId === currentUserId}
            />
          ))}
          <div ref={messageEndRef} />
        </Box>

        {/* Input area */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            display: "flex",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            label="Type your message"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatView;
