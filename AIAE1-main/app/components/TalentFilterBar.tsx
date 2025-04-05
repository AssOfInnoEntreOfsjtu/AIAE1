'use client';

import { useState } from 'react';

interface FilterOption {
  title: string;
  options: string[];
}

const filters: FilterOption[] = [
  {
    title: '专业领域',
    options: ['算法研发', '工程开发', '产品设计', '运营管理', '市场营销'],
  },
  {
    title: '经验年限',
    options: ['应届生', '1-3年', '3-5年', '5-10年', '10年以上'],
  },
  {
    title: '学历要求',
    options: ['本科', '硕士', '博士', '博士后'],
  },
  {
    title: '技能标签',
    options: ['Python', '机器学习', '深度学习', '计算机视觉', '自然语言处理'],
  },
  {
    title: '求职意向',
    options: ['全职', '兼职', '实习', '顾问'],
  },
];

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const toggleFilter = (title: string) => {
    setActiveFilter(activeFilter === title ? null : title);
  };

  const toggleOption = (title: string, option: string) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[title] || [];
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter(opt => opt !== option)
        : [...currentOptions, option];
      return { ...prev, [title]: newOptions };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-[140px] flex flex-col">
      {/* 主按钮区域 */}
      <div className="flex justify-center items-center gap-3 mb-4">
        {filters.map((filter) => (
          <div key={filter.title} className="relative">
            <button
              onClick={() => toggleFilter(filter.title)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-base
                ${activeFilter === filter.title
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              <span className="font-medium">{filter.title}</span>
              {selectedOptions[filter.title]?.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                  ${activeFilter === filter.title
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {selectedOptions[filter.title].length}
                </span>
              )}
            </button>

            {/* 下拉菜单 */}
            {activeFilter === filter.title && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl z-10 border border-gray-100">
                <div className="p-3">
                  {filter.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-4 p-4 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-150"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions[filter.title]?.includes(option) || false}
                        onChange={() => toggleOption(filter.title, option)}
                        className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 已选择的选项展示 */}
      {Object.keys(selectedOptions).length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(selectedOptions).map(([title, options]) =>
              options.map((option) => (
                <div
                  key={`${title}-${option}`}
                  className="group flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span>{option}</span>
                  <button
                    onClick={() => toggleOption(title, option)}
                    className="ml-2 text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
} 