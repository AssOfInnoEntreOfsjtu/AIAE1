'use client';

import { Category, PostFilters as PostFiltersType } from '../types';

interface PostFiltersProps {
  categories: Category[];
  filters: PostFiltersType;
  onFilterChange: (filters: PostFiltersType) => void;
}

export default function PostFilters({ categories, filters, onFilterChange }: PostFiltersProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 搜索框 */}
        <div className="md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索帖子..."
              value={filters.search || ''}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        {/* 分类选择 */}
        <div>
          <select
            value={filters.categoryId || ''}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
          >
            <option value="">所有分类</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* 排序选择 */}
        <div>
          <select
            value={filters.sortBy || 'latest'}
            onChange={handleSortChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
          >
            <option value="latest">最新发布</option>
            <option value="popular">最多浏览</option>
            <option value="mostCommented">最多评论</option>
          </select>
        </div>
      </div>
    </div>
  );
} 