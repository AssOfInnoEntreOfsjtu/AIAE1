'use client';

import { useState } from 'react';

interface InfoItem {
  id: string;
  title: string;
  date: string;
  type: 'activity' | 'lecture' | 'course' | 'policy';
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface InfoBarProps {
  activities: InfoItem[];
  lectures: InfoItem[];
  courses: InfoItem[];
  policies: InfoItem[];
}

export default function InfoBar({
  activities,
  lectures,
  courses,
  policies,
}: InfoBarProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'lecture' | 'course' | 'policy'>('activity');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'ongoing':
        return 'bg-green-100 text-green-600';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activity':
        return '🎉';
      case 'lecture':
        return '🎓';
      case 'course':
        return '📚';
      case 'policy':
        return '📋';
      default:
        return '📌';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'activity':
        return '活动信息';
      case 'lecture':
        return '讲座信息';
      case 'course':
        return '课程信息';
      case 'policy':
        return '政策信息';
      default:
        return '其他信息';
    }
  };

  const getItemsByType = () => {
    switch (activeTab) {
      case 'activity':
        return activities;
      case 'lecture':
        return lectures;
      case 'course':
        return courses;
      case 'policy':
        return policies;
      default:
        return [];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* 标签页 */}
      <div className="flex border-b border-gray-100">
        {(['activity', 'lecture', 'course', 'policy'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200
              ${activeTab === type
                ? 'text-green-600 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{getTypeIcon(type)}</span>
              <span>{getTypeLabel(type)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        <div className="space-y-4">
          {getItemsByType().map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-xl">{getTypeIcon(item.type)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status === 'upcoming' ? '即将开始' : item.status === 'ongoing' ? '进行中' : '已结束'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">📅 {item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 