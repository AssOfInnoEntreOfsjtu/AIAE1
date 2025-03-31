'use client';

import Link from 'next/link';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function MiddleSection() {
  const services: ServiceCard[] = [
    {
      title: "寻求报道",
      description: "分享您的创新故事，让更多人了解您的项目",
      icon: "📰",
      link: "/report"
    },
    {
      title: "讨论留言区",
      description: "参与行业讨论，分享您的见解和经验",
      icon: "💬",
      link: "/discussion"
    },
    {
      title: "加入平台",
      description: "成为平台合作伙伴，共创AI产业未来",
      icon: "🤝",
      link: "/join"
    },
    {
      title: "实验室信息",
      description: "了解最新研发动态，探索技术创新前沿",
      icon: "🔬",
      link: "/lab"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">平台服务</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all cursor-pointer block"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>了解更多</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 