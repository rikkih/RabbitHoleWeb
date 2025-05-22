import React, { useRef, useState } from "react";
import {
  Typography,
  Button,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import type { UserProfile } from "./UserProfile";

interface Props {
  profile: UserProfile | null;
  refreshProfile?: () => void;
}

const ProfileDisplay: React.FC<Props> = ({ profile, refreshProfile }) => {
  const { getAccessTokenSilently } = useAuth0();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB.");
      return;
    }

    try {
      setUploading(true);
      const token = await getAccessTokenSilently();

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8080/api/profile/avatar", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      refreshProfile?.(); // Refresh after upload
    } catch {
      setError("Failed to upload avatar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Typography variant="h6">Profile</Typography>
      <Typography>
        <strong>ID:</strong> {profile.id}
      </Typography>
      <Typography>
        <strong>Name:</strong> {profile.displayName || "No Username"}
      </Typography>
      <Typography>
        <strong>Email:</strong> {profile.email || "No Email"}
      </Typography>
      <Typography>
        <strong>Bio:</strong>{" "}
        {profile.bio || "No Bio Yet. PLACEHOLDER [Create one here]"}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={profile.profileImageUrl || undefined}
          alt="Profile"
          sx={{ width: 100, height: 100 }}
        />
        <div>
          <Button variant="contained" onClick={handleUploadClick} disabled={uploading}>
            {uploading ? <CircularProgress size={24} /> : "Upload Avatar"}
          </Button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </Stack>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ProfileDisplay;