import { useState, useEffect } from 'react';
import { User, UserProfile, UserSettings } from '../types/user';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError('加载用户信息失败');
      console.error('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch(`/api/user/${userId}/profile`);
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError('加载用户资料失败');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/user/settings');
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      setError('加载用户设置失败');
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      setProfile(prev => prev ? { ...prev, ...data } : data);
      return data;
    } catch (err) {
      setError('更新用户资料失败');
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      setSettings(prev => prev ? { ...prev, ...data } : data);
      return data;
    } catch (err) {
      setError('更新用户设置失败');
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  const followUser = async (userId: number) => {
    try {
      // TODO: 实现实际的 API 调用
      await fetch(`/api/user/${userId}/follow`, {
        method: 'POST',
      });
      setProfile(prev => prev ? {
        ...prev,
        followers: prev.followers + 1,
        isFollowing: true,
      } : null);
    } catch (err) {
      setError('关注用户失败');
      console.error('Error following user:', err);
      throw err;
    }
  };

  const unfollowUser = async (userId: number) => {
    try {
      // TODO: 实现实际的 API 调用
      await fetch(`/api/user/${userId}/follow`, {
        method: 'DELETE',
      });
      setProfile(prev => prev ? {
        ...prev,
        followers: prev.followers - 1,
        isFollowing: false,
      } : null);
    } catch (err) {
      setError('取消关注用户失败');
      console.error('Error unfollowing user:', err);
      throw err;
    }
  };

  return {
    user,
    profile,
    settings,
    loading,
    error,
    loadUser,
    loadProfile,
    loadSettings,
    updateProfile,
    updateSettings,
    followUser,
    unfollowUser,
  };
} 