import React from 'react';
import Image from 'next/image';

interface InvestorCardProps {
  id: number;
  name: string;
  type: string;
  focus: string[];
  investment: string;
  stage: string[];
  portfolio: string[];
  description: string;
  logo: string;
  location: string;
  established: string;
  teamSize: string;
  onClick: () => void;
}

const InvestorCard: React.FC<InvestorCardProps> = ({
  name,
  type,
  focus,
  investment,
  stage,
  portfolio,
  description,
  logo,
  location,
  established,
  teamSize,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
    >
      <div className="p-6">
        {/* 投资者logo */}
        <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              {type}
            </span>
          </div>
        </div>

        <p className="text-slate-300 mb-4 line-clamp-2">{description}</p>

        {/* 投资领域 */}
        <div className="mb-4">
          <h4 className="text-slate-300 font-medium mb-2">投资领域</h4>
          <div className="flex flex-wrap gap-2">
            {focus.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-slate-700/30 text-slate-300 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 投资阶段和规模 */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-slate-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {investment}
          </div>
          <div className="flex items-center text-slate-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {stage.join('、')}
          </div>
          <div className="flex items-center text-slate-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
          <div className="flex items-center text-slate-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {established}
          </div>
          <div className="flex items-center text-slate-300 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {teamSize}
          </div>
        </div>

        {/* 投资组合 */}
        <div>
          <h4 className="text-slate-300 font-medium mb-2">投资组合</h4>
          <div className="flex flex-wrap gap-2">
            {portfolio.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-slate-700/30 text-slate-300 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorCard; 