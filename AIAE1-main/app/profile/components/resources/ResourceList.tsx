'use client';

import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';

interface Resource {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  updatedAt: string;
}

interface ResourceListProps {
  type: 'project' | 'talent' | 'investment' | 'favorite';
  title: string;
}

export default function ResourceList({ type, title }: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources/${type}`);
        if (!response.ok) {
          throw new Error('获取资源失败');
        }
        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取资源失败');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [type]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {resources.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无内容</p>
        ) : (
          resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={() => {/* 处理编辑 */ }}
              onDelete={() => {/* 处理删除 */ }}
            />
          ))
        )}
      </div>
    </div>
  );
} 