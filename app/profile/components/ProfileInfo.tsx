'use client';

import React, { useState, useMemo } from 'react';
import type { JSX } from 'react';
import { User } from '@/types/user';
import EditProfileModal from './EditProfileModal';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

// 子组件：头像区域
const AvatarSection = ({ user }: { user: User }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="relative w-28 h-28"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"></div>
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
        <Image
          src={user.avatar || '/default-avatar.png'}
          alt={user.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </motion.div>
  );
};

// 子组件：信息卡片
const InfoCard = ({
  title,
  icon,
  children
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className="card p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <div className="text-blue-500">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

// 子组件：信息字段
const InfoField = ({
  label,
  value,
  isLink = false
}: {
  label: string;
  value: string | number;
  isLink?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
      {isLink ? (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-lg text-gray-900 dark:text-white">{value}</p>
      )}
    </div>
  );
};

// 主组件
export default function ProfileInfo({ user }: { user: User }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { theme } = useTheme();

  // 使用 useMemo 优化日期格式化
  const formattedDates = useMemo(() => ({
    createdAt: new Date(user.createdAt).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    updatedAt: new Date(user.updatedAt).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }), [user.createdAt, user.updatedAt]);

  return (
    <div className="space-y-8">
      {/* 头部信息 */}
      <motion.div
        className="flex justify-between items-start"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-6">
          <AvatarSection user={user} />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{user.title || '未设置职位'}</p>
          </div>
        </div>
        <motion.button
          onClick={() => setIsEditModalOpen(true)}
          className="btn btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>编辑资料</span>
        </motion.button>
      </motion.div>

      {/* 基本信息卡片 */}
      <InfoCard
        title="基本信息"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="用户名" value={user.name} />
          <InfoField label="邮箱" value={user.email} />
          <InfoField label="个人简介" value={user.bio || '暂无简介'} />
          <InfoField label="所在地" value={user.location || '未设置'} />
          <InfoField
            label="个人网站"
            value={user.website || '未设置'}
            isLink={!!user.website}
          />
        </div>
      </InfoCard>

      {/* 账号信息卡片 */}
      <InfoCard
        title="账号信息"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="注册时间" value={formattedDates.createdAt} />
          <InfoField label="最后更新" value={formattedDates.updatedAt} />
          <InfoField label="关注者" value={user.followers || 0} />
          <InfoField label="关注" value={user.following || 0} />
        </div>
      </InfoCard>

      <AnimatePresence>
        {isEditModalOpen && (
          <EditProfileModal
            user={user}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 