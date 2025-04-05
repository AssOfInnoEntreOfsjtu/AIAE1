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
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  Award,
  Star,
  Clock,
  Mail,
  MapPin,
  Link,
  Building2,
  GraduationCap,
  Code2,
  Brain,
  Users,
  Target,
  TrendingUp,
  FolderOpen,
  FolderGit2,
  Bookmark,
  History
} from 'lucide-react';

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

  const tabs = [
    { id: 'profile', title: '个人资料', icon: '👤', size: 'sm', row: 1, col: 1 },
    { id: 'resources', title: '资源管理', icon: '📚', size: 'xl', row: 1, col: 2 },
    { id: 'analytics', title: '数据分析', icon: '📊', size: 'lg', row: 2, col: 1 },
    { id: 'settings', title: '设置', icon: '⚙️', size: 'sm', row: 2, col: 2 },
  ];

  const getCardPosition = (row: number, col: number) => {
    return `row-start-${row} col-start-${col}`;
  };

  const profileStats = [
    { icon: <Briefcase className="w-6 h-6" />, label: '项目数', value: '12', trend: '+2', color: 'text-blue-500' },
    { icon: <Award className="w-6 h-6" />, label: '成就数', value: '8', trend: '+1', color: 'text-purple-500' },
    { icon: <Star className="w-6 h-6" />, label: '评分', value: '4.8', trend: '+0.2', color: 'text-yellow-500' },
    { icon: <Clock className="w-6 h-6" />, label: '活跃度', value: '98%', trend: '+5%', color: 'text-green-500' },
  ];

  const skills = [
    { name: 'Python', level: 90 },
    { name: 'TensorFlow', level: 85 },
    { name: 'PyTorch', level: 80 },
    { name: '深度学习', level: 88 },
    { name: '机器学习', level: 85 },
    { name: '计算机视觉', level: 82 },
  ];

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
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <ProfileHeader user={user} onLogout={logout} />
        </motion.div>

        {/* 仪表盘网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${activeTab === tab.id ? 'ring-2 ring-blue-500' : ''
                } ${getCardPosition(tab.row, tab.col)} ${tab.size === 'xl' ? 'lg:col-span-2' :
                  tab.size === 'lg' ? 'lg:col-span-2' :
                    tab.size === 'md' ? 'lg:col-span-2' :
                      'lg:col-span-1'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl">{tab.icon}</span>
                <h3 className="text-lg font-semibold">{tab.title}</h3>
              </div>
              <div className="mt-4">
                {tab.id === 'profile' && (
                  <div className="space-y-8">
                    {/* 基本信息 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <User className="w-5 h-5 text-blue-500" />
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">基本信息</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">邮箱</p>
                            <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">所在地</p>
                            <p className="font-medium text-gray-900 dark:text-white">北京市</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Building2 className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">公司</p>
                            <p className="font-medium text-gray-900 dark:text-white">AI科技有限公司</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">学历</p>
                            <p className="font-medium text-gray-900 dark:text-white">计算机科学 硕士</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 技能展示 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <Code2 className="w-5 h-5 text-blue-500" />
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">技能专长</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                              <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 最近活动 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <Target className="w-5 h-5 text-blue-500" />
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">最近活动</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-gray-900 dark:text-white">完成了项目"智能推荐系统"</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-900 dark:text-white">发布了新的技术文章</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span className="text-gray-900 dark:text-white">获得了"优秀贡献者"称号</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {tab.id === 'resources' && (
                  <div className="space-y-8">
                    {/* 资源列表 */}
                    <div>
                      <div className="flex items-center space-x-2 mb-6">
                        <FolderOpen className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">我的资源</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-4">
                            <FolderGit2 className="w-5 h-5 text-blue-500" />
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">我的项目</h4>
                          </div>
                          <ResourceList type="project" title="我的项目" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-4">
                            <Users className="w-5 h-5 text-purple-500" />
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">人才库</h4>
                          </div>
                          <ResourceList type="talent" title="人才库" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-4">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">投资机会</h4>
                          </div>
                          <ResourceList type="investment" title="投资机会" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-4">
                            <Bookmark className="w-5 h-5 text-yellow-500" />
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">收藏夹</h4>
                          </div>
                          <ResourceList type="favorite" title="收藏夹" />
                        </div>
                      </div>
                    </div>

                    {/* 活动记录 */}
                    <div>
                      <div className="flex items-center space-x-2 mb-6">
                        <History className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">活动记录</h3>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                        <ActivityFeed userId={String(user.id)} />
                      </div>
                    </div>
                  </div>
                )}
                {tab.id === 'analytics' && (
                  <div className="space-y-8">
                    {/* 数据概览 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">数据概览</h4>
                        </div>
                        <div className="flex space-x-2">
                          {['day', 'week', 'month', 'year'].map((range) => (
                            <button
                              key={range}
                              onClick={() => setTimeRange(range as any)}
                              className={`px-3 py-1 rounded-full text-sm ${timeRange === range
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                              {range === 'day' ? '今日' : range === 'week' ? '本周' : range === 'month' ? '本月' : '全年'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {profileStats.map((stat, index) => (
                          <div key={index} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                              <span className="text-xs text-green-500">{stat.trend}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 详细分析 */}
                    <AnalyticsDashboard timeRange={timeRange} onTimeRangeChange={setTimeRange} />
                  </div>
                )}
                {tab.id === 'settings' && <SettingsPanel userId={String(user.id)} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
