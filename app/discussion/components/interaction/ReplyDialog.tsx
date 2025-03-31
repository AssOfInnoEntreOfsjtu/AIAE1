'use client';

import { useState } from 'react';
import { User } from '../../types';
import UserAvatar from '../user/UserAvatar';

interface ReplyDialogProps {
  postId: number;
  commentId: number;
  author: User;
  replyTo: User;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export default function ReplyDialog({
  postId,
  commentId,
  author,
  replyTo,
  onClose,
  onSubmit
}: ReplyDialogProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      onSubmit(content.trim());
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">回复评论</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 回复目标用户信息 */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
          <UserAvatar user={replyTo} size="sm" />
          <div>
            <p className="text-sm text-gray-600">回复给</p>
            <p className="font-medium text-gray-900">{replyTo.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的回复..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-900"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '发送中...' : '发送回复'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 