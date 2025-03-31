'use client';

interface Resource {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  updatedAt: string;
}

interface ResourceCardProps {
  resource: Resource;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  const statusLabels = {
    active: '进行中',
    completed: '已完成',
    archived: '已归档',
  };

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900">{resource.title}</h4>
          <p className="mt-1 text-sm text-gray-600">{resource.description}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>更新于 {new Date(resource.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[resource.status]}`}>
            {statusLabels[resource.status]}
          </span>
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-700"
          >
            编辑
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
} 