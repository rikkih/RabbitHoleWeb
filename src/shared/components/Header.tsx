import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type HeaderProps = {
  user?: { name: string };
  logout: () => void;
};

const Header: React.FC<HeaderProps> = ({ user, logout }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1c1c1c" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component={Link}
          to="/"
          variant="h5"
          sx={{
            fontFamily: "monospace",
            fontWeight: "bold",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          The Rabbit Hole
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user?.name}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
