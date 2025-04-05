'use client';

interface InvestorNavInfoProps {
  totalInvestors: number;
  activeInvestors: number;
  totalInvestment: string;
  averageInvestment: string;
}

export default function InvestorNavInfo({
  totalInvestors,
  activeInvestors,
  totalInvestment,
  averageInvestment,
}: InvestorNavInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="space-y-4">
        {/* 投资者统计 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600">投资者总数</span>
          </div>
          <span className="font-semibold text-gray-800">{totalInvestors}</span>
        </div>

        {/* 活跃投资者 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-gray-600">活跃投资者</span>
          </div>
          <span className="font-semibold text-green-600">{activeInvestors}</span>
        </div>

        {/* 总投资规模 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">总投资规模</span>
          </div>
          <span className="font-semibold text-gray-800">{totalInvestment}</span>
        </div>

        {/* 平均投资规模 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-gray-600">平均投资规模</span>
          </div>
          <span className="font-semibold text-gray-800">{averageInvestment}</span>
        </div>
      </div>

      {/* 分割线 */}
      <div className="my-4 border-t border-gray-100"></div>

      {/* 快速操作 */}
      <div className="space-y-2">
        <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2">
          <span>📊</span>
          <span>查看数据报告</span>
        </button>
        <button className="w-full px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
          <span>📥</span>
          <span>导出数据</span>
        </button>
      </div>
    </div>
  );
} 