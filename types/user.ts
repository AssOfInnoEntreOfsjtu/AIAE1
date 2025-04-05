export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  title?: string;
  location?: string;
  website?: string;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
} 