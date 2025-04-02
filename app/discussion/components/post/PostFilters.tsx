'use client';

import { Category, PostFilters as PostFiltersType } from '../../types';

interface PostFiltersProps {
  categories: Category[];
  filters: PostFiltersType;
  onFilterChange: (filters: PostFiltersType) => void;
}

export default function PostFilters({
  categories,
  filters,
  onFilterChange
}: PostFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      categoryId: e.target.value ? Number(e.target.value) : undefined
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as PostFiltersType['sortBy']
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="搜索帖子..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-4">
        <select
          value={filters.categoryId || ''}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">所有分类</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={filters.sortBy || 'latest'}
          onChange={handleSortChange}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="latest">最新发布</option>
          <option value="popular">最多点赞</option>
          <option value="mostCommented">最多评论</option>
        </select>
      </div>
    </div>
  );
} 