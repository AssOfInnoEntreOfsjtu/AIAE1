import { Project } from '../types';

export const projectsData: Project[] = [
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
];

export const projectTags = [
  '全部',
  '机器人技术',
  '控制系统',
  '人工智能',
  '医学影像',
  '深度学习',
  '医疗AI',
  '材料研发',
]; 