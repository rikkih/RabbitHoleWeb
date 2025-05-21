import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileDisplay from "../components/ProfileDisplay";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const {
    // Auth state:
    isAuthenticated,
    isLoading,
    user,
    // Auth methods:
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile(isAuthenticated, getAccessTokenSilently);

  const callApi = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch("http://localhost:8080/api/secure", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const text = await response.text();
    console.log(text);
  };

  if (isLoading || profileLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Rabbit Hole
      </Typography>

      {!isAuthenticated ? (
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      ) : (
        <>
          <Typography variant="body1">Welcome, {user?.name}</Typography>

          {profileError && (
            <Typography color="error">Error: {profileError}</Typography>
          )}

          <ProfileDisplay profile={profile} />

          <Button
            variant="outlined"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            style={{ marginTop: "1rem" }}
          >
            Log Out
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={callApi}
            style={{ marginLeft: "1rem" }}
          >
            Call Secure API
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/websocket"
            style={{ marginLeft: "1rem" }}
          >
            Go to WebSocket Page
          </Button>
        </>
      )}
    </Container>
  );
};

export default Home;