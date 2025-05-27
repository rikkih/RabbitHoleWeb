import { Box } from "@mui/material";
import { ChatContainer, type ChatContainerProps } from "./ChatContainer";

export default function ChatLayout(props: ChatContainerProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      <ChatContainer {...props} />
    </Box>
  );
}
