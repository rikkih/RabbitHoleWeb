import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatApi } from "../../chat/services/useChatApi";
import type { ChatDto } from "../../chat/types/ChatDto";
import { useUserApi } from "../../user/hooks/useUserApi";
import type { UserProfileDto } from "../../user/types/UserProfileDto";

export const Home2: React.FC = () => {
  const { createChat, getUserChats } = useChatApi();
  const navigate = useNavigate();

  const { users, loading: loadingUsers, error: usersError } = useUserApi();

  const [chats, setChats] = useState<ChatDto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserProfileDto[]>([]);
  const [chatTitle, setChatTitle] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadChats = async () => {
      const userChats = await getUserChats();
      setChats(userChats);
    };
    loadChats();
  }, [getUserChats]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUsers([]);
    setChatTitle("");
  };

  const handleCreateChat = async () => {
    const userIds = selectedUsers.map((u) => u.id);
    const chatId = await createChat({
      title: chatTitle,
      userIds,
    });
    if (chatId) {
      const userChats = await getUserChats();
      setChats(userChats);
      setSnackbarMessage("Chat created successfully!");
      closeModal();
    } else {
      setSnackbarMessage("Failed to create chat.");
    }
  };

  return (
    <Container sx={{ position: "relative", pb: 8 }}>
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
              onClick={() =>
                navigate(`/chats/${chat.id}`, {
                  state: { chatTitle: chat.title },
                })
              }
            >
              <ListItemText primary={chat.title} />
            </ListItemButton>
          ))}
        </List>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={openModal}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>

      {/* Modal for creating chat */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            width: { xs: "90%", sm: 400 },
          }}
        >
          <Typography variant="h6" mb={2}>
            Create New Chat
          </Typography>

          {usersError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {usersError}
            </Alert>
          )}

          <Autocomplete
            multiple
            options={users}
            getOptionLabel={(option) => option.name}
            value={selectedUsers}
            onChange={(_, newValue) => setSelectedUsers(newValue)}
            loading={loadingUsers}
            disabled={loadingUsers || !!usersError}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Users"
                placeholder="Type to search..."
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingUsers ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <TextField
            fullWidth
            label="Chat Title"
            value={chatTitle}
            onChange={(e) => setChatTitle(e.target.value)}
            margin="normal"
          />

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              variant="contained"
              disabled={chatTitle === "" || selectedUsers.length === 0}
              onClick={handleCreateChat}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar */}
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

export default Home2;