import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = verify(token.value, JWT_SECRET) as JwtPayload;
    const id = params.id;

    // 验证用户是否有权限访问该用户信息
    if (decoded.id !== id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // 这里添加获取用户信息的逻辑
    // 例如：const user = await db.users.findById(id);

    // 返回模拟数据
    const user = {
      id,
      name: '测试用户',
      email: 'test@example.com',
      avatar: '/avatars/default.jpg',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 