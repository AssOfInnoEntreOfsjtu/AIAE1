'use client';

import { User } from '../../types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showRole?: boolean;
}

export default function UserAvatar({
  user,
  size = 'md',
  showRole = true
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-600',
    expert: 'bg-blue-100 text-blue-600',
    member: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="relative">
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
      />
      {showRole && (
        <span className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
          {user.role === 'admin' ? '管理员' : user.role === 'expert' ? '专家' : '成员'}
        </span>
      )}
    </div>
  );
} 