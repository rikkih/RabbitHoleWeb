export interface UserProfileDto {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

export interface UserProfile {
  id: string;
  displayName?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
}