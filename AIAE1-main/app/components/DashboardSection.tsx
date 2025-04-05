'use client';

import { useState } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardCard = ({ title, value, subtitle, icon, trend }: DashboardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        p-6 rounded-2xl transition-all duration-300
        backdrop-blur-md border border-white/20
        ${isHovered ? 'bg-white/40 scale-105' : 'bg-white/30'}
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      `}>
        <div className="flex justify-between items-start mb-4">
          <div className="text-gray-600">{title}</div>
          {icon && <div className="text-blue-500">{icon}</div>}
        </div>

        <div className="text-3xl font-bold text-gray-800 mb-2">
          {value}
        </div>

        {subtitle && (
          <div className="text-sm text-gray-500">{subtitle}</div>
        )}

        {trend && (
          <div className={`
            mt-4 text-sm flex items-center
            ${trend.isPositive ? 'text-green-500' : 'text-red-500'}
          `}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}

        {/* 装饰性光效 */}
        <div className={`
          absolute -inset-0.5 rounded-2xl
          bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20
          opacity-0 blur-2xl transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}
        `} />
      </div>
    </div>
  );
};

export default function DashboardSection() {
  const dashboardData = [
    {
      title: "总项目数",
      value: "2,451",
      subtitle: "活跃项目: 1,245",
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: "本月新增人才",
      value: "847",
      subtitle: "较上月增长 23%",
      trend: { value: 23, isPositive: true }
    },
    {
      title: "投资总额",
      value: "￥8.5M",
      subtitle: "本季度累计",
      trend: { value: 5.2, isPositive: true }
    },
    {
      title: "成功对接",
      value: "384",
      subtitle: "本月完成对接",
      trend: { value: 8.4, isPositive: true }
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">数据概览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            trend={item.trend}
          />
        ))}
      </div>
    </div>
  );
} 