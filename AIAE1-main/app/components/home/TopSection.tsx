'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideContent {
  title: string;
  description: string;
  date: string;
  image: string;
  tag: '活动' | '项目';
}

export default function TopSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const slides: SlideContent[] = [
    {
      title: "2024 AI创新创业大赛",
      description: "汇聚全球AI创新力量，发掘未来科技之星",
      date: "2024.04.15 - 2024.06.30",
      image: "/images/event-innovation.jpg",
      tag: "活动"
    },
    {
      title: "智慧医疗项目路演",
      description: "AI+医疗领域优质项目展示与投资对接",
      date: "2024.05.20",
      image: "/images/project-medical.jpg",
      tag: "项目"
    },
    {
      title: "产业数字化转型论坛",
      description: "探讨AI技术赋能传统产业的创新路径",
      date: "2024.04.28",
      image: "/images/event-forum.jpg",
      tag: "活动"
    },
    {
      title: "AI教育创新项目展示",
      description: "展示AI技术在教育领域的创新应用",
      date: "2024.05.15",
      image: "/images/project-education.jpg",
      tag: "项目"
    },
    {
      title: "智能制造技术研讨会",
      description: "探讨AI驱动的智能制造发展趋势",
      date: "2024.06.10",
      image: "/images/event-manufacturing.jpg",
      tag: "活动"
    },
    {
      title: "金融科技解决方案路演",
      description: "AI技术在金融领域的创新应用展示",
      date: "2024.05.25",
      image: "/images/project-finance.jpg",
      tag: "项目"
    },
    {
      title: "AI伦理与治理论坛",
      description: "探讨AI发展中的伦理问题与治理方案",
      date: "2024.06.20",
      image: "/images/event-ethics.jpg",
      tag: "活动"
    },
    {
      title: "智慧城市项目展示",
      description: "AI技术在城市管理中的创新应用",
      date: "2024.06.05",
      image: "/images/project-city.jpg",
      tag: "项目"
    }
  ];

  // 修改轮播切换逻辑
  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // 修改进度条动画逻辑
  const startProgressAnimation = () => {
    setProgress(0);
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }

    const startTime = Date.now();
    const duration = 6000; // 6秒完成一次轮播

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        // 循环轮播
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
        // 重置进度条
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, 16);
  };

  // 修改自动轮播效果
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextIndex);
      startProgressAnimation();
    }, 6000); // 每6秒自动切换一次

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [currentSlide]);

  // 修改缩略图点击处理
  const handleThumbnailClick = (index: number) => {
    setIsExpanding(true);
    goToSlide(index);
    startProgressAnimation();

    // 将点击的卡片移动到第一位
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const cardWidth = 160; // w-40 = 10rem = 160px
      const gap = 16; // gap-4 = 1rem = 16px
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // 修改缩略图滚动逻辑
  const scrollThumbnails = (direction: 'prev' | 'next') => {
    if (!thumbnailsRef.current) return;

    const container = thumbnailsRef.current;
    const scrollAmount = container.offsetWidth / 2;
    const maxScroll = container.scrollWidth - container.offsetWidth;

    if (direction === 'next') {
      if (container.scrollLeft >= maxScroll) {
        // 如果滚动到末尾，回到开始
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      }
    } else {
      if (container.scrollLeft <= 0) {
        // 如果滚动到开始，去到末尾
        container.scrollTo({
          left: maxScroll,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: container.scrollLeft - scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="h-[85vh] relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* 边界框 */}
      <div className="absolute inset-4 border border-gray-700/30 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* 进度条 */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gray-700/30">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* 背景效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50" />
          <div className="absolute inset-0 backdrop-blur-[2px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="relative h-full">
          {/* 大图区域 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slides[currentSlide].image})`,
                  transform: isExpanding ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* 缩略图区域 */}
          <div className="absolute bottom-8 right-8 w-1/4">
            <div className="relative">
              <div
                ref={thumbnailsRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              >
                {slides.map((slide, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative group cursor-pointer transition-all duration-700
                      ${currentSlide === index
                        ? 'scale-100 z-20'
                        : 'scale-95 hover:scale-100 z-10'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`relative w-40 h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10
                      ${currentSlide === index
                        ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900'
                        : 'opacity-70 group-hover:opacity-100'}`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${slide.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2
                          ${slide.tag === '活动'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-green-500/20 text-green-300'}`}>
                          {slide.tag}
                        </span>
                        <h3 className="text-white text-sm font-medium mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-gray-300 text-xs mb-2">
                          {slide.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 transition-all">
                            立即报名
                          </button>
                          <button className="px-3 py-1 border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-all">
                            了解详情
                          </button>
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          {slide.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 滚动按钮 */}
              <motion.button
                onClick={() => scrollThumbnails('prev')}
                className="absolute -left-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full
                  bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => scrollThumbnails('next')}
                className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full
                  bg-gray-800/80 hover:bg-gray-700/80 text-white shadow-lg backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* 内容展示 */}
          <motion.div
            className="absolute left-8 bottom-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4
              ${slides[currentSlide].tag === '活动'
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-green-500/20 text-green-300'}`}>
              {slides[currentSlide].tag}
            </span>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              {slides[currentSlide].description}
            </p>
            <div className="flex gap-4">
              <motion.button
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                立即报名
              </motion.button>
              <motion.button
                className="px-6 py-2.5 border border-white/20 text-white hover:bg-white/10 rounded-full font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                了解详情
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 