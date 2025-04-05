import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 模拟用户数据
const users = [
  {
    id: 1,
    name: '测试用户',
    email: 'test@example.com',
    password: '123456',
    avatar: '/default-avatar.png',
    bio: '这是一个测试用户',
    title: '软件工程师',
    location: '北京',
    website: 'https://example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 检查邮箱是否已存在
    if (users.some(u => u.email === email)) {
      return NextResponse.json(
        { message: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 创建新用户
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      avatar: '/default-avatar.png',
      bio: '',
      title: '',
      location: '',
      website: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    // 生成 token
    const token = sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 设置 cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json(
      { message: '注册失败' },
      { status: 500 }
    );
  }
} 