'use client';

import { User } from '../types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showRole?: boolean;
}

export default function UserAvatar({ user, size = 'md', showRole = true }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-600',
    expert: 'bg-blue-100 text-blue-600',
    member: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
        {showRole && (
          <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
            {user.role === 'admin' ? '管理员' : user.role === 'expert' ? '专家' : '成员'}
          </span>
        )}
      </div>
      <div>
        <div className="font-medium text-gray-900">{user.name}</div>
        {user.title && (
          <div className="text-sm text-gray-500">{user.title}</div>
        )}
        {user.organization && (
          <div className="text-sm text-gray-500">{user.organization}</div>
        )}
      </div>
    </div>
  );
} 