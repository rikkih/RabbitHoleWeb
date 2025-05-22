import React, { useState, useRef } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import type { UserProfile } from "./UserProfile";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  profile: UserProfile | null;
  onAvatarUploaded?: () => void; // for refresh
}

const UserProfileCard: React.FC<Props> = ({ profile, onAvatarUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getAccessTokenSilently } = useAuth0();

  if (!profile) return null;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size must be under 5MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const token = await getAccessTokenSilently();

      await fetch("/api/profile/avatar", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      setMessage("Avatar uploaded successfully!");
      onAvatarUploaded?.();
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mt: 4, mx: "auto", p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>

        <Avatar
          src={profile.avatarUrl || undefined}
          sx={{ width: 100, height: 100, mb: 2 }}
        >
          {profile.displayName?.charAt(0) || "?"}
        </Avatar>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        <Button
          variant="contained"
          startIcon={
            uploading ? <CircularProgress size={20} /> : <CloudUpload />
          }
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          fullWidth
          sx={{ mb: 2 }}
        >
          {uploading ? "Uploading..." : "Upload Avatar"}
        </Button>

        <TextField
          label="ID"
          value={profile.id}
          fullWidth
          margin="dense"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Name"
          value={profile.displayName}
          fullWidth
          margin="dense"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Email"
          value={profile.email}
          fullWidth
          margin="dense"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Bio"
          value={profile.bio || "No bio set"}
          fullWidth
          margin="dense"
          multiline
          rows={3}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </CardContent>

      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
        message={message}
      />
    </Card>
  );
};

export default UserProfileCard;
