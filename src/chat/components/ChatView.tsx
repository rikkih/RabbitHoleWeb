import { useParams } from "react-router-dom";
import { useChatService } from "../services/useChatService";
import { useEffect, useState } from "react";
import { Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useChat } from "../useChat";

interface MessageDto {
  id: string;
  content: string;
  sentAt: string;
}

const ChatView: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { getRecentMessages } = useChatService();

  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  const { chatMessages, sendMessage } = useChat(chatId);

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    getRecentMessages(chatId).then((page) => {
      setMessages(page.content);
      setLoading(false);
    });
  }, [chatId]);

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
        Chat {chatId}
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
