import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useChatApi } from "../services/useChatApi";
import type { MessageDto } from "../types/MessageDto";

const ChatView: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { getRecentMessages, getChatTitle } = useChatApi();
  const { chatMessages, sendMessage } = useChat(chatId);

  const [chatTitle, setChatTitle] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  const location = useLocation();

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
    <Box>
      <Typography variant="h5" gutterBottom>
        {chatTitle}
      </Typography>
      <List>
        {allMessages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText
              primary={msg.text}
              secondary={new Date(msg.sentAt || msg.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <Box mt={2} display="flex" gap={2}>
        <TextField
          fullWidth
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          label="Type your message"
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatView;
