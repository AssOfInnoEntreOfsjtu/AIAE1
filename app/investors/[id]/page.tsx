'use client';

import { useParams } from 'next/navigation';

// 模拟投资者数据
const investors = [
  {
    id: '1',
    name: '创新资本',
    type: '风险投资',
    focus: ['AI技术', '硬科技', '医疗科技'],
    investment: '1000-5000万',
    stage: ['A轮', 'B轮'],
    portfolio: ['智能医疗', 'AI教育', '机器人'],
    description: '专注于投资具有创新性和高成长性的科技企业，特别是在人工智能和医疗科技领域。',
    team: [
      {
        name: '张明',
        title: '创始合伙人',
        experience: '前红杉资本合伙人，15年投资经验',
      },
      {
        name: '李华',
        title: '投资总监',
        experience: '前IDG资本投资经理，10年投资经验',
      },
    ],
    achievements: [
      '管理资产规模超过50亿',
      '已投资超过100家科技企业',
      '成功退出30+项目',
    ],
    contact: {
      email: 'contact@innovation.capital',
      phone: '400-888-8888',
      address: '北京市朝阳区科技园区88号',
    },
  },
  // 可以添加更多投资者数据
];

export default function InvestorDetail() {
  const params = useParams();
  const investor = investors.find(i => i.id === params.id);

  if (!investor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">未找到投资者信息</h1>
          <p className="text-gray-600 mt-2">请检查URL是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 头部信息 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-green-500 to-emerald-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-6xl">💼</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{investor.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{investor.type}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {investor.focus.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 详细信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧信息 */}
          <div className="md:col-span-2 space-y-8">
            {/* 公司简介 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">公司简介</h2>
              <p className="text-gray-600 leading-relaxed">{investor.description}</p>
            </div>

            {/* 投资信息 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">投资信息</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">投资规模</h3>
                  <p className="text-gray-700 text-lg">{investor.investment}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">投资阶段</h3>
                  <div className="flex flex-wrap gap-2">
                    {investor.stage.map((item, index) => (
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
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">投资组合</h2>
              <div className="flex flex-wrap gap-3">
                {investor.portfolio.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="space-y-8">
            {/* 团队信息 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">核心团队</h2>
              <div className="space-y-4">
                {investor.team.map((member, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-green-600">{member.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{member.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 成就 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">投资成就</h2>
              <ul className="space-y-3">
                {investor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 联系方式 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">联系方式</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📧</span>
                  <span className="text-gray-600">{investor.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📞</span>
                  <span className="text-gray-600">{investor.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">📍</span>
                  <span className="text-gray-600">{investor.contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 