'use client';
import React from 'react';
interface Activity {
  id: string;
  type: 'message' | 'interaction' | 'announcement';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

interface ActivityItemProps {
  activity: Activity;
  onMarkAsRead: () => void;
}

export default function ActivityItem({ activity, onMarkAsRead }: ActivityItemProps) {
  const typeIcons = {
    message: '💬',
    interaction: '🤝',
    announcement: '📢',
  };

  const typeColors = {
    message: 'bg-blue-100 text-blue-800',
    interaction: 'bg-green-100 text-green-800',
    announcement: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`bg-white border rounded-lg p-4 ${!activity.read ? 'border-blue-500' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${typeColors[activity.type]}`}>
          {typeIcons[activity.type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-900">{activity.title}</h4>
            <span className="text-sm text-gray-500">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-gray-600">{activity.content}</p>
          <div className="mt-2 flex items-center space-x-2">
            {!activity.read && (
              <button
                onClick={onMarkAsRead}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                标记已读
              </button>
            )}
            {activity.link && (
              <a
                href={activity.link}
                className="text-sm text-blue-600 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                查看详情
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 