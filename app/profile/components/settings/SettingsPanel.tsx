'use client';

import React from 'react';
import { useState } from 'react';
import ThemeSelector from './ThemeSelector';

interface SettingsPanelProps {
  userId: string;
}

interface Settings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showOnlineStatus: boolean;
    showLastSeen: boolean;
  };
}

export default function SettingsPanel({ userId }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>({
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      showLastSeen: true,
    },
  });

  const handleThemeChange = (theme: Settings['theme']) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const handleNotificationChange = (type: keyof Settings['notifications']) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handlePrivacyChange = (type: keyof Settings['privacy']) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: !prev.privacy[type],
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('保存设置失败');
      }
    } catch (error) {
      console.error('保存设置失败:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 主题设置 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">主题设置</h3>
        <ThemeSelector
          value={settings.theme}
          onChange={handleThemeChange}
        />
      </div>

      {/* 通知设置 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">通知设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">邮件通知</h4>
              <p className="text-sm text-gray-500">接收邮件通知</p>
            </div>
            <button
              onClick={() => handleNotificationChange('email')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">推送通知</h4>
              <p className="text-sm text-gray-500">接收浏览器推送通知</p>
            </div>
            <button
              onClick={() => handleNotificationChange('push')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.notifications.push ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">短信通知</h4>
              <p className="text-sm text-gray-500">接收短信通知</p>
            </div>
            <button
              onClick={() => handleNotificationChange('sms')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.notifications.sms ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 隐私设置 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">隐私设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">显示在线状态</h4>
              <p className="text-sm text-gray-500">允许他人看到您的在线状态</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('showOnlineStatus')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.privacy.showOnlineStatus ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.privacy.showOnlineStatus ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">显示最后在线时间</h4>
              <p className="text-sm text-gray-500">允许他人看到您的最后在线时间</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('showLastSeen')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.privacy.showLastSeen ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.privacy.showLastSeen ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          保存设置
        </button>
      </div>
    </div>
  );
} 