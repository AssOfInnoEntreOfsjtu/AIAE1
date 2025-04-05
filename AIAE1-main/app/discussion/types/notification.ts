import { User } from './user';

export interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
  title: string;
  content: string;
  sender?: User;
  postId?: number;
  date: string;
  isRead: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  types: {
    like: boolean;
    comment: boolean;
    follow: boolean;
    mention: boolean;
    system: boolean;
  };
} 