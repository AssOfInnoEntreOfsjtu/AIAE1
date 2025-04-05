import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoFilterProps {
  onFilterChange: (filters: {
    type: string[];
    status: string[];
    dateRange: string;
    subType: string[];
  }) => void;
}

const InfoFilter: React.FC<InfoFilterProps> = ({ onFilterChange }) => {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('all');
  const [selectedSubTypes, setSelectedSubTypes] = useState<Record<string, string[]>>({});

  // 一级筛选选项
  const mainTypes = [
    { id: 'activity', label: '活动', icon: '🎯' },
    { id: 'lecture', label: '讲座', icon: '📚' },
    { id: 'course', label: '课程', icon: '🎓' },
    { id: 'policy', label: '政策', icon: '📋' },
  ];

  // 二级筛选选项
  const subTypes = {
    activity: [
      { id: 'competition', label: '竞赛' },
      { id: 'salon', label: '沙龙' },
      { id: 'hackathon', label: '黑客马拉松' },
      { id: 'exhibition', label: '展览' },
    ],
    lecture: [
      { id: 'tech', label: '技术讲座' },
      { id: 'business', label: '商业讲座' },
      { id: 'experience', label: '经验分享' },
      { id: 'workshop', label: '工作坊' },
    ],
    course: [
      { id: 'basic', label: '基础课程' },
      { id: 'advanced', label: '进阶课程' },
      { id: 'practical', label: '实战课程' },
      { id: 'certification', label: '认证课程' },
    ],
    policy: [
      { id: 'support', label: '扶持政策' },
      { id: 'subsidy', label: '补贴政策' },
      { id: 'talent', label: '人才政策' },
      { id: 'innovation', label: '创新政策' },
    ],
  };

  const statuses = [
    { id: 'upcoming', label: '即将开始', color: 'blue' },
    { id: 'ongoing', label: '进行中', color: 'green' },
    { id: 'completed', label: '已结束', color: 'gray' },
  ];

  const dateRanges = [
    { id: 'all', label: '全部时间' },
    { id: 'week', label: '本周' },
    { id: 'month', label: '本月' },
    { id: 'quarter', label: '本季度' },
  ];

  const handleMainTypeClick = (typeId: string) => {
    setActiveType(activeType === typeId ? null : typeId);
    // 清除其他类型的二级选项
    const newSelectedSubTypes = { ...selectedSubTypes };
    Object.keys(newSelectedSubTypes).forEach(key => {
      if (key !== typeId) {
        delete newSelectedSubTypes[key];
      }
    });
    setSelectedSubTypes(newSelectedSubTypes);
    onFilterChange({
      type: activeType === typeId ? [] : [typeId],
      status: activeStatus,
      dateRange,
      subType: activeType === typeId ? [] : (selectedSubTypes[typeId] || []),
    });
  };

  const handleSubTypeClick = (typeId: string, subTypeId: string) => {
    const currentSubTypes = selectedSubTypes[typeId] || [];
    const newSubTypes = currentSubTypes.includes(subTypeId)
      ? currentSubTypes.filter(id => id !== subTypeId)
      : [...currentSubTypes, subTypeId];

    setSelectedSubTypes(prev => ({
      ...prev,
      [typeId]: newSubTypes,
    }));

    onFilterChange({
      type: [typeId],
      status: activeStatus,
      dateRange,
      subType: newSubTypes,
    });
  };

  const handleStatusClick = (statusId: string) => {
    const newStatuses = activeStatus.includes(statusId)
      ? activeStatus.filter(s => s !== statusId)
      : [...activeStatus, statusId];
    setActiveStatus(newStatuses);
    onFilterChange({
      type: activeType ? [activeType] : [],
      status: newStatuses,
      dateRange,
      subType: activeType ? (selectedSubTypes[activeType] || []) : [],
    });
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    onFilterChange({
      type: activeType ? [activeType] : [],
      status: activeStatus,
      dateRange: range,
      subType: activeType ? (selectedSubTypes[activeType] || []) : [],
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
      {/* 一级筛选 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-blue-500">📋</span>
          信息类型
        </h3>
        <div className="flex flex-wrap gap-4">
          {mainTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMainTypeClick(type.id)}
              className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300
                ${activeType === type.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-blue-200'
                }`}
            >
              <span className="text-xl">{type.icon}</span>
              <span className="font-medium">{type.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 二级筛选 */}
      <AnimatePresence>
        {activeType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-indigo-500">🔍</span>
                具体类型
              </h3>
              <div className="flex flex-wrap gap-4">
                {subTypes[activeType as keyof typeof subTypes].map((subType) => (
                  <motion.button
                    key={subType.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubTypeClick(activeType, subType.id)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300
                      ${selectedSubTypes[activeType]?.includes(subType.id)
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-indigo-200'
                      }`}
                  >
                    <span className="font-medium">{subType.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 状态筛选 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-green-500">⚡</span>
          状态
        </h3>
        <div className="flex flex-wrap gap-4">
          {statuses.map((status) => (
            <motion.button
              key={status.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusClick(status.id)}
              className={`px-6 py-3 rounded-xl transition-all duration-300
                ${activeStatus.includes(status.id)
                  ? `bg-gradient-to-r from-${status.color}-500 to-${status.color}-600 text-white shadow-lg shadow-${status.color}-200`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                }`}
            >
              <span className="font-medium">{status.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 时间范围筛选 */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-purple-500">⏰</span>
          时间范围
        </h3>
        <div className="flex flex-wrap gap-4">
          {dateRanges.map((range) => (
            <motion.button
              key={range.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDateRangeChange(range.id)}
              className={`px-6 py-3 rounded-xl transition-all duration-300
                ${dateRange === range.id
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-purple-200'
                }`}
            >
              <span className="font-medium">{range.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoFilter; 