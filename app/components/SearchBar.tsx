'use client';

export default function SearchBar() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="搜索项目名称、关键词..."
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          搜索
        </button>
      </div>
    </div>
  );
} 