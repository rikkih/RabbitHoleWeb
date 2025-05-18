import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WebSocketPage from "./WebSocketPage";

function Home() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Auth0 + Vite + Spring Boot
      </Typography>

      {!isAuthenticated ? (
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      ) : (
        <>
          <Typography variant="body1">Welcome, {user?.name}</Typography>
          <Button
            variant="outlined"
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            Log Out
          </Button>
          <Button variant="contained" color="primary" onClick={callApi}>
            Call Secure API
          </Button>
          <Button variant="contained" component={Link} to="/websocket">
            Go to WebSocket Page
          </Button>
        </>
      )}
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/websocket" element={<WebSocketPage />} />
      </Routes>
    </Router>
  );
}

export default App;