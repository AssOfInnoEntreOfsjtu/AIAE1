'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20">
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">{user.title || '未设置职位'}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{user.followers || 0}</div>
          <div className="text-sm text-gray-600">关注者</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{user.following || 0}</div>
          <div className="text-sm text-gray-600">关注</div>
        </div>
      </div>
    </div>
  );
} 