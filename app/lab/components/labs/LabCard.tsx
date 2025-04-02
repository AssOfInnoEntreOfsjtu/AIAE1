'use client';

import React from 'react';
import { Lab } from '../../types';

interface LabCardProps extends Lab {
  onClick?: () => void;
}

export default function LabCard(props: LabCardProps) {
  const {
    name,
    description,
    coverImage,
    department,
    director,
    researchAreas,
    achievementCount,
    onClick
  } = props;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100" onClick={onClick}>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center">
          <img src={coverImage} alt={name} className="w-full h-full object-cover rounded-xl" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>部门: {department}</span>
            <span>•</span>
            <span>负责人: {director}</span>
            <span>•</span>
            <span>成果: {achievementCount}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {researchAreas.map((area, index) => (
            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 