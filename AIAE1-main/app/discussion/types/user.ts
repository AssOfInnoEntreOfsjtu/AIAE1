export interface User {
  id: number;
  name: string;
  avatar: string;
  role: 'admin' | 'expert' | 'member';
  title?: string;
  organization?: string;
  followers: number;
  following: number;
  posts: number;
  reputation: number;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  lastActive: string;
  settings: UserSettings;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  privacy: 'public' | 'private' | 'friends';
  language: string;
  theme: 'light' | 'dark' | 'system';
} 