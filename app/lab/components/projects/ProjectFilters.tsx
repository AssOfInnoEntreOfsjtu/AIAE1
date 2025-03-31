import { FilterProps } from '../../types';

interface ProjectFiltersProps extends Pick<FilterProps, 'selectedTag' | 'setSelectedTag' | 'projectTags'> { }

export default function ProjectFilters({
  selectedTag,
  setSelectedTag,
  projectTags,
}: ProjectFiltersProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        按项目标签筛选
      </label>
      <div className="flex flex-wrap gap-2">
        {projectTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTag === tag
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
} 