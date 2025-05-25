import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../auth/AuthProvider";
import UserList from "../user/components/UserList";
import { useChatService } from "../chat/services/useChatService";
import { useState } from "react";

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { createChat } = useChatService();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [chatTitle, setChatTitle] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleCreateChat = async () => {
    const chatId = await createChat({
      title: chatTitle,
      userIds: selectedUserIds,
    });
    if (chatId) {
      setSnackbarMessage("Chat created successfully!");
      setChatTitle("");
      setSelectedUserIds([]);
    } else {
      setSnackbarMessage("Failed to create chat.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        The Rabbit Hole
      </Typography>
      <Typography variant="body1">Welcome, {user?.name}</Typography>
      <Button variant="outlined" onClick={logout} sx={{ mt: 2 }}>
        Log Out
      </Button>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        User Directory
      </Typography>
      <UserList onSelect={setSelectedUserIds} />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Chat Title"
          value={chatTitle}
          onChange={(e) => setChatTitle(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCreateChat}
          disabled={!chatTitle || selectedUserIds.length === 0}
        >
          Create Chat
        </Button>
      </Box>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
      >
        <Alert severity="info">{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;