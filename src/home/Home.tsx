import { Button, Container, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";
import UserList from "../user/components/UserList";
import UserProfilePanel from "../user/components/UserProfilePanel";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        The Rabbit Hole
      </Typography>
      <Typography variant="body1">Welcome, {user?.name}</Typography>
      <Button variant="outlined" onClick={() => logout()} sx={{ mt: 2 }}>
        Log Out
      </Button>
      <UserProfilePanel />
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        User Directory
      </Typography>
      <UserList />
    </Container>
  );
};

export default Home;
