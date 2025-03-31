'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

// 模拟项目数据
const projects = [
  {
    id: 1,
    title: 'AI智能助手',
    description: '基于大语言模型的智能助手，提供个性化服务和智能对话功能。',
    industry: 'AI应用',
    stage: '原型开发中',
    type: '学生创业',
    needs: ['技术', '运营', '市场'],
    teamStatus: '招募队友',
    teamSize: '3-5人',
    location: '北京',
    tags: ['AI', '大语言模型', '智能对话'],
    progress: 60,
    team: ['张明', '李华'],
    contact: 'project1@example.com',
    github: 'https://github.com/project1',
    website: 'https://project1.example.com',
  },
  {
    id: 2,
    title: '计算机视觉平台',
    description: '提供企业级计算机视觉解决方案，包括目标检测、图像识别等功能。',
    industry: 'AI基础技术',
    stage: '种子轮筹备',
    type: '科研成果转化',
    needs: ['资金', '市场', '运营'],
    teamStatus: '团队完善',
    teamSize: '4-6人',
    location: '上海',
    tags: ['计算机视觉', 'AI', '企业服务'],
    progress: 80,
    team: ['王芳', '赵明', '李华'],
    contact: 'project2@example.com',
    github: 'https://github.com/project2',
    website: 'https://project2.example.com',
  },
  {
    id: 3,
    title: 'AI芯片设计',
    description: '专注于AI芯片的研发和设计，提供高性能、低功耗的AI计算解决方案。',
    industry: 'AI硬件',
    stage: '创意阶段',
    type: '竞赛项目',
    needs: ['技术', '资金', '人才'],
    teamStatus: '缺技术',
    teamSize: '2-4人',
    location: '杭州',
    tags: ['AI芯片', '硬件设计', '集成电路'],
    progress: 30,
    team: ['张明'],
    contact: 'project3@example.com',
    github: 'https://github.com/project3',
    website: 'https://project3.example.com',
  },
  {
    id: 4,
    title: 'AI教育平台',
    description: '智能教育平台，提供个性化学习路径和实时反馈。',
    industry: 'AI教育',
    stage: '已落地',
    type: '校企合作',
    needs: ['运营', '市场', '内容'],
    teamStatus: '缺运营',
    teamSize: '5-8人',
    location: '深圳',
    tags: ['教育科技', 'AI', '在线教育'],
    progress: 90,
    team: ['王芳', '李华', '赵明', '张明'],
    contact: 'project4@example.com',
    github: 'https://github.com/project4',
    website: 'https://project4.example.com',
  },
];

// 筛选选项
const stageOptions = [
  '全部',
  '创意阶段',
  '原型开发中',
  '种子轮筹备',
  '参赛项目',
  '已落地',
  '其他',
];

const typeOptions = [
  '全部',
  '科研成果转化',
  '学生创业',
  '校企合作',
  '大创项目',
  '竞赛项目',
];

const teamStatusOptions = [
  '全部',
  '团队完善',
  '招募队友',
  '缺技术',
  '缺运营',
];

const industryOptions = [
  '全部',
  'AI应用',
  'AI基础技术',
  'AI硬件',
  'AI教育',
  'AI医疗',
  'AI金融',
  '其他',
];

