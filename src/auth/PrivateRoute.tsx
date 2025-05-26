import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || (!isAuthenticated && !isLoading)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
