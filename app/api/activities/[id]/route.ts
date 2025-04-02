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

    // 验证用户是否有权限访问该活动
    if (decoded.id !== id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // 这里添加获取用户活动的逻辑
    // 例如：const activities = await db.activities.find({ userId: id });

    // 返回模拟数据
    const activities = [
      {
        id: '1',
        type: 'message',
        title: '新消息',
        content: '您有一条新的消息',
        timestamp: new Date().toISOString(),
        read: false
      }
    ];

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 