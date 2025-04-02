'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useMemo, useCallback, useEffect, memo } from 'react';

interface NewsItem {
  title: string;
  description: string;
  date: string;
  category: '政策' | '新闻' | '项目';
  image: string;
}

// 将卡片组件抽离出来，使用 memo 优化渲染
const NewsCard = memo(({ item, index }: { item: NewsItem; index: number }): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/30 
        hover:border-blue-500/30 hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm"
      >
        {/* 图片区域 */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
              ${item.category === '政策' ? 'bg-blue-500/20 text-blue-300' :
                item.category === '新闻' ? 'bg-green-500/20 text-green-300' :
                  'bg-purple-500/20 text-purple-300'}`}>
              {item.category}
            </span>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">{item.date}</span>
            <motion.button
              whileHover={{ x: 5 }}
              className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              查看详情
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* 悬停效果 - 使用 CSS 变量优化性能 */}
        <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-300
          ${isHovered ? 'from-blue-500/5 via-blue-500/5 to-blue-500/5' : 'from-transparent via-transparent to-transparent'}`}
        />
      </div>
    </motion.div>
  );
});

NewsCard.displayName = 'NewsCard';

export default function BottomSection() {
  const [activeCategory, setActiveCategory] = useState<'全部' | '政策' | '新闻' | '项目'>('全部');
  const [isVisible, setIsVisible] = useState(false);

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

  // 使用 useCallback 优化事件处理函数
  const handleCategoryChange = useCallback((category: typeof activeCategory) => {
    setActiveCategory(category);
  }, []);

  // 使用 useMemo 缓存过滤后的列表
  const filteredItems = useMemo(() => {
    return activeCategory === '全部'
      ? newsItems
      : newsItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // 使用 useEffect 和 IntersectionObserver 优化可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('news-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="news-section" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* 背景装饰 - 使用 CSS 变量优化性能 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--tw-gradient-stops))] from-blue-500/10 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-4">信息动态</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
          </div>
          <div className="flex gap-3">
            {(['全部', '政策', '新闻', '项目'] as const).map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors
                  ${activeCategory === category
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-800/80 hover:text-white'}`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <NewsCard key={item.title} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 