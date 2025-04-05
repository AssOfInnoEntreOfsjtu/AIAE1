import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface InfoCardProps {
  id: string;
  title: string;
  date: string;
  type: 'activity' | 'lecture' | 'course' | 'policy';
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
  location?: string;
  capacity?: number;
  registered?: number;
  price?: number;
  tags?: string[];
  onClick?: () => void;
}

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
};

const typeIcons = {
  activity: '🎯',
  lecture: '📚',
  course: '🎓',
  policy: '📋',
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  date,
  type,
  description,
  status,
  image,
  location,
  capacity,
  registered,
  price,
  tags,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {/* 图片区域 */}
      <div className="relative h-48 w-full">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-4xl">{typeIcons[type]}</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {status === 'upcoming' ? '即将开始' : status === 'ongoing' ? '进行中' : '已结束'}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* 标签 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 详细信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {location && (
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>{location}</span>
              </div>
            )}
            {capacity && (
              <div className="flex items-center gap-1">
                <span>👥</span>
                <span>{registered}/{capacity}</span>
              </div>
            )}
          </div>
          {price !== undefined && (
            <div className="text-blue-600 font-medium">
              {price === 0 ? '免费' : `¥${price}`}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard; 