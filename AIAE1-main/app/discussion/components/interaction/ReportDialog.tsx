'use client';

import { useState } from 'react';
import { Post } from '../../types';

interface ReportDialogProps {
  post: Post;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export default function ReportDialog({
  post,
  onClose,
  onSubmit
}: ReportDialogProps) {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const reportReasons = [
    {
      id: 'spam',
      label: '垃圾广告',
      description: '包含商业广告或推广内容'
    },
    {
      id: 'inappropriate',
      label: '不当内容',
      description: '包含暴力、色情等不当内容'
    },
    {
      id: 'copyright',
      label: '版权问题',
      description: '侵犯他人知识产权'
    },
    {
      id: 'other',
      label: '其他原因',
      description: '其他需要举报的原因'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason || (selectedReason === 'other' && !reason.trim())) return;
    onSubmit(selectedReason === 'other' ? reason : reportReasons.find(r => r.id === selectedReason)?.label || '');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* 对话框头部 */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">举报内容</h3>
          <p className="text-sm text-gray-500 mt-1">{post.title}</p>
        </div>

        {/* 举报表单 */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {reportReasons.map(option => (
              <label
                key={option.id}
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="reason"
                  value={option.id}
                  checked={selectedReason === option.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </label>
            ))}
          </div>

          {selectedReason === 'other' && (
            <div className="mt-4">
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="请详细描述举报原因..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!selectedReason || (selectedReason === 'other' && !reason.trim())}
              className="flex-1 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              提交举报
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 