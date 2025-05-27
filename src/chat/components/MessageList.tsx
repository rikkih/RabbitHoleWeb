import { Box } from "@mui/material";
import type { MessageDto } from "../types/MessageDto";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: MessageDto[];
  currentUserId: string;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessagesList({
  messages,
  currentUserId,
  messageEndRef,
}: MessageListProps) {
  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, py: 1 }}>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isCurrentUser={msg.fromId === currentUserId}
        />
      ))}
      <div ref={messageEndRef} />
    </Box>
  );
}
