'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import FilterSection from './components/FilterSection';
import { projects } from './data/projects';
import {
  stageOptions,
  typeOptions,
  teamStatusOptions,
  industryOptions,
  needsOptions,
} from './data/filterOptions';

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
        >
          <FilterSection
            // 传递搜索查询字符串及其更新函数
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            // 传递选中的阶段及其更新函数
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            // 传递选中的类型及其更新函数
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            // 传递选中的团队状态及其更新函数
            selectedTeamStatus={selectedTeamStatus}
            setSelectedTeamStatus={setSelectedTeamStatus}
            // 传递选中的行业及其更新函数
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            // 传递选中的需求及其更新函数
            selectedNeeds={selectedNeeds}
            setSelectedNeeds={setSelectedNeeds}
            // 传递阶段选项列表
            stageOptions={stageOptions}
            // 传递类型选项列表
            typeOptions={typeOptions}
            // 传递团队状态选项列表
            teamStatusOptions={teamStatusOptions}
            // 传递行业选项列表
            industryOptions={industryOptions}
            // 传递需求选项列表
            needsOptions={needsOptions}
          />

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
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        modalView={modalView}
        setModalView={setModalView}
        contactForm={contactForm}
        setContactForm={setContactForm}
        handleContactSubmit={handleContactSubmit}
        discussion={discussion}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
} 