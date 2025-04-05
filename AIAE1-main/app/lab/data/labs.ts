import { Lab } from '../types';

export const labsData: Lab[] = [
  {
    id: '1',
    name: '智能系统与机器人实验室',
    description: '致力于智能系统、机器人技术、人工智能等领域的前沿研究，推动技术创新与产业应用',
    coverImage: '/images/lab-cover.jpg',
    department: '计算机科学与技术学院',
    director: '张教授',
    researchAreas: ['智能系统', '机器人技术', '人工智能', '计算机视觉'],
    achievementCount: 45,
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
  },
];

export const departments = [
  '全部',
  '计算机科学与技术学院',
  '生物医学工程学院',
  '材料科学与工程学院',
  '机械工程学院',
  '电子信息学院',
];

export const researchFields = [
  '全部',
  '人工智能',
  '机器人技术',
  '生物医学',
  '材料科学',
  '电子信息',
]; 