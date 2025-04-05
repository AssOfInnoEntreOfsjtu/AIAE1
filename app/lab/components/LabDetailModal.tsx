import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LabInfo from './LabInfo';

interface LabDetailModalProps {
  lab: {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    department: string;
    director: string;
    researchAreas: string[];
    achievementCount: number;
    facilities: {
      name: string;
      description: string;
      image: string;
    }[];
    contact: {
      address: string;
      phone: string;
      email: string;
      website: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function LabDetailModal({ lab, isOpen, onClose }: LabDetailModalProps) {
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
              src={lab.coverImage}
              alt={lab.name}
              fill
              className="object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{lab.name}</h2>
              <p className="text-lg opacity-90">{lab.department}</p>
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
            <LabInfo
              description={lab.description}
              facilities={lab.facilities}
              researchAreas={lab.researchAreas.map(area => ({
                name: area,
                description: `专注于${area}领域的研究`,
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              }))}
              contact={lab.contact}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
} 