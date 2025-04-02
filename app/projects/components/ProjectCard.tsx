import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  industry: string;
  stage: string;
  type: string;
  needs: string[];
  teamStatus: string;
  teamSize: string;
  location: string;
  tags: string[];
  progress: number;
  team: string[];
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  industry,
  stage,
  type,
  needs,
  teamStatus,
  teamSize,
  location,
  tags,
  progress,
  team,
  image,
}) => {
  return (
    <div className="p-6">
      {/* 项目图片 */}
      <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {industry}
          </span>
        </div>
      </div>

      <p className="text-slate-300 mb-4 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-slate-700/30 text-slate-300 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-slate-300 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {teamSize} · {teamStatus}
        </div>
        <div className="flex items-center text-slate-300 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">项目进度</span>
          <span className="text-blue-400">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 