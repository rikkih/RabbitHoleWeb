import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChatService } from "../services/useChatService";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

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

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    getRecentMessages(chatId).then((page) => {
      setMessages(page.content);
      setLoading(false);
    });
  }, [chatId, getRecentMessages]);

  if (loading) return <Typography>Loading chat messages...</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Chat {chatId}
      </Typography>
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            <ListItemText
              primary={msg.content}
              secondary={new Date(msg.sentAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatView;
