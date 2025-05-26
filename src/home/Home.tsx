import {
  Alert,
  Box,
  Button,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useChatApi } from "../chat/services/useChatApi";
import type { ChatDto } from "../chat/types/ChatDto";
import UserList from "../user/components/UserList";

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { createChat, getUserChats } = useChatApi();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [chatTitle, setChatTitle] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  // New state for chats list
  const [chats, setChats] = useState<ChatDto[]>([]);

  const navigate = useNavigate();

  // Fetch chats on component mount
  useEffect(() => {
    const loadChats = async () => {
      const userChats = await getUserChats();
      setChats(userChats);
    };
    loadChats();
  }, [getUserChats]);

  const handleCreateChat = async () => {
    const chatId = await createChat({
      title: chatTitle,
      userIds: selectedUserIds,
    });
    if (chatId) {
      const userChats = await getUserChats();
      setChats(userChats);
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
        Your Chats
      </Typography>
      {chats.length === 0 ? (
        <Typography>No chats found.</Typography>
      ) : (
        <List>
          {chats.map((chat) => (
            <ListItemButton
              key={chat.id}
              onClick={() => navigate(`/chats/${chat.id}`)}
            >
              <ListItemText primary={chat.title} />
            </ListItemButton>
          ))}
        </List>
      )}

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
