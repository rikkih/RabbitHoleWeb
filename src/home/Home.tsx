import { Button, Container, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";
import UserList from "../user/components/UserList";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Rabbit Hole
      </Typography>
      <Typography variant="body1">Welcome, {user?.name}</Typography>
      <Button variant="outlined" onClick={() => logout()} sx={{ mt: 2 }}>
        Log Out
      </Button>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        User Directory
      </Typography>
      <UserList />
    </Container>
  );
};

export default Home;
