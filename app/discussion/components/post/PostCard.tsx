'use client';

import { useState } from 'react';
import { Post } from '../../types';
import UserAvatar from '../user/UserAvatar';
import InteractionButton from '../interaction/InteractionButton';

interface PostCardProps {
  post: Post;
  onViewDetail: (postId: number) => void;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
  onFavorite: (postId: number) => void;
  onShare: (postId: number) => void;
  onFollow: (postId: number) => void;
  onBookmark: (postId: number) => void;
  onReport: (postId: number) => void;
  onEdit?: () => void;
}

export default function PostCard({
  post,
  onViewDetail,
  onLike,
  onComment,
  onFavorite,
  onShare,
  onFollow,
  onBookmark,
  onReport,
  onEdit
}: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-300 ${isHovered ? 'shadow-xl transform -translate-y-1' : ''
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <UserAvatar user={post.author} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
              {post.status === 'hot' && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                  热门
                </span>
              )}
              {post.status === 'featured' && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                  精选
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span>{post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>👁️</span>
                <span>{post.views}</span>
              </span>
              <span>•</span>
              <span className="text-blue-600">
                最后活跃: {post.lastActivity}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <InteractionButton
            icon="🤍"
            activeIcon="❤️"
            count={post.likes}
            isActive={post.isLiked}
            onClick={() => onLike(post.id)}
            label="点赞"
            color="red"
          />
          <InteractionButton
            icon="💬"
            activeIcon="💬"
            count={post.comments}
            isActive={false}
            onClick={() => onComment(post.id)}
            label="评论"
            color="blue"
          />
          <InteractionButton
            icon="☆"
            activeIcon="⭐"
            count={0}
            isActive={post.isFavorited}
            onClick={() => onFavorite(post.id)}
            label="收藏"
            color="yellow"
            showCount={false}
          />
          <InteractionButton
            icon="↗️"
            activeIcon="↗️"
            count={0}
            isActive={post.isShared}
            onClick={() => onShare(post.id)}
            label="分享"
            color="green"
            showCount={false}
          />
          <InteractionButton
            icon="👁️"
            activeIcon="👁️"
            count={0}
            isActive={post.isBookmarked}
            onClick={() => onBookmark(post.id)}
            label="稍后阅读"
            color="purple"
            showCount={false}
          />
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center gap-1">
          <span>{post.category.icon}</span>
          {post.category.name}
        </span>
        {post.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onFollow(post.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${post.isFollowing
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
          >
            {post.isFollowing ? '已关注' : '关注作者'}
          </button>
          <button
            onClick={() => onReport(post.id)}
            className="text-gray-500 hover:text-red-600 text-sm transition-colors"
          >
            举报
          </button>
        </div>
        <button
          onClick={() => onViewDetail(post.id)}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          查看详情
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </article>
  );
} 