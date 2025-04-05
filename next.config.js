/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  webpack: (config, { dev, isServer }) => {
    // 优化生产环境构建
    if (!dev && !isServer) {
      Object.assign(config.optimization.splitChunks.cacheGroups, {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 10,
        },
      });

      // 启用压缩
      config.optimization.minimize = true;
    }
    return config;
  },
  // 启用 SWC 压缩
  swcMinify: true,
  // 启用增量静态再生成
  experimental: {
    cacheMaxMemorySize: 50,
  },
  // 配置缓存
  onDemandEntries: {
    // 页面保持活跃状态的时间（毫秒）
    maxInactiveAge: 60 * 1000,
    // 同时保持活跃的页面数量
    pagesBufferLength: 5,
  },
  // 优化字体加载
  optimizeFonts: true,
};

module.exports = nextConfig; 