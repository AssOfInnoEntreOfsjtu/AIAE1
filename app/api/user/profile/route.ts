import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }

    verify(token.value, JWT_SECRET);

    // 这里应该从数据库获取用户信息
    // 目前返回模拟数据
    return NextResponse.json({
      id: 1,
      name: '测试用户',
      email: 'test@example.com',
      avatar: '/default-avatar.png',
      bio: '这是一个测试用户',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { message: '获取用户信息失败' },
      { status: 401 }
    );
  }
} 