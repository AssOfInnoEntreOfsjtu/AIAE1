'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useNetwork } from '@/hooks/useNetwork';
import { useOrientation } from '@/hooks/useOrientation';
import ProfileHeader from '@/app/profile/components/ProfileHeader';
import ProfileInfo from '@/app/profile/components/ProfileInfo';
import ResourceList from '@/app/profile/components/resources/ResourceList';
import ActivityFeed from '@/app/profile/components/activity/ActivityFeed';
import AnalyticsDashboard from '@/app/profile/components/analytics/AnalyticsDashboard';
import SettingsPanel from '@/app/profile/components/settings/SettingsPanel';

export default function ProfilePage() {
  const { user, loading, error, logout } = useUser();
  const { isOnline, type } = useNetwork();
  const { type: orientationType } = useOrientation();
  const [activeTab, setActiveTab] = useState('profile');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* 系统状态通知 */}
      <div className="glass sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></span>
                {isOnline ? '在线' : '离线'}
              </div>
              <div className="text-gray-500">
                {type === 'wifi' ? 'WiFi' : type === '4g' ? '4G' : '其他'}
              </div>
            </div>
            <div className="text-gray-500">
              {orientationType === 'portrait' ? '竖屏' : '横屏'}
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧边栏 */}
          <div className="lg:w-1/4">
            <div className="card p-6">
              <ProfileHeader user={user} onLogout={logout} />
              <div className="mt-6">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'profile'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                  >
                    个人资料
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'resources'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                  >
                    资源管理
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'activity'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                  >
                    活动记录
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'analytics'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                  >
                    数据分析
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'settings'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                  >
                    设置
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="lg:w-3/4">
            <div className="card p-6">
              {activeTab === 'profile' && <ProfileInfo user={user} />}
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <ResourceList type="project" title="我的项目" />
                  <ResourceList type="talent" title="人才库" />
                  <ResourceList type="investment" title="投资机会" />
                  <ResourceList type="favorite" title="收藏夹" />
                </div>
              )}
              {activeTab === 'activity' && <ActivityFeed userId={String(user.id)} />}
              {activeTab === 'analytics' && (
                <AnalyticsDashboard timeRange={timeRange} onTimeRangeChange={setTimeRange} />
              )}
              {activeTab === 'settings' && <SettingsPanel userId={String(user.id)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
