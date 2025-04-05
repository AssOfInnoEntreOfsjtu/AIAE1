import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  {
    id: 'type',
    label: '投资类型',
    options: ['风险投资', '产业基金', '天使投资', '私募基金'],
  },
  {
    id: 'stage',
    label: '投资阶段',
    options: ['种子轮', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上'],
  },
  {
    id: 'focus',
    label: '投资领域',
    options: ['AI技术', '硬科技', '医疗科技', '人工智能', '大数据', '云计算', 'AI应用', '教育科技', '金融科技'],
  },
  {
    id: 'location',
    label: '所在地',
    options: ['北京', '上海', '深圳', '杭州', '广州', '成都'],
  },
];

const InvestorFilterBar: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const toggleFilter = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
  };

  const toggleOption = (filterId: string, option: string) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[filterId] || [];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter(opt => opt !== option)
        : [...currentOptions, option];

      return {
        ...prev,
        [filterId]: newOptions,
      };
    });
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30">
      <div className="flex flex-wrap gap-4">
        {filterOptions.map((filter) => (
          <div key={filter.id} className="relative">
            <button
              onClick={() => toggleFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${activeFilter === filter.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                }`}
            >
              {filter.label}
              <span className={`transform transition-transform duration-200 ${activeFilter === filter.id ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {activeFilter === filter.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-slate-700/30 z-50"
              >
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleOption(filter.id, option)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200
                          ${selectedOptions[filter.id]?.includes(option)
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* 已选择的筛选条件展示 */}
      {Object.keys(selectedOptions).length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700/30">
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedOptions).map(([filterId, options]) =>
              options.map((option) => (
                <div
                  key={`${filterId}-${option}`}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  <span>{option}</span>
                  <button
                    onClick={() => toggleOption(filterId, option)}
                    className="hover:text-blue-300 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorFilterBar; 