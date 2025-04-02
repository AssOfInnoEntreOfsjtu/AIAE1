'use client';

import React, { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';
import { useWebSocket } from '@/hooks/useWebSocket';

interface Activity {
  id: string;
  type: 'message' | 'interaction' | 'announcement';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

interface ActivityFeedProps {
  userId: string;
}

export default function ActivityFeed({ userId }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { lastMessage } = useWebSocket(`/ws/activities/${userId}`);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/activities/${userId}`);
        if (!response.ok) {
          throw new Error('获取活动动态失败');
        }
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取活动动态失败');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userId]);

  useEffect(() => {
    if (lastMessage) {
      const newActivity = JSON.parse(lastMessage);
      setActivities((prev) => [newActivity, ...prev]);
    }
  }, [lastMessage]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/activities/${id}/read`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to mark activity as read');
      }

      // 更新本地状态
      setActivities(prev =>
        prev.map(activity =>
          activity.id === id ? { ...activity, read: true } : activity
        )
      );
    } catch (error) {
      console.error('Error marking activity as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-4">暂无活动动态</p>
      ) : (
        activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onMarkAsRead={() => handleMarkAsRead(activity.id)}
          />
        ))
      )}
    </div>
  );
} 