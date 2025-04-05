'use client';

interface InvestorInfoBarProps {
  totalInvestors: number;
  activeInvestors: number;
  totalInvestment: string;
  averageInvestment: string;
  topFocus: string[];
}

export default function InvestorInfoBar({
  totalInvestors,
  activeInvestors,
  totalInvestment,
  averageInvestment,
  topFocus,
}: InvestorInfoBarProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 投资者总数 */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">{totalInvestors}</div>
          <div className="text-gray-600">投资者总数</div>
        </div>

        {/* 活跃投资者 */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{activeInvestors}</div>
          <div className="text-gray-600">活跃投资者</div>
        </div>

        {/* 总投资规模 */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">{totalInvestment}</div>
          <div className="text-gray-600">总投资规模</div>
        </div>

        {/* 平均投资规模 */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">{averageInvestment}</div>
          <div className="text-gray-600">平均投资规模</div>
        </div>
      </div>

      {/* 热门关注领域 */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">热门关注领域</h3>
        <div className="flex flex-wrap gap-3">
          {topFocus.map((focus, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 rounded-full text-sm font-medium shadow-sm"
            >
              {focus}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 