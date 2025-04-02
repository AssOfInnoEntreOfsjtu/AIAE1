# 项目结构图

## 目录结构

```
aiae/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API 路由
│   ├── (auth)/            # 认证相关页面
│   ├── (dashboard)/       # 仪表板相关页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── ui/               # UI 基础组件
│   ├── forms/            # 表单组件
│   └── shared/           # 共享组件
├── lib/                   # 工具函数和库
│   ├── utils/            # 通用工具函数
│   ├── hooks/            # React Hooks
│   └── constants/        # 常量定义
├── public/               # 静态资源
│   ├── images/          # 图片资源
│   └── fonts/           # 字体文件
├── styles/              # 样式文件
│   └── globals.css      # 全局样式
├── types/               # TypeScript 类型定义
├── docs/                # 项目文档
│   ├── architecture/    # 架构文档
│   ├── api/            # API 文档
│   ├── development/    # 开发文档
│   ├── deployment/     # 部署文档
│   └── knowledge/      # 知识库
│       ├── decisions/  # 决策记录
│       └── troubleshooting/ # 排错手册
├── scripts/            # 脚本文件
├── tests/              # 测试文件
├── .env.example        # 环境变量示例
├── .gitignore         # Git 忽略文件
├── next.config.js     # Next.js 配置
├── package.json       # 项目配置
├── postcss.config.js  # PostCSS 配置
├── tailwind.config.js # Tailwind CSS 配置
└── tsconfig.json      # TypeScript 配置
```

## 关键目录说明

### 1. app/
- **用途**: Next.js 13+ App Router 的主要目录
- **重要文件**:
  - `layout.tsx`: 根布局组件
  - `page.tsx`: 首页组件
  - `api/`: API 路由处理
  - `(auth)/`: 认证相关页面
  - `(dashboard)/`: 仪表板相关页面

### 2. components/
- **用途**: React 组件目录
- **子目录**:
  - `ui/`: 基础 UI 组件
  - `forms/`: 表单相关组件
  - `shared/`: 共享组件

### 3. lib/
- **用途**: 工具函数和库
- **子目录**:
  - `utils/`: 通用工具函数
  - `hooks/`: React Hooks
  - `constants/`: 常量定义

### 4. public/
- **用途**: 静态资源目录
- **子目录**:
  - `images/`: 图片资源
  - `fonts/`: 字体文件

### 5. styles/
- **用途**: 样式文件目录
- **重要文件**:
  - `globals.css`: 全局样式

### 6. types/
- **用途**: TypeScript 类型定义
- **重要文件**:
  - `index.d.ts`: 全局类型定义

### 7. docs/
- **用途**: 项目文档
- **子目录**:
  - `architecture/`: 架构文档
  - `api/`: API 文档
  - `development/`: 开发文档
  - `deployment/`: 部署文档
  - `knowledge/`: 知识库

### 8. scripts/
- **用途**: 脚本文件目录
- **重要文件**:
  - `setup.sh`: 环境设置脚本
  - `deploy.sh`: 部署脚本

### 9. tests/
- **用途**: 测试文件目录
- **子目录**:
  - `unit/`: 单元测试
  - `integration/`: 集成测试
  - `e2e/`: 端到端测试

## 重要文件说明

### 1. 配置文件
- `next.config.js`: Next.js 配置
- `package.json`: 项目依赖和脚本
- `tsconfig.json`: TypeScript 配置
- `tailwind.config.js`: Tailwind CSS 配置
- `postcss.config.js`: PostCSS 配置

### 2. 环境文件
- `.env.example`: 环境变量示例
- `.env.local`: 本地环境变量
- `.env.production`: 生产环境变量

### 3. 文档文件
- `README.md`: 项目说明
- `CONTRIBUTING.md`: 贡献指南
- `CHANGELOG.md`: 变更日志

## 文件命名规范

### 1. 组件文件
- 使用 PascalCase: `Button.tsx`, `UserProfile.tsx`
- 页面组件使用 `page.tsx`
- 布局组件使用 `layout.tsx`

### 2. 工具文件
- 使用 camelCase: `formatDate.ts`, `validateEmail.ts`
- 类型定义使用 `.d.ts` 扩展名

### 3. 样式文件
- 使用 kebab-case: `button-styles.css`
- 全局样式使用 `globals.css`

### 4. 测试文件
- 使用 `.test.ts` 或 `.spec.ts` 扩展名
- 与源文件同名: `Button.test.tsx`

## 导入规范

### 1. 相对路径
```typescript
// 推荐
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/formatDate'

// 不推荐
import { Button } from '../../../components/ui/Button'
```

### 2. 类型导入
```typescript
// 推荐
import type { User } from '@/types'

// 不推荐
import { User } from '@/types'
```

### 3. 样式导入
```typescript
// 推荐
import '@/styles/globals.css'

// 不推荐
import './styles.css'
``` 