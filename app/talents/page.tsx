'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TalentCard from '../components/TalentCard';

// 模拟人才数据
const talents = [
  {
    id: 1,
    name: '张明',
    title: 'AI算法专家',
    avatar: '/images/avatar1.jpg',
    skills: ['机器学习', '深度学习', '计算机视觉'],
    experience: '5年',
    education: '清华大学计算机系博士',
    interests: ['AI创业', '技术咨询', '团队管理'],
    projects: ['智能图像识别系统', '自动驾驶感知模块'],
    github: 'https://github.com/example1',
    linkedin: 'https://linkedin.com/in/example1',
    email: 'zhangming@example.com',
    location: '北京',
    availability: '可加入新项目',
    teamSize: '3-5人',
    preferredRoles: ['技术负责人', '算法工程师'],
    languages: ['Python', 'C++', 'JavaScript'],
    tools: ['PyTorch', 'TensorFlow', 'Docker'],
    awards: ['ACM程序设计大赛金奖', '国家奖学金'],
    certificates: ['AWS认证解决方案架构师', 'Google TensorFlow开发者认证'],
  },
  {
    id: 2,
    name: '李华',
    title: '全栈开发工程师',
    avatar: '/images/avatar2.jpg',
    skills: ['Python', 'React', 'Node.js', 'TensorFlow'],
    experience: '3年',
    education: '北京大学软件工程硕士',
    interests: ['AI应用开发', '产品设计', '技术创业'],
    projects: ['智能客服系统', '数据分析平台'],
    github: 'https://github.com/example2',
    linkedin: 'https://linkedin.com/in/example2',
    email: 'lihua@example.com',
    location: '上海',
    availability: '寻找创业伙伴',
    teamSize: '2-4人',
    preferredRoles: ['全栈工程师', '产品经理'],
    languages: ['JavaScript', 'Python', 'Java'],
    tools: ['React', 'Node.js', 'MongoDB'],
    awards: ['互联网+创新创业大赛银奖'],
    certificates: ['MongoDB认证开发者'],
  },
  {
    id: 3,
    name: '王芳',
    title: '产品经理',
    avatar: '/images/avatar3.jpg',
    skills: ['产品规划', '用户研究', '数据分析'],
    experience: '4年',
    education: '浙江大学计算机系硕士',
    interests: ['AI产品', '用户体验', '产品运营'],
    projects: ['智能家居控制系统', '健康管理APP'],
    github: 'https://github.com/example3',
    linkedin: 'https://linkedin.com/in/example3',
    email: 'wangfang@example.com',
    location: '杭州',
    availability: '可加入新项目',
    teamSize: '4-6人',
    preferredRoles: ['产品经理', '产品运营'],
    languages: ['中文', '英语'],
    tools: ['Figma', 'Axure', '数据分析工具'],
    awards: ['产品设计大赛金奖'],
    certificates: ['PMP项目管理认证'],
  },
];

// 筛选选项
const skillOptions = [
  '全部',
  '机器学习',
  '深度学习',
  '计算机视觉',
  'Python',
  'React',
  'Node.js',
  '产品规划',
  '用户研究',
  '数据分析',
];

const roleOptions = [
  '全部',
  '算法工程师',
  '全栈工程师',
  '产品经理',
  'UI设计师',
  '数据分析师',
  '项目经理',
];

const educationOptions = [
  '全部',
  '博士',
  '硕士',
  '本科',
];

const availabilityOptions = [
  '全部',
  '可加入新项目',
  '寻找创业伙伴',
  '兼职合作',
];

const locationOptions = [
  '全部',
  '北京',
  '上海',
  '杭州',
  '深圳',
];

export default function TalentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('全部');
  const [selectedRole, setSelectedRole] = useState('全部');
  const [selectedEducation, setSelectedEducation] = useState('全部');
  const [selectedAvailability, setSelectedAvailability] = useState('全部');
  const [selectedLocation, setSelectedLocation] = useState('全部');
  const [selectedTalent, setSelectedTalent] = useState<typeof talents[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTalentClick = (talent: typeof talents[0]) => {
    setSelectedTalent(talent);
    setIsModalOpen(true);
  };

  const filteredTalents = talents.filter(talent => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill = selectedSkill === '全部' || talent.skills.includes(selectedSkill);
    const matchesRole = selectedRole === '全部' || talent.preferredRoles.includes(selectedRole);
    const matchesEducation = selectedEducation === '全部' || talent.education.includes(selectedEducation);
    const matchesAvailability = selectedAvailability === '全部' || talent.availability === selectedAvailability;
    const matchesLocation = selectedLocation === '全部' || talent.location === selectedLocation;

    return matchesSearch && matchesSkill && matchesRole && matchesEducation &&
      matchesAvailability && matchesLocation;
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
              人才库
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              发现优秀人才，组建理想团队，实现创新创业梦想
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
              placeholder="搜索姓名、技能或职位..."
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
                技能筛选
              </label>
              <div className="flex flex-wrap gap-3">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedSkill === skill
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                期望角色
              </label>
              <div className="flex flex-wrap gap-3">
                {roleOptions.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedRole === role
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                学历要求
              </label>
              <div className="flex flex-wrap gap-3">
                {educationOptions.map((edu) => (
                  <button
                    key={edu}
                    onClick={() => setSelectedEducation(edu)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedEducation === edu
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {edu}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                当前状态
              </label>
              <div className="flex flex-wrap gap-3">
                {availabilityOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedAvailability(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedAvailability === status
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
                所在地
              </label>
              <div className="flex flex-wrap gap-3">
                {locationOptions.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedLocation === location
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 人才展示区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTalents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleTalentClick(talent)}
                className="cursor-pointer group"
              >
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300">
                  <TalentCard {...talent} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 空状态提示 */}
          {filteredTalents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">暂无符合条件的候选人</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 人才详情模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedTalent && (
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
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedTalent.name}</h2>
                    <p className="text-slate-300">{selectedTalent.title}</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">基本信息</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{selectedTalent.education}</span>
                      </div>
                      <div className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{selectedTalent.location}</span>
                      </div>
                      <div className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>经验：{selectedTalent.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">技能专长</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTalent.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">项目经验</h3>
                    <ul className="space-y-2">
                      {selectedTalent.projects.map((project) => (
                        <li key={project} className="text-slate-300 flex items-start">
                          <svg className="w-5 h-5 mr-2 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{selectedTalent.email}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={selectedTalent.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                        <a
                          href={selectedTalent.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c.517-.8 1.999-1.603 3.001-1.603 3.179 0 4 2.104 4 4.819v6.019z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 