const needsOptions = [
  '全部',
  '技术',
  '资金',
  '市场',
  '运营',
  '人才',
  '内容',
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [selectedTeamStatus, setSelectedTeamStatus] = useState('全部');
  const [selectedIndustry, setSelectedIndustry] = useState('全部');
  const [selectedNeeds, setSelectedNeeds] = useState('全部');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'details' | 'contact' | 'discussion'>('details');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [discussion, setDiscussion] = useState([
    {
      id: 1,
      user: '张明',
      avatar: '/images/avatar1.jpg',
      content: '这个项目很有意思，我们可以聊聊合作。',
      time: '2024-03-20 14:30',
    },
    {
      id: 2,
      user: '李华',
      avatar: '/images/avatar2.jpg',
      content: '我们团队正好缺一个算法工程师，有兴趣加入吗？',
      time: '2024-03-20 15:00',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleProjectClick = (project: typeof projects[0], view: 'details' | 'contact' | 'discussion' = 'details') => {
    setSelectedProject(project);
    setModalView(view);
    setIsModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加发送联系表单的逻辑
    console.log('Contact form submitted:', contactForm);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: discussion.length + 1,
      user: '当前用户',
      avatar: '/images/default-avatar.jpg',
      content: newComment,
      time: new Date().toLocaleString(),
    };

    setDiscussion([...discussion, comment]);
    setNewComment('');
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStage = selectedStage === '全部' || project.stage === selectedStage;
    const matchesType = selectedType === '全部' || project.type === selectedType;
    const matchesTeamStatus = selectedTeamStatus === '全部' || project.teamStatus === selectedTeamStatus;
    const matchesIndustry = selectedIndustry === '全部' || project.industry === selectedIndustry;
    const matchesNeeds = selectedNeeds === '全部' || project.needs.includes(selectedNeeds);

    return matchesSearch && matchesStage && matchesType && matchesTeamStatus &&
      matchesIndustry && matchesNeeds;
  });

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
              项目库
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              发现优质项目，寻找创业伙伴，实现创新创业梦想
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
          className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-slate-700/30"
        >
          {/* 搜索框 */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="搜索项目名称、描述或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-300"
            />
            <svg
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* 筛选选项 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                创业阶段
              </label>
              <div className="flex flex-wrap gap-3">
                {stageOptions.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedStage === stage
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                项目类型
              </label>
              <div className="flex flex-wrap gap-3">
                {typeOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedType === type
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                团队状态
              </label>
              <div className="flex flex-wrap gap-3">
                {teamStatusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedTeamStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTeamStatus === status
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                所属行业
              </label>
              <div className="flex flex-wrap gap-3">
                {industryOptions.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedIndustry === industry
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                资源需求
              </label>
              <div className="flex flex-wrap gap-3">
                {needsOptions.map((need) => (
                  <button
                    key={need}
                    onClick={() => setSelectedNeeds(need)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedNeeds === need
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 项目展示区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300">
                  <ProjectCard {...project} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 空状态提示 */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">暂无符合条件的项目</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 项目详情模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                width: modalView !== 'details' ? '175%' : '100%',
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex h-full">
                {/* 左侧项目信息 */}
                <motion.div
                  className="flex-1 p-8 overflow-y-auto"
                  animate={{
                    width: modalView !== 'details' ? '57%' : '100%',
                    transition: {
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                      <p className="text-slate-300">{selectedProject.description}</p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* 功能按钮 */}
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={() => setModalView('contact')}
                      className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${modalView === 'contact'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                        }`}
                    >
                      一键联系
                    </button>
                    <button
                      onClick={() => setModalView('discussion')}
                      className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 ${modalView === 'discussion'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/25'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                        }`}
                    >
                      公开讨论
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">项目信息</h3>
                      <div className="space-y-4">
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span>阶段：{selectedProject.stage}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>类型：{selectedProject.type}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>行业：{selectedProject.industry}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">团队信息</h3>
                      <div className="space-y-4">
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>团队规模：{selectedProject.teamSize}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>团队状态：{selectedProject.teamStatus}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>项目进度：{selectedProject.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">资源需求</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.needs.map((need) => (
                          <span
                            key={need}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                          >
                            {need}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">项目标签</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
                      <div className="space-y-4">
                        <div className="flex items-center text-slate-300">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{selectedProject.contact}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-colors"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                          <a
                            href={selectedProject.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-colors"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 右侧功能区 */}
                <AnimatePresence>
                  {modalView !== 'details' && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: '43%',
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                      exit={{
                        width: 0,
                        opacity: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                      className="border-l border-slate-700/30 p-6 overflow-y-auto"
                    >
                      {modalView === 'contact' && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-6">联系项目团队</h3>
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                姓名
                              </label>
                              <input
                                type="text"
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                邮箱
                              </label>
                              <input
                                type="email"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                电话
                              </label>
                              <input
                                type="tel"
                                value={contactForm.phone}
                                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                留言
                              </label>
                              <textarea
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 h-32"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors"
                            >
                              发送消息
                            </button>
                          </form>
                        </motion.div>
                      )}

                      {modalView === 'discussion' && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-6">项目讨论</h3>
                          <div className="space-y-4 mb-6">
                            {discussion.map((comment) => (
                              <div key={comment.id} className="flex gap-4">
                                <img
                                  src={comment.avatar}
                                  alt={comment.user}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-medium">{comment.user}</span>
                                    <span className="text-slate-400 text-sm">{comment.time}</span>
                                  </div>
                                  <p className="text-slate-300">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <form onSubmit={handleCommentSubmit} className="space-y-4">
                            <div>
                              <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="写下你的想法..."
                                className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 h-24"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-colors"
                            >
                              发表评论
                            </button>
                          </form>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 