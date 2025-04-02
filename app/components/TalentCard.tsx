'use client';

import * as React from 'react';

interface TalentCardProps {
  name: string;
  title: string;
  techStack: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
    cloud: string[];
  };
  experience: string;
  education: string;
  interests: string[];
  availability: string;
  location: string;
  projects: string[];
  status: '已毕业' | '学生' | '已工作';
}

export default function TalentCard({
  name,
  title,
  techStack,
  experience,
  education,
  interests,
  availability,
  location,
  projects,
  status,
}: TalentCardProps) {
  // 只显示主要技能标签
  const mainSkills = [
    ...techStack.languages.slice(0, 2),
    ...techStack.frameworks.slice(0, 2),
    ...techStack.tools.slice(0, 1)
  ];

  // 状态样式映射
  const statusStyles = {
    '已毕业': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    '学生': 'bg-blue-50 text-blue-600 border-blue-200',
    '已工作': 'bg-violet-50 text-violet-600 border-violet-200'
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 h-full w-full flex flex-col">
      {/* 头部区域 */}
      <div className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{name}</h3>
              <p className="text-sm text-white/90">{title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4 flex-1 flex flex-col">
        {/* 当前身份和状态 */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${statusStyles[status]}`}>
            {status}
          </span>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium border bg-gray-50 text-gray-600 border-gray-200`}>
            {availability}
          </span>
        </div>

        {/* 教育背景 */}
        <div className="text-sm text-gray-600 flex items-center mb-4">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <span className="truncate">{education}</span>
        </div>

        {/* 所在地 */}
        <div className="text-sm text-gray-600 flex items-center mb-4">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>

        {/* 核心能力 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">核心能力</h4>
          <div className="flex flex-wrap gap-2">
            {mainSkills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm border border-gray-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 最近项目 */}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-500 mb-2">最近项目</h4>
          <ul className="space-y-2">
            {projects.slice(0, 2).map((project, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-blue-500 mr-2 text-base leading-none">•</span>
                <span className="line-clamp-2">{project}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 