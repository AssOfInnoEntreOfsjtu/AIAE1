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

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  postCount: number;
  followers: number;
}

export interface Lab {
  id: number;
  name: string;
  icon: string;
  description: string;
  memberCount: number;
  projectCount: number;
  publicationCount: number;
  members: User[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  date: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  category: Category;
  isLiked: boolean;
  isFavorited: boolean;
  isShared: boolean;
  isFollowing: boolean;
  isBookmarked: boolean;
  isReported: boolean;
  status: 'normal' | 'hot' | 'featured';
  lastActivity: string;
  contributors: User[];
  relatedPosts: Post[];
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  date: string;
  likes: number;
  isLiked: boolean;
  isReported: boolean;
  mentions?: User[];
  attachments?: string[];
  replies?: Comment[];
  parentId?: number;
  replyTo?: User;
}

export interface NewPost {
  title: string;
  content: string;
  tags: string;
  categoryId: number;
}

export interface PostFilters {
  search?: string;
  categoryId?: number;
  sortBy?: 'latest' | 'popular' | 'mostCommented';
  tags?: string[];
}

export interface InteractionStats {
  likes: number;
  comments: number;
  views: number;
  shares: number;
  bookmarks: number;
}

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