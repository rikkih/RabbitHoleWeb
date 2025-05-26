import {
  Alert,
  Avatar,
  Checkbox,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useAllUsers } from "../hooks/useAllUsers";

const UserList: React.FC<{ onSelect: (ids: string[]) => void }> = ({
  onSelect,
}) => {
  const { users, loading, error } = useAllUsers();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const toggleUser = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  React.useEffect(() => {
    onSelect(selectedIds);
  }, [selectedIds, onSelect]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {users.map((user) => (
        <ListItemButton
          key={user.id}
          alignItems="flex-start"
          onClick={() => toggleUser(user.id)}
        >
          <Checkbox
            checked={selectedIds.includes(user.id)}
            onClick={(e) => e.stopPropagation()} // Prevent parent onClick
            onChange={() => toggleUser(user.id)}
          />
          <Avatar alt={user.name} src={user.avatarUrl} />
          <ListItemText
            primary={user.name}
            secondary={
              <>
                <Typography variant="body2" color="textPrimary">
                  {user.email}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {user.bio}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default UserList;
