'use client';

import { Category } from '../types';

interface PostFormProps {
  categories: Category[];
  onSubmit: (post: { title: string; content: string; tags: string; categoryId: number }) => void;
  onCancel: () => void;
}

export default function PostForm({ categories, onSubmit, onCancel }: PostFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tags: formData.get('tags') as string,
      categoryId: Number(formData.get('category'))
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">发布新帖</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            标题
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
            required
          />
        </div>
        <div className="group">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            分类
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 appearance-none bg-white"
            required
          >
            <option value="">选择分类</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="group">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 resize-none"
            required
          />
        </div>
        <div className="group">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            标签（用逗号分隔）
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
            placeholder="例如：技术创新,产业应用,创业经验"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            发布
          </button>
        </div>
      </form>
    </div>
  );
} 