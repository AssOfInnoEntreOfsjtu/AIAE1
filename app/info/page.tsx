'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfoCard from './components/InfoCard';
import InfoFilter from './components/InfoFilter';
import PolicyDetail from './components/PolicyDetail';

interface InfoItem {
  id: string;
  title: string;
  date: string;
  type: 'activity' | 'lecture' | 'course' | 'policy';
  subType?: 'support' | 'subsidy' | 'competition' | 'salon' | 'tech' | 'startup' | 'basic' | 'advanced' | 'experience' | 'practical';
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  location?: string;
  capacity?: number;
  registered?: number;
  price?: number;
  tags?: string[];
  image: string;
  source?: string;
  link?: string;
}

interface InfoData {
  activities: InfoItem[];
  lectures: InfoItem[];
  courses: InfoItem[];
  policies: InfoItem[];
}

// 模拟数据
const mockData: InfoData = {
  activities: [
    {
      id: '1',
      title: '2024年AI创新大赛',
      date: '2024-04-15',
      type: 'activity',
      subType: 'competition',
      description: '年度AI创新大赛，展示最新AI技术和应用，包括机器学习、深度学习、计算机视觉等领域的前沿进展。',
      status: 'upcoming',
      location: '北京国际会议中心',
      capacity: 200,
      registered: 150,
      price: 0,
      tags: ['AI', '创新', '竞赛'],
      image: '/images/activities/ai-competition.jpg',
    },
    {
      id: '2',
      title: '创业沙龙',
      date: '2024-03-30',
      type: 'activity' as const,
      subType: 'salon' as const,
      description: '创业者交流分享会，探讨AI创业机会，分享创业经验，对接投资资源。',
      status: 'ongoing' as const,
      location: '线上直播',
      capacity: 500,
      registered: 300,
      price: 0,
      tags: ['创业', 'AI', '投资'],
      image: '/images/activities/startup-salon.jpg',
    },
  ],
  lectures: [
    {
      id: '3',
      title: 'AI技术前沿讲座',
      date: '2024-04-01',
      type: 'lecture' as const,
      subType: 'tech' as const,
      description: '邀请行业专家分享AI最新发展趋势，包括大模型、多模态AI、AI安全等热点话题。',
      status: 'upcoming' as const,
      location: '线上直播',
      capacity: 1000,
      registered: 800,
      price: 0,
      tags: ['AI', '技术', '前沿'],
      image: '/images/lectures/ai-frontier.jpg',
    },
    {
      id: '4',
      title: '创业经验分享',
      date: '2024-03-25',
      type: 'lecture' as const,
      subType: 'experience' as const,
      description: '成功创业者分享创业历程和经验，包括团队组建、产品开发、市场推广等关键环节。',
      status: 'completed' as const,
      location: '深圳科技园',
      capacity: 100,
      registered: 100,
      price: 0,
      tags: ['创业', '经验', '分享'],
      image: '/images/lectures/startup-experience.jpg',
    },
  ],
  courses: [
    {
      id: '5',
      title: 'AI基础课程',
      date: '2024-04-10',
      type: 'course' as const,
      subType: 'basic' as const,
      description: '从零开始学习AI基础知识，包括机器学习、深度学习、神经网络等核心概念。',
      status: 'upcoming' as const,
      location: '线上课程',
      capacity: 500,
      registered: 200,
      price: 299,
      tags: ['AI', '课程', '入门'],
      image: '/images/courses/ai-basics.jpg',
    },
    {
      id: '6',
      title: '创业实战课程',
      date: '2024-03-20',
      type: 'course' as const,
      subType: 'practical' as const,
      description: '创业必备知识和技能培训，包括商业计划书撰写、融资技巧、团队管理等。',
      status: 'ongoing' as const,
      location: '线上课程',
      capacity: 300,
      registered: 250,
      price: 499,
      tags: ['创业', '课程', '实战'],
      image: '/images/courses/startup-practice.jpg',
    },
  ],
  policies: [
    {
      id: 'p1',
      title: '关于促进人工智能产业发展的若干措施',
      date: '2024-03-15',
      type: 'policy',
      subType: 'support',
      description: '为促进人工智能产业发展，推动技术创新和产业升级，特制定本政策。政策旨在通过税收优惠、人才补贴、研发支持等措施，为AI企业提供全方位支持。',
      status: 'upcoming',
      tags: ['AI', '政策', '扶持'],
      image: '/images/policies/ai-support.jpg',
      source: '科技部',
      link: 'https://example.com/ai-support'
    },
    {
      id: 'p2',
      title: '关于支持人工智能企业研发创新的指导意见',
      date: '2024-03-10',
      type: 'policy',
      subType: 'support',
      description: '为支持人工智能企业研发创新，推动核心技术突破，特制定本指导意见。重点支持基础研究、应用研发、成果转化等环节。',
      status: 'ongoing',
      tags: ['AI', '研发', '创新'],
      image: '/images/policies/ai-innovation.jpg',
      source: '发改委',
      link: 'https://example.com/ai-innovation'
    },
    {
      id: 'p3',
      title: '关于促进人工智能人才发展的实施意见',
      date: '2024-03-05',
      type: 'policy',
      subType: 'support',
      description: '为加强人工智能人才队伍建设，特制定本实施意见。通过人才引进、培养、激励等措施，打造高水平AI人才队伍。',
      status: 'upcoming',
      tags: ['AI', '人才', '发展'],
      image: '/images/policies/ai-talent.jpg',
      source: '工信部',
      link: 'https://example.com/ai-talent'
    },
    {
      id: 'p4',
      title: '关于支持青年创业的若干措施',
      date: '2024-03-20',
      type: 'policy',
      subType: 'subsidy',
      description: '为支持青年创业，激发创新创业活力，特制定本政策。通过创业补贴、场地补贴、社保补贴等措施，降低创业成本。',
      status: 'upcoming',
      tags: ['创业', '补贴', '青年'],
      image: '/images/policies/startup-subsidy.jpg',
      source: '人社部',
      link: 'https://example.com/startup-subsidy'
    },
    {
      id: 'p5',
      title: '关于促进科技型中小企业发展的实施意见',
      date: '2024-03-12',
      type: 'policy',
      subType: 'subsidy',
      description: '为促进科技型中小企业发展，特制定本实施意见。通过融资支持、研发补贴、人才支持等措施，助力科技型中小企业成长。',
      status: 'ongoing',
      tags: ['科技', '企业', '发展'],
      image: '/images/policies/tech-enterprise.jpg',
      source: '科技部',
      link: 'https://example.com/tech-enterprise'
    }
  ]
};

