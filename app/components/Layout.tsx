'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  FolderOpenIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
  UserCircleIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: '首页', path: '/', icon: HomeIcon },
  { name: '项目库', path: '/projects', icon: FolderOpenIcon },
  { name: '人才库', path: '/talents', icon: UserGroupIcon },
  { name: '投资者库', path: '/investors', icon: BuildingOfficeIcon },
  { name: '信息栏', path: '/info', icon: NewspaperIcon },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* 左侧导航栏 - 固定定位 */}
      <nav className="fixed w-64 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex flex-col shadow-2xl backdrop-blur-sm bg-opacity-95">
        {/* AIAE Logo - 垂直排列 */}
        <Link href="/" className="block mb-12 group relative">
          <div className="absolute -inset-2 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="text-5xl font-bold text-center transform transition-all duration-300 group-hover:scale-105 relative">
            <div className="leading-tight">
              <span className="block text-blue-400 drop-shadow-lg group-hover:text-blue-300 transition-colors duration-300">A</span>
              <span className="block text-blue-300 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-300">I</span>
              <span className="block text-blue-200 drop-shadow-lg group-hover:text-blue-100 transition-colors duration-300">A</span>
              <span className="block text-blue-100 drop-shadow-lg group-hover:text-blue-50 transition-colors duration-300">E</span>
            </div>
          </div>
          <SparklesIcon className="absolute -right-2 -top-2 w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12" />
        </Link>

        {/* 其他导航项 - 竖向排列 */}
        <div className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center space-x-4 w-full px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${isActive
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
              >
                {/* 激活状态指示器 */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-full animate-pulse"></div>
                )}

                <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-110 group-hover:text-blue-400'
                  }`} />
                <span className="font-medium relative z-10">{item.name}</span>

                {/* 悬停时的背景效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>

                {/* 悬停时的光晕效果 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 animate-shimmer"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 底部用户信息 */}
        <div className="mt-auto pt-6 border-t border-gray-700/50">
          <Link
            href="/profile"
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${pathname === '/profile'
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
          >
            {/* 激活状态指示器 */}
            {pathname === '/profile' && (
              <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-full animate-pulse"></div>
            )}

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
              <span className="text-sm font-medium">U</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium relative z-10">我的</p>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">点击查看个人中心</p>
            </div>
            <UserCircleIcon className={`w-5 h-5 transition-all duration-300 ${pathname === '/profile' ? 'scale-110 text-white' : 'group-hover:scale-110 group-hover:text-blue-400'
              }`} />

            {/* 悬停时的背景效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>

            {/* 悬停时的光晕效果 */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 animate-shimmer"></div>
            </div>
          </Link>
        </div>
      </nav>

      {/* 右侧内容区 - 添加左边距以补偿固定导航栏的宽度 */}
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        {children}
      </main>
    </div>
  );
} 