import { Box, Typography } from "@mui/material";
import type { MessageDto } from "../types/MessageDto";

interface MessageBubbleProps {
  message: MessageDto;
  isCurrentUser: boolean;
}

export default function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
        mb: 1,
        px: 2, // horizontal padding to prevent full edge-to-edge
      }}
    >
      {!isCurrentUser && message.avatarUrl && (
        <Box
          component="img"
          src={message.avatarUrl}
          alt="avatar"
          sx={{ width: 32, height: 32, borderRadius: "50%", mr: 1 }}
        />
      )}
      <Box
        sx={{
          bgcolor: isCurrentUser ? "primary.main" : "grey.300",
          color: isCurrentUser ? "white" : "black",
          borderRadius: 2,
          px: 2,
          py: 1,
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "right", mt: 0.5 }}
        >
          {new Date(message.sentAt || message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Box>
  );
}
