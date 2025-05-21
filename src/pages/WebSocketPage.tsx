import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";
import { useChat } from "../hooks/useChat";
import { useAuth0 } from "@auth0/auth0-react";

function WebSocketPage() {
  const { chatMessages, sendMessage } = useChat();
  const { user } = useAuth0();
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
        {chatMessages.map((msg, idx) => {
          const isMe = msg.from === user?.name;

          return (
            <ListItem
              key={idx}
              sx={{
                justifyContent: isMe ? "flex-end" : "flex-start",
                display: "flex",
              }}
            >
              {!isMe && (
                <ListItemAvatar>
                  <Avatar src={msg.avatarUrl} alt={msg.from} />
                </ListItemAvatar>
              )}

              <Paper
                elevation={2}
                sx={{
                  px: 2,
                  py: 1,
                  maxWidth: "70%",
                  bgcolor: isMe ? "primary.main" : "grey.100",
                  color: isMe ? "white" : "text.primary",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  {msg.from}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {msg.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Paper>

              {isMe && (
                <ListItemAvatar sx={{ ml: 1 }}>
                  <Avatar src={msg.avatarUrl} alt={msg.from} />
                </ListItemAvatar>
              )}
            </ListItem>
          );
        })}
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
