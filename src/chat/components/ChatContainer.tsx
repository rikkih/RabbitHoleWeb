import { Box } from "@mui/material";
import type { MessageDto } from "../types/MessageDto";
import { ChatInputArea } from "./ChatInputArea";
import { ChatTitleBar } from "./ChatTitleBar";
import { MessagesList } from "./MessageList";

export interface ChatContainerProps {
  chatTitle: string;
  allMessages: MessageDto[];
  currentUserId: string;
  messageEndRef: React.RefObject<HTMLDivElement | null>;
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
}

export function ChatContainer({
  chatTitle,
  allMessages,
  currentUserId,
  messageEndRef,
  messageInput,
  setMessageInput,
  handleSend,
}: ChatContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "100%",
        maxWidth: 800,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <ChatTitleBar title={chatTitle} />
      <MessagesList
        messages={allMessages}
        currentUserId={currentUserId}
        messageEndRef={messageEndRef}
      />
      <ChatInputArea
        messageInput={messageInput}
        onInputChange={(e) => setMessageInput(e.target.value)}
        onSend={handleSend}
      />
    </Box>
  );
}
