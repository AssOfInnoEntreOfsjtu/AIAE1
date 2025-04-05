'use client';

interface InvestorCardProps {
  name: string;
  type: string;
  focus: string[];
  investment: string;
  stage: string[];
  portfolio: string[];
}

export default function InvestorCard({
  name,
  type,
  focus,
  investment,
  stage,
  portfolio,
}: InvestorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl">💼</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">{type}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">关注领域</h4>
            <div className="flex flex-wrap gap-2">
              {focus.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500">投资规模</h4>
              <p className="text-gray-700">{investment}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">投资阶段</h4>
              <div className="flex flex-wrap gap-1">
                {stage.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">投资组合</h4>
            <div className="flex flex-wrap gap-2">
              {portfolio.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 