export default function InfoPage() {
  const [filteredData, setFilteredData] = useState<InfoData>(mockData);
  const [selectedItem, setSelectedItem] = useState<InfoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredItems, setRegisteredItems] = useState<Set<string>>(new Set());

  const handleFilterChange = (filters: {
    type: string[];
    status: string[];
    dateRange: string;
    subType: string[];
  }) => {
    const { type, status, dateRange, subType } = filters;

    // 根据筛选条件过滤数据
    const newData: InfoData = {
      activities: mockData.activities.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
      lectures: mockData.lectures.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
      courses: mockData.courses.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
      policies: mockData.policies.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
    };

    setFilteredData(newData);
  };

  const handleItemClick = (item: InfoItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleRegister = (item: InfoItem) => {
    // 检查是否已报名
    if (registeredItems.has(item.id)) {
      return;
    }

    // 检查是否还有名额
    if (item.registered && item.capacity && item.registered >= item.capacity) {
      return;
    }

    // 更新报名状态
    setRegisteredItems(prev => {
      const newSet = new Set(prev);
      newSet.add(item.id);
      return newSet;
    });

    // 更新数据中的报名人数
    setFilteredData(prev => {
      const typeKey = `${item.type}s` as keyof InfoData;
      return {
        ...prev,
        [typeKey]: prev[typeKey].map(i =>
          i.id === item.id && i.registered !== undefined
            ? { ...i, registered: i.registered + 1 }
            : i
        ),
      };
    });

    // 显示成功提示
    alert('报名成功！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-20 right-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            信息中心
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            发现最新活动、讲座、课程和政策信息，助力创新创业
          </p>
        </motion.div>

        {/* 筛选器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <InfoFilter onFilterChange={handleFilterChange} />
        </motion.div>

        {/* 信息展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ...filteredData.activities,
            ...filteredData.lectures,
            ...filteredData.courses,
            ...filteredData.policies,
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300 hover:shadow-xl"
            >
              <InfoCard
                {...item}
                onClick={() => handleItemClick(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 详情模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-8">
                {selectedItem.type === 'policy' && selectedItem.subType && (selectedItem.subType === 'support' || selectedItem.subType === 'subsidy') ? (
                  <PolicyDetail
                    title={selectedItem.title}
                    date={selectedItem.date}
                    source={selectedItem.source || '政策解读'}
                    type={selectedItem.subType as 'support' | 'subsidy'}
                    description={selectedItem.description}
                    link={selectedItem.link || '#'}
                    onClose={() => setIsModalOpen(false)}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">{selectedItem.title}</h2>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        ✕
                      </motion.button>
                    </div>
                    <div className="space-y-6">
                      <p className="text-gray-600 text-lg leading-relaxed">{selectedItem.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags?.map((tag: string, index: number) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500">📅</span>
                          <span className="font-medium">日期：</span>
                          {selectedItem.date}
                        </div>
                        {selectedItem.location && (
                          <div className="flex items-center gap-2">
                            <span className="text-purple-500">📍</span>
                            <span className="font-medium">地点：</span>
                            {selectedItem.location}
                          </div>
                        )}
                        {selectedItem.capacity && (
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">👥</span>
                            <span className="font-medium">名额：</span>
                            {selectedItem.registered}/{selectedItem.capacity}
                          </div>
                        )}
                        {selectedItem.price !== undefined && (
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">💰</span>
                            <span className="font-medium">价格：</span>
                            {selectedItem.price === 0 ? '免费' : `¥${selectedItem.price}`}
                          </div>
                        )}
                      </div>
                      {selectedItem.status === 'upcoming' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-4 border-t border-gray-100"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleRegister(selectedItem);
                              setIsModalOpen(false);
                            }}
                            disabled={Boolean(registeredItems.has(selectedItem.id)) || Boolean(selectedItem.registered && selectedItem.capacity && selectedItem.registered >= selectedItem.capacity)}
                            className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300
                              ${registeredItems.has(selectedItem.id)
                                ? 'bg-green-500 cursor-not-allowed'
                                : selectedItem.registered && selectedItem.capacity && selectedItem.registered >= selectedItem.capacity
                                  ? 'bg-gray-500 cursor-not-allowed'
                                  : 'bg-blue-500 hover:bg-blue-600'
                              }`}
                          >
                            {registeredItems.has(selectedItem.id)
                              ? '已报名'
                              : selectedItem.registered && selectedItem.capacity && selectedItem.registered >= selectedItem.capacity
                                ? '名额已满'
                                : '立即报名'}
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}