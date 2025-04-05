'use client';

import { useState } from 'react';
import { Comment, User } from '../../types';
import UserAvatar from '../user/UserAvatar';
import InteractionButton from './InteractionButton';

interface CommentDialogProps {
  postId: number;
  author: User;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export default function CommentDialog({
  postId,
  author,
  onClose,
  onSubmit
}: CommentDialogProps) {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: "非常赞同您的观点，AI在医疗领域确实有很大的发展空间。",
      author: {
        id: 2,
        name: "李医生",
        avatar: "/avatars/doctor2.jpg",
        role: "expert",
        title: "医疗AI研究员",
        organization: "某研究所",
        followers: 56,
        following: 23,
        posts: 12,
        reputation: 89
      },
      date: "2024-03-20 14:30",
      likes: 12,
      isLiked: false,
      isReported: false
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      content: content.trim(),
      author: {
        id: 1,
        name: "当前用户",
        avatar: "/avatars/default.jpg",
        role: "member",
        followers: 0,
        following: 0,
        posts: 1,
        reputation: 0
      },
      date: new Date().toLocaleString(),
      likes: 0,
      isLiked: false,
      isReported: false
    };

    setComments([newComment, ...comments]);
    onSubmit(content);
    setContent('');
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* 对话框头部 */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar user={author} size="sm" />
            <div>
              <h3 className="font-semibold text-gray-900">{author.name}</h3>
              <p className="text-sm text-gray-500">{author.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* 评论列表 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <UserAvatar user={comment.author} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{comment.author.name}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 mb-2">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <InteractionButton
                    icon="🤍"
                    activeIcon="❤️"
                    count={comment.likes}
                    isActive={comment.isLiked}
                    onClick={() => handleLikeComment(comment.id)}
                    label="点赞"
                    color="red"
                  />
                  <button className="text-gray-500 hover:text-gray-700 text-sm">
                    回复
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 评论输入框 */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100">
          <div className="flex gap-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下你的评论..."
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 