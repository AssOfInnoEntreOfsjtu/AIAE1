'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">平台服务</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Link
                href={service.link}
                className="group relative block"
              >
                <div className="relative bg-gray-800/50 rounded-2xl p-8 border border-gray-700/30 
                  hover:border-blue-500/30 hover:bg-gray-800/80 transition-all duration-300
                  backdrop-blur-sm overflow-hidden"
                >
                  {/* 悬停效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 
                    group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-blue-500/5 
                    transition-all duration-500" />

                  {/* 图标 */}
                  <motion.div
                    className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* 内容 */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* 链接 */}
                  <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                    <span>了解更多</span>
                    <motion.svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </div>

                  {/* 装饰边框 */}
                  <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/20 
                    rounded-2xl transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 