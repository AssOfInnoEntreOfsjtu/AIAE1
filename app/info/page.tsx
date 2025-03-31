'use client';

import InfoBar from '../components/InfoBar';

export default function InfoPage() {
  // 模拟数据
  const infoData = {
    activities: [
      {
        id: '1',
        title: '2024年AI创新大赛',
        date: '2024-04-15',
        type: 'activity' as const,
        description: '年度AI创新大赛，展示最新AI技术和应用',
        status: 'upcoming' as const,
      },
      {
        id: '2',
        title: '创业沙龙',
        date: '2024-03-30',
        type: 'activity' as const,
        description: '创业者交流分享会，探讨AI创业机会',
        status: 'ongoing' as const,
      },
    ],
    lectures: [
      {
        id: '3',
        title: 'AI技术前沿讲座',
        date: '2024-04-01',
        type: 'lecture' as const,
        description: '邀请行业专家分享AI最新发展趋势',
        status: 'upcoming' as const,
      },
      {
        id: '4',
        title: '创业经验分享',
        date: '2024-03-25',
        type: 'lecture' as const,
        description: '成功创业者分享创业历程和经验',
        status: 'completed' as const,
      },
    ],
    courses: [
      {
        id: '5',
        title: 'AI基础课程',
        date: '2024-04-10',
        type: 'course' as const,
        description: '从零开始学习AI基础知识',
        status: 'upcoming' as const,
      },
      {
        id: '6',
        title: '创业实战课程',
        date: '2024-03-20',
        type: 'course' as const,
        description: '创业必备知识和技能培训',
        status: 'ongoing' as const,
      },
    ],
    policies: [
      {
        id: '7',
        title: 'AI产业扶持政策',
        date: '2024-03-28',
        type: 'policy' as const,
        description: '最新AI产业扶持政策解读',
        status: 'ongoing' as const,
      },
      {
        id: '8',
        title: '创业补贴政策',
        date: '2024-03-15',
        type: 'policy' as const,
        description: '创业补贴申请指南',
        status: 'completed' as const,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">信息中心</h1>
          <p className="text-xl text-gray-600 mt-2">最新活动、讲座、课程和政策信息</p>
        </div>

        {/* 信息栏 */}
        <InfoBar {...infoData} />
      </div>
    </div>
  );
} 