# 排错手册

## 1. 开发环境问题

### 1.1 依赖安装失败
**症状**:
- npm install 失败
- 出现依赖冲突
- 版本不兼容

**解决方案**:
1. 清除 npm 缓存：
   ```bash
   npm cache clean --force
   ```

2. 删除 node_modules 和 package-lock.json：
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. 重新安装依赖：
   ```bash
   npm install
   ```

4. 如果还有问题，尝试使用特定版本：
   ```bash
   npm install package@version
   ```

### 1.2 开发服务器启动失败
**症状**:
- npm run dev 失败
- 端口被占用
- 环境变量缺失

**解决方案**:
1. 检查端口占用：
   ```bash
   netstat -ano | findstr :3000
   ```

2. 检查环境变量：
   ```bash
   # 确保 .env.local 文件存在并包含必要的变量
   cp .env.example .env.local
   ```

3. 检查 Node.js 版本：
   ```bash
   node -v
   # 确保版本 >= 18.0.0
   ```

## 2. 构建问题

### 2.1 构建失败
**症状**:
- npm run build 失败
- TypeScript 类型错误
- 资源加载失败

**解决方案**:
1. 检查 TypeScript 错误：
   ```bash
   npm run type-check
   ```

2. 清理构建缓存：
   ```bash
   rm -rf .next
   ```

3. 重新构建：
   ```bash
   npm run build
   ```

### 2.2 静态资源问题
**症状**:
- 图片加载失败
- 字体加载失败
- 样式丢失

**解决方案**:
1. 检查资源路径：
   - 确保资源放在 public 目录下
   - 使用正确的相对路径

2. 检查 Next.js 配置：
   ```javascript
   // next.config.js
   module.exports = {
     images: {
       domains: ['your-domain.com'],
     },
   }
   ```

## 3. 运行时问题

### 3.1 API 路由问题
**症状**:
- API 请求失败
- 404 错误
- 500 错误

**解决方案**:
1. 检查路由文件位置：
   - 确保在 pages/api 目录下
   - 文件名正确

2. 检查请求方法：
   ```javascript
   // 确保处理正确的 HTTP 方法
   export default function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ message: 'Method not allowed' })
     }
     // ...
   }
   ```

### 3.2 认证问题
**症状**:
- 登录失败
- Token 无效
- 会话过期

**解决方案**:
1. 检查 NextAuth.js 配置：
   ```javascript
   // pages/api/auth/[...nextauth].js
   export default NextAuth({
     providers: [...],
     secret: process.env.NEXTAUTH_SECRET,
   })
   ```

2. 检查环境变量：
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret
   ```

## 4. 性能问题

### 4.1 页面加载慢
**症状**:
- 首屏加载时间长
- 资源加载慢
- 交互响应慢

**解决方案**:
1. 优化图片：
   - 使用 Next.js Image 组件
   - 压缩图片
   - 使用适当的图片格式

2. 代码分割：
   ```javascript
   // 使用动态导入
   const DynamicComponent = dynamic(() => import('../components/Heavy'))
   ```

3. 缓存策略：
   ```javascript
   // 添加缓存控制
   res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
   ```

### 4.2 内存泄漏
**症状**:
- 内存使用持续增长
- 应用变慢
- 浏览器崩溃

**解决方案**:
1. 检查事件监听器：
   ```javascript
   useEffect(() => {
     const handler = () => {}
     window.addEventListener('event', handler)
     return () => window.removeEventListener('event', handler)
   }, [])
   ```

2. 检查定时器：
   ```javascript
   useEffect(() => {
     const timer = setInterval(() => {}, 1000)
     return () => clearInterval(timer)
   }, [])
   ```

## 5. 部署问题

### 5.1 部署失败
**症状**:
- 构建失败
- 部署超时
- 环境变量缺失

**解决方案**:
1. 检查构建日志：
   ```bash
   pm2 logs
   ```

2. 检查环境变量：
   ```bash
   # 确保生产环境变量正确设置
   pm2 env aiae
   ```

3. 检查服务器资源：
   ```bash
   # 检查磁盘空间
   df -h
   # 检查内存使用
   free -m
   ```

### 5.2 域名和 SSL 问题
**症状**:
- 域名无法访问
- SSL 证书无效
- 重定向问题

**解决方案**:
1. 检查 Nginx 配置：
   ```nginx
   server {
     listen 443 ssl;
     server_name your-domain.com;
     ssl_certificate /path/to/cert.pem;
     ssl_certificate_key /path/to/key.pem;
   }
   ```

2. 检查 DNS 设置：
   - 确保 A 记录正确
   - 确保 SSL 证书正确安装

## 6. 数据库问题

### 6.1 连接问题
**症状**:
- 数据库连接失败
- 查询超时
- 连接池耗尽

**解决方案**:
1. 检查连接字符串：
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```

2. 检查连接池配置：
   ```javascript
   const pool = new Pool({
     max: 20,
     idleTimeoutMillis: 30000,
   })
   ```

### 6.2 数据一致性问题
**症状**:
- 数据不同步
- 事务失败
- 并发问题

**解决方案**:
1. 使用事务：
   ```javascript
   const client = await pool.connect()
   try {
     await client.query('BEGIN')
     // 执行操作
     await client.query('COMMIT')
   } catch (e) {
     await client.query('ROLLBACK')
     throw e
   } finally {
     client.release()
   }
   ```

2. 添加错误重试机制：
   ```javascript
   const retry = async (fn, retries = 3) => {
     try {
       return await fn()
     } catch (error) {
       if (retries > 0) {
         await new Promise(resolve => setTimeout(resolve, 1000))
         return retry(fn, retries - 1)
       }
       throw error
     }
   }
   ``` 