'use client';

interface ProjectCardProps {
  title: string;
  description: string;
  industry: string;
  stage: string;
  type: string;
  needs: string[];
  image?: string;
}

export default function ProjectCard({
  title,
  description,
  industry,
  stage,
  type,
  needs,
  image = '/project-placeholder.jpg',
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🚀</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium mr-2">行业：</span>
            {industry}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium mr-2">阶段：</span>
            {stage}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium mr-2">类型：</span>
            {type}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {needs.map((need, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {need}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 