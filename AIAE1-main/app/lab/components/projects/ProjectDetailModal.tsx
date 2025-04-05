import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectDetailModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    lab: string;
    department: string;
    status: string;
    startDate: string;
    endDate: string;
    progress: number;
    team: string[];
    tags: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      />

      {/* 模态框内容 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
      >
        <div className="bg-white rounded-xl shadow-xl h-full flex flex-col">
          {/* 头部 */}
          <div className="relative h-64 md:h-96">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
              <p className="text-lg opacity-90">{project.lab}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 内容区域 */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">项目描述</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">项目信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">所属实验室：{project.lab}</p>
                    <p className="text-gray-600">所属学院：{project.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">开始时间：{project.startDate}</p>
                    <p className="text-gray-600">结束时间：{project.endDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">项目进度</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>完成度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">研究团队</h3>
                <div className="flex flex-wrap gap-2">
                  {project.team.map((member) => (
                    <span
                      key={member}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">项目标签</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
} 