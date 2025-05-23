import { Box, CircularProgress, Typography } from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";

export const UserProfilePanel: React.FC = () => {
  const { profile, loading, error } = useUserProfile();

  if (loading) {
    return (
      <Box mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" mt={2}>
        Failed to load user profile: {error}
      </Typography>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Box mt={2}>
      <Typography variant="body1">Welcome, {profile.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {profile.email}
      </Typography>
    </Box>
  );
};

export default UserProfilePanel;