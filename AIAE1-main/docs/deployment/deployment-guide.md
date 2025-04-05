# 部署指南

## 1. 部署环境要求

### 1.1 服务器要求
- CPU: 4核及以上
- 内存: 16GB及以上
- 硬盘空间: 50GB可用空间
- 操作系统: Ubuntu 20.04 LTS 或更高版本

### 1.2 软件要求
- Node.js: v18.0.0 或更高版本
- npm: v9.0.0 或更高版本
- PM2: 最新版本
- Nginx: 最新版本

## 2. 部署步骤

### 2.1 服务器环境准备
1. 更新系统包：
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. 安装 Node.js：
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. 安装 PM2：
   ```bash
   sudo npm install -g pm2
   ```

4. 安装 Nginx：
   ```bash
   sudo apt install -y nginx
   ```

### 2.2 项目部署
1. 克隆项目：
   ```bash
   git clone [项目地址]
   cd [项目目录]
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 构建项目：
   ```bash
   npm run build
   ```

4. 配置环境变量：
   ```bash
   cp .env.example .env.production
   # 编辑 .env.production 文件，设置生产环境变量
   ```

### 2.3 PM2 配置
1. 创建 PM2 配置文件 `ecosystem.config.js`：
   ```javascript
   module.exports = {
     apps: [{
       name: 'aiae',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production'
       }
     }]
   }
   ```

2. 启动应用：
   ```bash
   pm2 start ecosystem.config.js
   ```

### 2.4 Nginx 配置
1. 创建 Nginx 配置文件：
   ```bash
   sudo nano /etc/nginx/sites-available/aiae
   ```

2. 添加以下配置：
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

3. 启用站点配置：
   ```bash
   sudo ln -s /etc/nginx/sites-available/aiae /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 3. SSL 配置

### 3.1 安装 Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 3.2 获取 SSL 证书
```bash
sudo certbot --nginx -d your-domain.com
```

## 4. 监控和维护

### 4.1 日志管理
- 查看应用日志：
  ```bash
  pm2 logs aiae
  ```
- 查看 Nginx 日志：
  ```bash
  sudo tail -f /var/log/nginx/access.log
  sudo tail -f /var/log/nginx/error.log
  ```

### 4.2 性能监控
- 使用 PM2 监控：
  ```bash
  pm2 monit
  ```
- 使用系统监控工具：
  ```bash
  htop
  ```

## 5. 备份策略

### 5.1 数据库备份
[根据实际使用的数据库添加备份策略]

### 5.2 代码备份
```bash
# 创建备份目录
mkdir -p /backup/aiae

# 备份代码
tar -czf /backup/aiae/code-$(date +%Y%m%d).tar.gz /path/to/project
```

## 6. 故障恢复

### 6.1 应用重启
```bash
pm2 restart aiae
```

### 6.2 回滚部署
```bash
# 回滚到上一个版本
git reset --hard HEAD^
npm install
npm run build
pm2 restart aiae
```

## 7. 安全配置

### 7.1 防火墙设置
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 7.2 安全更新
```bash
sudo apt update
sudo apt upgrade -y
```

## 8. 性能优化

### 8.1 Nginx 优化
[添加 Nginx 性能优化配置]

### 8.2 Node.js 优化
[添加 Node.js 性能优化配置] 