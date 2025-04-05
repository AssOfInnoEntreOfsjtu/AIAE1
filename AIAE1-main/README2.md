# AIAE (AI Innovation and Entrepreneurship Platform)

## 项目概述
AIAE 是一个面向高校学生的 AI 创新与创业平台，旨在促进 AI 领域的创新思维和创业实践。平台提供项目展示、团队组建、资源对接等功能，帮助学生实现 AI 创业梦想。

## 技术栈
- 前端框架：Next.js 14 (App Router)
- UI 框架：Tailwind CSS
- 动画库：Framer Motion
- 状态管理：React Hooks
- 类型系统：TypeScript
- 样式方案：Tailwind CSS + CSS Modules

## 项目结构
```
aiae/
├── app/                    # Next.js 应用主目录
│   ├── api/               # API 路由
│   │   └── user/         # 用户相关 API
│   ├── discussion/       # 讨论区模块
│   │   ├── components/   # 讨论区组件
│   │   └── types/       # 类型定义
│   ├── lab/             # 实验室模块
│   │   └── components/  # 实验室相关组件
│   ├── projects/        # 项目库模块
│   │   └── components/  # 项目相关组件
│   ├── talents/         # 人才库模块
│   │   └── components/  # 人才相关组件
│   └── layout.tsx       # 全局布局
├── components/          # 全局共享组件
├── public/             # 静态资源
└── styles/            # 全局样式
```

## 功能模块

### 1. 项目库 (Projects)
- **功能特点**：
  - 项目展示与筛选
  - 创业阶段分类
  - 项目类型标签
  - 团队状态展示
  - 资源需求展示
  - 行业分类
  - 实时搜索
  - 一键联系
  - 公开讨论

- **数据模型**：
  ```typescript
  interface Project {
    id: number;
    name: string;
    description: string;
    coverImage: string;
    stage: 'idea' | 'prototype' | 'seed' | 'competition' | 'implemented' | 'other';
    type: 'research' | 'startup' | 'cooperation' | 'innovation' | 'competition';
    teamStatus: 'complete' | 'recruiting' | 'needTech' | 'needOperation';
    industry: string;
    resourceNeeds: string[];
    progress: number;
    team: {
      size: number;
      roles: string[];
    };
    contact: {
      email: string;
      phone: string;
      wechat: string;
    };
    github?: string;
    website?: string;
  }
  ```

### 2. 人才库 (Talents)
- **功能特点**：
  - 人才信息展示
  - 技能标签系统
  - 角色筛选
  - 教育背景筛选
  - 可用性状态
  - 地理位置筛选
  - 项目经验展示
  - 联系方式管理

- **数据模型**：
  ```typescript
  interface Talent {
    id: number;
    name: string;
    avatar: string;
    role: string;
    skills: string[];
    education: string;
    experience: string;
    projects: string[];
    availability: 'available' | 'busy' | 'inProject';
    location: string;
    contact: {
      email: string;
      phone: string;
      wechat: string;
    };
  }
  ```

### 3. 实验室 (Lab)
- **功能特点**：
  - 实验室信息展示
  - 研究方向展示
  - 成果展示
  - 团队介绍
  - 联系方式
  - 合作机会

- **数据模型**：
  ```typescript
  interface Lab {
    id: number;
    name: string;
    description: string;
    coverImage: string;
    department: string;
    director: string;
    researchAreas: string[];
    achievementCount: number;
  }
  ```

### 4. 讨论区 (Discussion)
- **功能特点**：
  - 帖子发布与展示
  - 分类管理
  - 评论系统
  - 点赞功能
  - 分享功能
  - 举报功能
  - 用户互动
  - 内容筛选

- **数据模型**：
  ```typescript
  interface Post {
    id: number;
    title: string;
    content: string;
    author: {
      id: number;
      name: string;
      avatar: string;
      role: string;
    };
    date: string;
    likes: number;
    comments: number;
    views: number;
    tags: string[];
    category: Category;
  }
  ```

## 用户界面设计

### 1. 设计风格
- 现代简约风格
- 深色主题
- 响应式设计
- 流畅动画效果
- 玻璃态设计元素

### 2. 交互设计
- 平滑过渡动画
- 悬停效果
- 加载状态反馈
- 错误处理提示
- 表单验证
- 模态框交互

### 3. 布局结构
- 响应式网格系统
- 卡片式布局
- 侧边栏导航
- 顶部导航栏
- 底部页脚

## 性能优化

### 1. 前端优化
- 组件懒加载
- 图片优化
- 代码分割
- 缓存策略
- 预加载关键资源

### 2. 后端优化
- API 缓存
- 数据库索引
- 查询优化
- 负载均衡
- 错误处理

## 安全措施

### 1. 用户认证
- JWT 认证
- 密码加密
- 会话管理
- 权限控制

### 2. 数据安全
- 输入验证
- XSS 防护
- CSRF 防护
- SQL 注入防护

## 部署方案

### 1. 开发环境
- Node.js 环境
- TypeScript 编译
- 开发服务器
- 热重载

### 2. 生产环境
- Vercel 部署
- 环境变量配置
- 域名设置
- SSL 证书

## 开发规范

### 1. 代码规范
- ESLint 配置
- Prettier 格式化
- TypeScript 类型检查
- Git 提交规范

### 2. 文档规范
- 组件文档
- API 文档
- 类型定义
- 注释规范

## 后续规划

### 1. 功能扩展
- 实时聊天系统
- 项目协作工具
- 资源对接平台
- 数据分析功能

### 2. 性能提升
- 服务端渲染优化
- 缓存策略优化
- 数据库优化
- CDN 加速

### 3. 用户体验
- 界面优化
- 交互优化
- 可访问性提升
- 多语言支持

## 贡献指南
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

## 许可证
MIT License 