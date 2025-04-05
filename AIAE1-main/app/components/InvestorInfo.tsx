'use client';

interface InvestorInfoProps {
  name: string;
  type: string;
  focus: string[];
  investment: string;
  stage: string[];
  portfolio: string[];
  description: string;
  team: {
    name: string;
    title: string;
    experience: string;
  }[];
  achievements: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export default function InvestorInfo({
  name,
  type,
  focus,
  investment,
  stage,
  portfolio,
  description,
  team,
  achievements,
  contact,
}: InvestorInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* 头部信息 */}
      <div className="relative h-48 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl">💼</span>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-8">
        {/* 基本信息 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-xl text-gray-600 mt-2">{type}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {focus.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 详细信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧信息 */}
          <div className="space-y-6">
            {/* 公司简介 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">公司简介</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* 投资信息 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">投资信息</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">投资规模</h3>
                  <p className="text-gray-800">{investment}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">投资阶段</h3>
                  <div className="flex flex-wrap gap-2">
                    {stage.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 投资组合 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">投资组合</h2>
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

          {/* 右侧信息 */}
          <div className="space-y-6">
            {/* 团队信息 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">核心团队</h2>
              <div className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-green-600">{member.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{member.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 成就 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">投资成就</h2>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 联系方式 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">联系方式</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📧</span>
                  <span className="text-gray-600">{contact.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📞</span>
                  <span className="text-gray-600">{contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📍</span>
                  <span className="text-gray-600">{contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 