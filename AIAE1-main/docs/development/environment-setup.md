# 开发环境设置指南

## 1. 系统要求

### 1.1 硬件要求
- CPU: 双核及以上
- 内存: 8GB及以上
- 硬盘空间: 20GB可用空间

### 1.2 软件要求
- Node.js: v18.0.0 或更高版本
- npm: v9.0.0 或更高版本
- Git: v2.0.0 或更高版本

## 2. 开发环境配置

### 2.1 安装 Node.js
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装 LTS 版本
3. 验证安装：
   ```bash
   node --version
   npm --version
   ```

### 2.2 安装 Git
1. 访问 [Git 官网](https://git-scm.com/)
2. 下载并安装
3. 配置 Git：
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## 3. 项目设置

### 3.1 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

### 3.2 安装依赖
```bash
npm install
```

### 3.3 环境变量配置
1. 复制环境变量模板：
   ```bash
   cp .env.example .env.local
   ```
2. 配置必要的环境变量：
   ```
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

## 4. 开发工具推荐

### 4.1 代码编辑器
- Visual Studio Code
- 推荐插件：
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - GitLens

### 4.2 浏览器开发工具
- Chrome DevTools
- React Developer Tools

## 5. 开发流程

### 5.1 启动开发服务器
```bash
npm run dev
```

### 5.2 代码规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循项目代码风格指南

### 5.3 Git 工作流
1. 创建新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. 提交更改：
   ```bash
   git add .
   git commit -m "your commit message"
   ```
3. 推送到远程：
   ```bash
   git push origin feature/your-feature-name
   ```

## 6. 调试指南

### 6.1 前端调试
- 使用 Chrome DevTools
- 使用 React Developer Tools
- 使用 console.log 和断点调试

### 6.2 后端调试
- 使用 VS Code 调试器
- 使用 API 测试工具（如 Postman）

## 7. 常见问题解决

### 7.1 依赖安装问题
- 清除 npm 缓存：
  ```bash
  npm cache clean --force
  ```
- 删除 node_modules 并重新安装：
  ```bash
  rm -rf node_modules
  npm install
  ```

### 7.2 开发服务器问题
- 检查端口占用：
  ```bash
  netstat -ano | findstr :3000
  ```
- 重启开发服务器

## 8. 开发资源

### 8.1 文档资源
- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://reactjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 8.2 学习资源
- [Next.js 学习教程](https://nextjs.org/learn)
- [React 学习教程](https://reactjs.org/tutorial)
- [Tailwind CSS 学习教程](https://tailwindcss.com/docs/installation) 