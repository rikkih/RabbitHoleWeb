import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "./AuthProvider";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    login();
    return null; // while redirecting
  }

  return <>{children}</>;
};

export default PrivateRoute;
