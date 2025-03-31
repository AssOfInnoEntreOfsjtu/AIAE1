'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '项目库', path: '/projects' },
  { name: '人才库', path: '/talents' },
  { name: '投资者库', path: '/investors' },
  { name: '信息栏', path: '/info' },
  { name: '我的', path: '/profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* 左侧导航栏 - 固定定位 */}
      <nav className="fixed w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
        {/* AIAE Logo - 垂直排列 */}
        <Link href="/" className="block mb-8">
          <div className="text-4xl font-bold text-center">
            <div className="leading-tight">
              <span className="block">A</span>
              <span className="block">I</span>
              <span className="block">A</span>
              <span className="block">E</span>
            </div>
          </div>
        </Link>

        {/* 其他导航项 - 竖向排列 */}
        <div className="space-y-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block w-full h-24 flex items-center justify-center text-center rounded-lg hover:bg-gray-700 transition-colors ${pathname === item.path ? 'bg-gray-700' : 'bg-gray-900'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>


      </nav>

      {/* 右侧内容区 - 添加左边距以补偿固定导航栏的宽度 */}
      <main className="flex-1 p-8 bg-gray-100 ml-64">
        {children}
      </main>
    </div>
  );
} 