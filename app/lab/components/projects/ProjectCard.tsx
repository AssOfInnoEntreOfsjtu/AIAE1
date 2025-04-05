import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  lab: string;
  department: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  team: string[];
  tags: string[];
}

export default function ProjectCard({
  title,
  description,
  coverImage,
  lab,
  department,
  status,
  startDate,
  endDate,
  progress,
  team,
  tags,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      <div className="relative h-48">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === '进行中' ? 'bg-green-500/20 text-green-400' :
            status === '已完成' ? 'bg-blue-500/20 text-blue-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {status}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-slate-400 mb-4">
          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{lab}</span>
        </div>
        <div className="flex items-center text-sm text-slate-400 mb-4">
          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{startDate} - {endDate}</span>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
            <span>项目进度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs hover:bg-blue-500/30 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs">
              +{tags.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            研究团队：{team.length}人
          </span>
          <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">查看详情 →</span>
        </div>
      </div>
    </div>
  );
} 