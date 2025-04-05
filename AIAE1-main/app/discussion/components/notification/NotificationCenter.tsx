'use client';

import { useState } from 'react';
import { User } from '../../types';
import UserAvatar from '../user/UserAvatar';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
  title: string;
  content: string;
  sender?: User;
  postId?: number;
  date: string;
  isRead: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
  onViewPost: (postId: number) => void;
  onViewProfile: (userId: number) => void;
}

export default function NotificationCenter({
  notifications,
  onMarkAsRead,
  onViewPost,
  onViewProfile
}: NotificationCenterProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👤';
      case 'mention':
        return '📢';
      case 'system':
        return '🔔';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.postId) {
      onViewPost(notification.postId);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-lg border border-gray-100 z-50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">通知中心</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                暂无通知
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.content}</p>
                      {notification.sender && (
                        <div
                          className="flex items-center gap-2 text-sm text-gray-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewProfile(notification.sender!.id);
                          }}
                        >
                          <UserAvatar user={notification.sender} size="sm" />
                          <span>{notification.sender.name}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-400">{notification.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setShowDropdown(false)}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                关闭
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 