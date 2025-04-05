'use client';
 
import { useEffect, useRef } from 'react';
 
export default function ParticleBackground() {
  // 使用 useRef 创建对 canvas 元素的引用
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  useEffect(() => {
    // 获取 canvas 元素
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    // 获取 canvas 的 2D 渲染上下文
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
 
    // 设置画布大小以适应窗口
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    // 添加窗口大小改变事件监听器
    window.addEventListener('resize', resizeCanvas);
 
    // 定义粒子类
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      icon: string;
 
      // 初始化粒子的位置、大小、速度和图标
      constructor() {
        this.x = Math.random() * (canvas?.width ?? window.innerWidth);
        this.y = Math.random() * (canvas?.height ?? window.innerHeight);
        this.size = Math.random() * 30 + 20;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.icon = '🤖'; // 可以替换为其他科技相关的图标
      }
 
      // 更新粒子的位置，并在到达边界时反向速度
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > (canvas?.width ?? window.innerWidth)) this.speedX *= -1;
        if (this.y < 0 || this.y > (canvas?.height ?? window.innerHeight)) this.speedY *= -1;
      }

      // 绘制粒子到 canvas 上
      draw() {
        if (!ctx) return;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.icon, this.x, this.y);
      }
    }
 
    // 创建粒子数组并初始化粒子
    const particles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle());
    }
 
    // 动画循环，清空画布并重新绘制粒子
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();
 
    // 清理函数，移除窗口大小改变事件监听器
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
 
  // 渲染 canvas 元素
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}