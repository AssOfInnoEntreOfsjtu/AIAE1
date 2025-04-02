'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/InvestorFilterBar';
import InvestorCard from './components/InvestorCard';
import InvestorModal from './components/InvestorModal';
import { investors } from './data/investors';

export default function InvestorsPage() {
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInvestorClick = (investor: any) => {
    setSelectedInvestor(investor);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 第一区域：说明区 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              投资者库
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              发现优质投资机构，寻找创业伙伴，实现创新创业梦想
            </p>
          </motion.div>
        </div>
      </div>

      {/* 第二区域：搜索和筛选区 */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 搜索栏 */}
          <section className="mb-8">
            <SearchBar />
          </section>

          {/* 检索栏 */}
          <section className="mb-8">
            <FilterBar />
          </section>

          {/* 投资者展示区域 */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investors.map((investor, index) => (
                <motion.div
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <InvestorCard
                    {...investor}
                    onClick={() => handleInvestorClick(investor)}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>

      {/* 投资者详情模态框 */}
      <InvestorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        investor={selectedInvestor}
      />
    </div>
  );
} 