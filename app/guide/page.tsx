'use client';

import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Users,
  Briefcase,
  LineChart,
  Target,
  Building2,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  ChevronDown,
  Globe,
  BarChart3,
  Lightbulb,
  Rocket,
  Bell,
  CheckCircle2,
  Clock,
  Star,
  Handshake
} from 'lucide-react';

const features = [
  {
    title: '智能资源整合',
    description: '打破信息孤岛，实现跨学科资源智能匹配与整合',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    darkBgColor: 'dark:bg-blue-900/20',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    title: '跨学科协作',
    description: '智能匹配跨学科团队，促进创新思维碰撞与融合',
    icon: Users,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    darkBgColor: 'dark:bg-violet-900/20',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: '生态激活',
    description: '构建创新创业生态圈，激活资源流动与价值创造',
    icon: Zap,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    darkBgColor: 'dark:bg-rose-900/20',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    title: '智能指导',
    description: 'AI驱动的项目指导，助力初创项目快速成长',
    icon: Lightbulb,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    darkBgColor: 'dark:bg-amber-900/20',
    gradient: 'from-amber-500 to-yellow-600',
  },
];

const steps = [
  {
    title: '项目对接',
    description: '智能匹配优质项目，促进资源高效对接',
    icon: Briefcase,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    title: '人才匹配',
    description: '精准匹配跨学科人才，组建最优团队',
    icon: Users,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: '资本赋能',
    description: '对接投资资源，助力项目快速成长',
    icon: LineChart,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    title: '政策服务',
    description: '一站式政策服务，降低创业门槛',
    icon: Shield,
    gradient: 'from-amber-500 to-yellow-600',
  },
];

const stats = [
  {
    title: '项目对接',
    value: '3000+',
    icon: Briefcase,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    title: '人才匹配',
    value: '5000+',
    icon: Users,
    color: 'text-violet-500',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: '资本对接',
    value: '500+',
    icon: LineChart,
    color: 'text-rose-500',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    title: '跨学科团队',
    value: '800+',
    icon: Users,
    color: 'text-emerald-500',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: '政策服务',
    value: '200+',
    icon: Shield,
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    title: '成功案例',
    value: '100+',
    icon: CheckCircle2,
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-blue-600',
  },
];

export default function GuidePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 处理滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(index);
        }
      });

      // 计算滚动进度
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / totalScroll);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 平滑滚动到指定部分
  const scrollToSection = (index: number) => {
    if (typeof window === 'undefined') return;
    const sections = document.querySelectorAll('section');
    sections[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 overflow-y-auto snap-y snap-mandatory scroll-smooth overscroll-none z-[999] bg-gray-900">
      {/* 滚动进度指示器 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500 z-[1000]"
        style={{
          scaleX: scrollProgress
        }}
      />

      {/* 导航指示器 */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[1000] space-y-4">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${currentSection === index
              ? 'bg-white scale-125 shadow-lg'
              : 'bg-white/30 hover:bg-white/50'
              }`}
            onClick={() => scrollToSection(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* 头部区域 */}
      <section className="h-screen snap-start relative flex items-center justify-center overflow-hidden transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.3
          }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.5
            }}
            className="inline-block mb-8"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="rounded-xl shadow-2xl"
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.7
            }}
          >
            智能创新创业生态平台
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.9
            }}
          >
            通过数字化工具与生态运营，解决创业过程中资源分散、信息不对称、协作低效的三大痛点
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
              delay: 1.1
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立即注册
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
            <motion.a
              href="#features"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              了解更多
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
            delay: 1.3
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </motion.div>
      </section>

      {/* 核心功能区域 */}
      <section id="features" className="h-screen snap-start py-24 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 flex items-center transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-gray-900/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              一站式创新生态
            </h2>
            <p className="text-xl text-gray-400">
              项目对接+人才匹配+资本赋能+政策服务
            </p>
          </motion.div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.15
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800 transition-all duration-300"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  whileHover={{ opacity: 0.1 }}
                />
                <motion.div
                  className={`inline-flex p-4 rounded-xl ${feature.bgColor} ${feature.darkBgColor}`}
                  whileHover={{ scale: 1.1 }}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </motion.div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用步骤区域 */}
      <section className="h-screen snap-start py-24 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 flex items-center transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-gray-900/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-rose-400">
              核心解决方案
            </h2>
            <p className="text-xl text-gray-400">
              智能匹配，高效协作，价值创造
            </p>
          </motion.div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.15
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  whileHover={{ opacity: 0.1 }}
                />
                <motion.div
                  className="inline-flex p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 数据展示区域 */}
      <section className="h-screen snap-start py-24 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 flex items-center transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-gray-900/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              平台数据
            </h2>
            <p className="text-xl text-gray-400">
              数字赋能，价值创造
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.15
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  whileHover={{ opacity: 0.1 }}
                />
                <motion.div
                  className="inline-flex p-4 rounded-xl bg-white/10 backdrop-blur-sm mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </motion.div>
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl text-gray-400">{stat.title}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.3
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-2 text-gray-400">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>持续增长中</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 底部CTA区域 */}
      <section className="h-screen snap-start relative bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 overflow-hidden flex items-center transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
              加入创新生态圈
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              打造"项目对接+人才匹配+资本赋能+政策服务"的一站式创新生态
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/register"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                立即加入
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a
                href="/explore"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                先随便逛逛
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 