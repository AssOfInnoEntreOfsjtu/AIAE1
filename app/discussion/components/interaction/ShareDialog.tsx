'use client';

import { useState } from 'react';
import { Post } from '../../types';

interface ShareDialogProps {
  post: Post;
  onClose: () => void;
}

export default function ShareDialog({ post, onClose }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/discussion/${post.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      name: '微信',
      icon: '💬',
      action: () => console.log('Share to WeChat')
    },
    {
      name: '朋友圈',
      icon: '👥',
      action: () => console.log('Share to Moments')
    },
    {
      name: '微博',
      icon: '🔄',
      action: () => console.log('Share to Weibo')
    },
    {
      name: 'QQ',
      icon: '💬',
      action: () => console.log('Share to QQ')
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* 对话框头部 */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">分享帖子</h3>
          <p className="text-sm text-gray-500 mt-1">{post.title}</p>
        </div>

        {/* 分享选项 */}
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {shareOptions.map(option => (
              <button
                key={option.name}
                onClick={option.action}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm text-gray-600">{option.name}</span>
              </button>
            ))}
          </div>

          {/* 复制链接 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleCopyLink}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {copied ? '已复制' : '复制链接'}
            </button>
          </div>
        </div>

        {/* 关闭按钮 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
} 