import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Typography } from "@mui/material";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Sign in to Rabbit Hole
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Click below to log in via Auth0.
      </Typography>
      <Button variant="contained" onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    </Container>
  );
};

export default LoginPage;