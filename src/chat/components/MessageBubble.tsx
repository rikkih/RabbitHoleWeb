import { Avatar, Box, Typography } from "@mui/material";
import type { MessageDto } from "../types/MessageDto";

interface MessageBubbleProps {
  message: MessageDto;
  isCurrentUser: boolean;
}

export default function MessageBubble({
  message,
  isCurrentUser,
}: MessageBubbleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
        mb: 1,
        px: 2,
      }}
    >
      {/* Avatar on left for others */}
      {!isCurrentUser && (
        <Avatar
          src={message.avatarUrl || undefined}
          alt="User avatar"
          sx={{ width: 32, height: 32, mr: 1 }}
        >
          {!message.avatarUrl && (message.fromId?.[0]?.toUpperCase() || "U")}
        </Avatar>
      )}

      {/* Message bubble */}
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
          {new Date(message.sentAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>

      {/* Avatar on right for current user */}
      {isCurrentUser && (
        <Avatar
          src={message.avatarUrl || undefined}
          alt="User avatar"
          sx={{ width: 32, height: 32, ml: 1 }}
        >
          {!message.avatarUrl && (message.fromId?.[0]?.toUpperCase() || "U")}
        </Avatar>
      )}
    </Box>
  );
}
