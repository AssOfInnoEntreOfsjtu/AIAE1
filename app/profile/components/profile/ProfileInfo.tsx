'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import EditProfileModal from './EditProfileModal';

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="p-6 border-t">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">个人信息</h2>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          编辑资料
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">个人简介</h3>
          <p className="mt-1 text-gray-900">{user.bio || '这个人很懒，什么都没写~'}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">所在地</h3>
          <p className="mt-1 text-gray-900">{user.location || '未设置'}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">个人网站</h3>
          <p className="mt-1 text-gray-900">
            {user.website ? (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                {user.website}
              </a>
            ) : (
              '未设置'
            )}
          </p>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
} 