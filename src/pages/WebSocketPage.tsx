import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useChat } from "../hooks/useChat";

function WebSocketPage() {
  const { chatMessages, sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chat Room
      </Typography>

      <List sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}>
        {chatMessages.map((msg, idx) => (
          <ListItem key={idx} alignItems="flex-start">
            <ListItemText
              primary={<strong>{msg.from}</strong>}
              secondary={msg.text}
            />
          </ListItem>
        ))}
        <div ref={bottomRef} />
      </List>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default WebSocketPage;
