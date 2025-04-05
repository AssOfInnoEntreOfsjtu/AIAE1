import { User } from './user';

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  postCount: number;
  followers: number;
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

export interface PostStats {
  likes: number;
  comments: number;
  views: number;
  shares: number;
  bookmarks: number;
} 