'use client';

import { Post } from '../../types';
import PostCard from './PostCard';

interface RecommendedPostsProps {
  posts: Post[];
  onViewDetail: (postId: number) => void;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
  onFavorite: (postId: number) => void;
  onShare: (postId: number) => void;
  onFollow: (postId: number) => void;
  onBookmark: (postId: number) => void;
  onReport: (postId: number) => void;
}

export default function RecommendedPosts({
  posts,
  onViewDetail,
  onLike,
  onComment,
  onFavorite,
  onShare,
  onFollow,
  onBookmark,
  onReport
}: RecommendedPostsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">推荐阅读</h3>
      <div className="space-y-4">
        {posts.map(post => (
          <div
            key={post.id}
            className="p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            onClick={() => onViewDetail(post.id)}
          >
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{post.title}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.views} 阅读</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 