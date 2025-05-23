import { Button, Container, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";

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
    </Container>
  );
};

export default Home;
