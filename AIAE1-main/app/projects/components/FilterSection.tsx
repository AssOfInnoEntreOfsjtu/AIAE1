import React from 'react';

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedTeamStatus: string;
  setSelectedTeamStatus: (status: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedNeeds: string;
  setSelectedNeeds: (needs: string) => void;
  stageOptions: string[];
  typeOptions: string[];
  teamStatusOptions: string[];
  industryOptions: string[];
  needsOptions: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  selectedType,
  setSelectedType,
  selectedTeamStatus,
  setSelectedTeamStatus,
  selectedIndustry,
  setSelectedIndustry,
  selectedNeeds,
  setSelectedNeeds,
  stageOptions,
  typeOptions,
  teamStatusOptions,
  industryOptions,
  needsOptions,
}) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-slate-700/30">
      {/* 搜索框 */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="搜索项目名称、描述或标签..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-300"
        />
        <svg
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* 筛选选项 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            创业阶段
          </label>
          <div className="flex flex-wrap gap-3">
            {stageOptions.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedStage === stage
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            项目类型
          </label>
          <div className="flex flex-wrap gap-3">
            {typeOptions.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedType === type
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            团队状态
          </label>
          <div className="flex flex-wrap gap-3">
            {teamStatusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedTeamStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTeamStatus === status
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            所属行业
          </label>
          <div className="flex flex-wrap gap-3">
            {industryOptions.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedIndustry === industry
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-4">
            资源需求
          </label>
          <div className="flex flex-wrap gap-3">
            {needsOptions.map((need) => (
              <button
                key={need}
                onClick={() => setSelectedNeeds(need)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedNeeds === need
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
              >
                {need}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection; 