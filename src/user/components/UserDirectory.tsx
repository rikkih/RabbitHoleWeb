import { Avatar, Box, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { useUserApi } from "../hooks/useUserApi";

// TODO: TEMP
export const UserDirectory: React.FC = () => {
  const { users, loading, error } = useUserApi();
  const theme = useTheme();

  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (users.length === 0) return <Typography>No users found.</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        User Directory
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                boxShadow: 2,
                borderRadius: 2,
                height: "100%",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {user.email}
                </Typography>
                {user.bio && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {user.bio}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDirectory;
