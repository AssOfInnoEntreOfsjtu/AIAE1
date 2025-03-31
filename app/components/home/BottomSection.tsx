'use client';

interface NewsItem {
  title: string;
  description: string;
  date: string;
  category: '政策' | '新闻' | '项目';
  image: string;
}

export default function BottomSection() {
  const newsItems: NewsItem[] = [
    {
      title: "关于促进人工智能产业发展的若干措施",
      description: "为加快人工智能产业发展，推动产业升级，特制定以下措施...",
      date: "2024.03.15",
      category: "政策",
      image: "/images/policy-ai.jpg"
    },
    {
      title: "2024年AI创新创业大赛正式启动",
      description: "大赛将面向全球征集优秀AI项目，总奖金池超过1000万元...",
      date: "2024.03.20",
      category: "新闻",
      image: "/images/news-competition.jpg"
    },
    {
      title: "智慧医疗解决方案项目路演",
      description: "展示AI技术在医疗领域的创新应用，包括智能诊断、远程医疗等...",
      date: "2024.03.25",
      category: "项目",
      image: "/images/project-medical.jpg"
    },
    {
      title: "新一代AI芯片研发项目启动",
      description: "项目将突破AI芯片关键技术，打造具有自主知识产权的AI芯片...",
      date: "2024.03.28",
      category: "项目",
      image: "/images/project-chip.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">信息动态</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg font-medium">
              全部
            </button>
            <button className="px-4 py-2 text-sm bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">
              政策
            </button>
            <button className="px-4 py-2 text-sm bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">
              新闻
            </button>
            <button className="px-4 py-2 text-sm bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50">
              项目
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="relative h-48">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                    ${item.category === '政策' ? 'bg-blue-100 text-blue-600' :
                      item.category === '新闻' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{item.date}</span>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    查看详情 →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 