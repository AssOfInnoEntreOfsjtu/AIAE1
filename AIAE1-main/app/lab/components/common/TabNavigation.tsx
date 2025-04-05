interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab('labs')}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${activeTab === 'labs'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        实验室信息
      </button>
      <button
        onClick={() => setActiveTab('projects')}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${activeTab === 'projects'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        研究项目展示
      </button>
    </div>
  );
} 