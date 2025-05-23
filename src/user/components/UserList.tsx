import { Alert, Avatar, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useAllUsers } from "../hooks/useAllUsers";



const UserList: React.FC = () => {
  const { users, loading, error } = useAllUsers();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {users.map(user => (
        <ListItem key={user.email} alignItems="flex-start">
          <Avatar alt={user.name} src={user.avatarUrl} />
          <ListItemText
            primary={user.name}
            secondary={
              <>
                <Typography variant="body2" color="textPrimary">{user.email}</Typography>
                <Typography variant="caption" color="textSecondary">{user.bio}</Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;