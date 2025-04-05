import { useState, useEffect } from 'react';
import { Notification, NotificationPreferences } from '../types/notification';

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    } catch (err) {
      setError('加载通知失败');
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPreferences = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/notifications/preferences');
      const data = await response.json();
      setPreferences(data);
    } catch (err) {
      setError('加载通知设置失败');
      console.error('Error loading preferences:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      // TODO: 实现实际的 API 调用
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError('标记通知已读失败');
      console.error('Error marking notification as read:', err);
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: 实现实际的 API 调用
      await fetch('/api/notifications/read-all', {
        method: 'POST',
      });
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      setError('标记所有通知已读失败');
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  };

  const updatePreferences = async (updates: Partial<NotificationPreferences>) => {
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/notifications/preferences', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      setPreferences(prev => prev ? { ...prev, ...data } : data);
      return data;
    } catch (err) {
      setError('更新通知设置失败');
      console.error('Error updating preferences:', err);
      throw err;
    }
  };

  const deleteNotification = async (notificationId: number) => {
    try {
      // TODO: 实现实际的 API 调用
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError('删除通知失败');
      console.error('Error deleting notification:', err);
      throw err;
    }
  };

  return {
    notifications,
    unreadCount,
    preferences,
    loading,
    error,
    loadNotifications,
    loadPreferences,
    markAsRead,
    markAllAsRead,
    updatePreferences,
    deleteNotification,
  };
} 