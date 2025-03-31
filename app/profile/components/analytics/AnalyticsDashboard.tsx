'use client';

import React, { useState } from 'react';
import AnalyticsCard from './AnalyticsCard';

interface AnalyticsDashboardProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
  onTimeRangeChange: (range: 'day' | 'week' | 'month' | 'year') => void;
}

export default function AnalyticsDashboard({ timeRange, onTimeRangeChange }: AnalyticsDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState('views');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">数据分析</h2>
        <select
          className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value as 'day' | 'week' | 'month' | 'year')}
        >
          <option value="day">今日</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
          <option value="year">全年</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="总浏览量"
          value="1,234"
          trend={[100, 120, 110, 130]}
          icon="👁️"
        />
        <AnalyticsCard
          title="互动次数"
          value="456"
          trend={[80, 85, 90, 88]}
          icon="🤝"
        />
        <AnalyticsCard
          title="资源数量"
          value="89"
          trend={[70, 75, 73, 78]}
          icon="📚"
        />
        <AnalyticsCard
          title="活跃用户"
          value="234"
          trend={[90, 88, 85, 83]}
          icon="👥"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">详细数据</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span className="text-gray-600">数据趋势</span>
            </div>
            <div className="flex space-x-2">
              {['views', 'interactions', 'resources', 'users'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 rounded-md text-sm ${selectedMetric === metric
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {metric === 'views' && '浏览量'}
                  {metric === 'interactions' && '互动'}
                  {metric === 'resources' && '资源'}
                  {metric === 'users' && '用户'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">图表区域</span>
          </div>
        </div>
      </div>
    </div>
  );
} 