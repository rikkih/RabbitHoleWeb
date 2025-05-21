import React from "react";
import { Typography } from "@mui/material";
import type { UserProfile } from "./UserProfile";

interface Props {
  profile: UserProfile | null;
}

const ProfileDisplay: React.FC<Props> = ({ profile }) => {
  if (!profile) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h6">Profile</Typography>
      <Typography>
        <strong>ID:</strong> {profile.id}
      </Typography>
      <Typography>
        <strong>Name:</strong> {profile.displayName}
      </Typography>
      <Typography>
        <strong>Email:</strong> {profile.email}
      </Typography>
      <Typography>
        <strong>Bio:</strong>{" "}
        {profile.bio || "No Bio Yet. PLACEHOLDER [Create one here.]"}
      </Typography>
      {profile.profileImageUrl && (
        <img
          src={profile.profileImageUrl}
          alt="Profile"
          style={{ width: "150px", borderRadius: "8px", marginTop: "1rem" }}
        />
      )}
    </div>
  );
};

export default ProfileDisplay;
