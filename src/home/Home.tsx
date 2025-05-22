// Home.tsx
import React from "react";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useUserProfile from "../user/useUserProfile";
import ProfileDisplay from "../user/ProfileDisplay";

const Home: React.FC = () => {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const {
    profile,
    loading: profileLoading,
    error: profileError,
    refreshProfile,
  } = useUserProfile(isAuthenticated, getAccessTokenSilently);

  const callApi = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch("http://localhost:8080/api/secure", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(await response.text());
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

          <ProfileDisplay profile={profile} refreshProfile={refreshProfile} />

          <Button
            variant="outlined"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            sx={{ mt: 2 }}
          >
            Log Out
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={callApi}
            sx={{ ml: 2 }}
          >
            Call Secure API
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/websocket"
            sx={{ ml: 2 }}
          >
            Go to WebSocket Page
          </Button>
        </>
      )}
    </Container>
  );
};

export default Home;