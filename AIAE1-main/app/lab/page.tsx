'use client';

/// <reference types="next" />
/// <reference types="next/image-types/global" />

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// 动态导入组件
const LabCard = dynamic(() => import('./components/labs/LabCard'), {
  loading: () => (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-slate-700/30">
      <div className="animate-pulse space-y-4">
        <div className="h-16 bg-slate-700/50 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const LabDetailModal = dynamic(() => import('./components/LabDetailModal'), { ssr: false });
const ProjectDetailModal = dynamic(() => import('./components/projects/ProjectDetailModal'), { ssr: false });
const ProjectCard = dynamic(() => import('./components/projects/ProjectCard'), {
  loading: () => (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-slate-700/30">
      <div className="animate-pulse space-y-4">
        <div className="h-48 bg-slate-700/50 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

interface Lab {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  department: string;
  director: string;
  researchAreas: string[];
  achievementCount: number;
  facilities: {
    name: string;
    description: string;
    image: string;
  }[];
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

// 模拟数据
const labsData: Lab[] = [
  {
    id: '1',
    name: '智能系统与机器人实验室',
    description: '致力于智能系统、机器人技术、人工智能等领域的前沿研究，推动技术创新与产业应用',
    coverImage: '/images/lab-cover.jpg',
    department: '计算机科学与技术学院',
    director: '张教授',
    researchAreas: ['智能系统', '机器人技术', '人工智能', '计算机视觉'],
    achievementCount: 45,
    facilities: [
      {
        name: '机器人实验平台',
        description: '配备多种工业机器人和协作机器人，支持机器人控制算法研究和应用开发',
        image: '/images/facility1.jpg'
      },
      {
        name: '计算机视觉实验室',
        description: '配备高性能计算集群和多种视觉传感器，支持计算机视觉算法研究',
        image: '/images/facility2.jpg'
      }
    ],
    contact: {
      address: '计算机楼A区5层',
      phone: '123-456-7890',
      email: 'robot@example.com',
      website: 'https://example.com/robot-lab'
    }
  },
  {
    id: '2',
    name: '生物医学工程实验室',
    description: '专注于生物医学工程领域的研究，包括医学影像处理、生物传感器、医疗机器人等方向',
    coverImage: '/images/lab2-cover.jpg',
    department: '生物医学工程学院',
    director: '李教授',
    researchAreas: ['医学影像', '生物传感器', '医疗机器人', '生物信息学'],
    achievementCount: 38,
    facilities: [
      {
        name: '医学影像处理平台',
        description: '配备先进的医学影像设备和处理系统，支持医学影像分析和诊断研究',
        image: '/images/facility3.jpg'
      },
      {
        name: '生物传感器实验室',
        description: '配备多种生物传感器和信号采集系统，用于生物医学信号检测和分析',
        image: '/images/facility4.jpg'
      }
    ],
    contact: {
      address: '生物医学楼B区3层',
      phone: '123-456-7891',
      email: 'biomed@example.com',
      website: 'https://example.com/biomed-lab'
    }
  },
  {
    id: '3',
    name: '材料科学与工程实验室',
    description: '研究新型材料的制备、表征及应用，包括纳米材料、智能材料、生物材料等',
    coverImage: '/images/lab3-cover.jpg',
    department: '材料科学与工程学院',
    director: '王教授',
    researchAreas: ['纳米材料', '智能材料', '生物材料', '材料表征'],
    achievementCount: 52,
    facilities: [
      {
        name: '材料制备实验室',
        description: '配备多种材料制备设备，支持新型材料的合成和制备',
        image: '/images/facility5.jpg'
      },
      {
        name: '材料表征中心',
        description: '配备多种材料表征仪器，用于材料结构和性能分析',
        image: '/images/facility6.jpg'
      }
    ],
    contact: {
      address: '材料楼C区4层',
      phone: '123-456-7892',
      email: 'materials@example.com',
      website: 'https://example.com/materials-lab'
    }
  },
  // 更多实验室数据...
];

// 研究项目数据
const projectsData = [
  {
    id: '1',
    title: '智能机器人控制系统研发',
    description: '开发新一代智能机器人控制系统，实现高精度运动控制和环境感知',
    coverImage: '/images/project1.jpg',
    lab: '智能系统与机器人实验室',
    department: '计算机科学与技术学院',
    status: '进行中',
    startDate: '2023-01',
    endDate: '2024-12',
    progress: 75,
    team: ['张教授', '李博士', '王研究员'],
    tags: ['机器人技术', '控制系统', '人工智能'],
  },
  {
    id: '2',
    title: '医学影像智能诊断系统',
    description: '基于深度学习的医学影像智能诊断系统，提高疾病诊断准确率',
    coverImage: '/images/project2.jpg',
    lab: '生物医学工程实验室',
    department: '生物医学工程学院',
    status: '已完成',
    startDate: '2022-06',
    endDate: '2023-12',
    progress: 100,
    team: ['刘教授', '陈博士', '赵研究员'],
    tags: ['医学影像', '深度学习', '医疗AI'],
  },
  // ... 更多项目数据
];

const departments = [
  '全部',
  '计算机科学与技术学院',
  '生物医学工程学院',
  '材料科学与工程学院',
  '机械工程学院',
  '电子信息学院',
];

const researchFields = [
  '全部',
  '人工智能',
  '机器人技术',
  '生物医学',
  '材料科学',
  '电子信息',
];

const projectTags = ['全部', '机器人技术', '控制系统', '人工智能', '医学影像', '深度学习', '医疗AI', '材料研发'];

export default function LabListPage() {
  const [activeTab, setActiveTab] = useState('labs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('全部');
  const [selectedField, setSelectedField] = useState('全部');
  const [selectedTag, setSelectedTag] = useState('全部');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleLabClick = (lab: Lab) => {
    setSelectedLab(lab);
    setIsLabModalOpen(true);
  };

  const handleProjectClick = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const filteredLabs = labsData.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === '全部' || lab.department === selectedDepartment;
    const matchesField = selectedField === '全部' || lab.researchAreas.includes(selectedField);
    return matchesSearch && matchesDepartment && matchesField;
  });

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === '全部' || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
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
              实验室展示平台
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              探索高校各领域研究实验室，了解最新科研成果
            </p>
          </motion.div>
        </div>
      </div>

      {/* 第二区域：搜索和检索区 */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-slate-700/30"
        >
          {/* 主检索标签 */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('labs')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'labs'
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
            >
              实验室信息
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'projects'
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
            >
              研究项目展示
            </button>
          </div>

          {/* 搜索框 */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder={`搜索${activeTab === 'labs' ? '实验室' : '研究项目'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-slate-700/30 border border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-300"
              suppressHydrationWarning
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

          {/* 二级检索 */}
          {activeTab === 'labs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  按学院筛选
                </label>
                <div className="flex flex-wrap gap-3">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedDepartment === dept
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  按研究方向筛选
                </label>
                <div className="flex flex-wrap gap-3">
                  {researchFields.map((field) => (
                    <button
                      key={field}
                      onClick={() => setSelectedField(field)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedField === field
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-4">
                按项目标签筛选
              </label>
              <div className="flex flex-wrap gap-3">
                {projectTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag === tag
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 展示区 */}
          <AnimatePresence mode="wait">
            {activeTab === 'labs' ? (
              <motion.div
                key="labs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredLabs.map((lab, index) => (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="cursor-pointer group"
                  >
                    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300">
                      <Suspense fallback={
                        <div className="animate-pulse space-y-4 p-6">
                          <div className="h-16 bg-slate-700/50 rounded-xl"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
                          </div>
                        </div>
                      }>
                        <LabCard {...lab} onClick={() => handleLabClick(lab)} />
                      </Suspense>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300">
                      <ProjectCard {...project} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 空状态提示 */}
          {(activeTab === 'labs' ? filteredLabs : filteredProjects).length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">暂无符合条件的{activeTab === 'labs' ? '实验室' : '研究项目'}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 实验室详情模态框 */}
      <AnimatePresence>
        {isLabModalOpen && selectedLab && (
          <LabDetailModal
            lab={selectedLab}
            isOpen={isLabModalOpen}
            onClose={() => {
              setIsLabModalOpen(false);
              setSelectedLab(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* 项目详情模态框 */}
      <AnimatePresence>
        {isProjectModalOpen && selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            isOpen={isProjectModalOpen}
            onClose={() => {
              setIsProjectModalOpen(false);
              setSelectedProject(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 