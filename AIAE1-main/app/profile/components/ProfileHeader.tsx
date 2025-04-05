'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
  onLogout: () => void;
}

export default function ProfileHeader({ user, onLogout }: ProfileHeaderProps) {
  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={user.avatar || '/default-avatar.png'}
          alt={user.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
      <p className="text-gray-500 text-sm mt-1">{user.email}</p>
      <button
        onClick={onLogout}
        className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
      >
        退出登录
      </button>
    </div>
  );
} 