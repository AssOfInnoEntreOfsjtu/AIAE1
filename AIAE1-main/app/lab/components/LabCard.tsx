import React from 'react';
import Image from 'next/image';

interface LabCardProps {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  department: string;
  director: string;
  researchAreas: string[];
  achievementCount: number;
}

export default function LabCard({
  name,
  description,
  coverImage,
  department,
  director,
  researchAreas,
  achievementCount,
}: LabCardProps) {
  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      <div className="relative h-48">
        <Image
          src={coverImage}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{name}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-slate-400 mb-4">
          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{department}</span>
        </div>
        <div className="flex items-center text-sm text-slate-400 mb-4">
          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>主任：{director}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {researchAreas.slice(0, 3).map((area) => (
            <span
              key={area}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs hover:bg-blue-500/30 transition-colors duration-300"
            >
              {area}
            </span>
          ))}
          {researchAreas.length > 3 && (
            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs">
              +{researchAreas.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            研究成果：{achievementCount}
          </span>
          <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">查看详情 →</span>
        </div>
      </div>
    </div>
  );
} 