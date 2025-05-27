import { Box, Button, TextField } from "@mui/material";

interface ChatInputAreaProps {
  messageInput: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export function ChatInputArea({ messageInput, onInputChange, onSend }: ChatInputAreaProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderTop: "1px solid",
        borderColor: "divider",
        flexShrink: 0,
        display: "flex",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        value={messageInput}
        onChange={onInputChange}
        label="Type your message"
        variant="outlined"
      />
      <Button variant="contained" onClick={onSend}>
        Send
      </Button>
    </Box>
  );
}
