import { Button, Container } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import UserDirectory from "../../user/components/UserDirectory";

export const Home2: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Button variant="outlined" onClick={logout} sx={{ mt: 2 }}>
        Log Out
      </Button>
      <UserDirectory></UserDirectory>
    </Container>
  );
};

export default Home2;
