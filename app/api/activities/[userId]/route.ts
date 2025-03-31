import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 模拟活动数据
const mockActivities = [
  {
    id: '1',
    type: 'message',
    title: '新消息',
    content: '您收到了一条新的消息',
    timestamp: new Date().toISOString(),
    read: false,
    link: '/messages/1'
  },
  {
    id: '2',
    type: 'interaction',
    title: '互动提醒',
    content: '有人关注了您',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true
  },
  {
    id: '3',
    type: 'announcement',
    title: '系统公告',
    content: '系统将于今晚进行维护',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false
  }
];

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }

    const decoded = verify(token.value, JWT_SECRET);
    const userId = params.userId;

    // 验证用户是否有权限访问该活动
    if (decoded.id !== userId) {
      return NextResponse.json(
        { message: '无权限访问' },
        { status: 403 }
      );
    }

    // 返回用户的活动列表
    return NextResponse.json(mockActivities);
  } catch (error) {
    console.error('获取活动列表失败:', error);
    return NextResponse.json(
      { message: '获取活动列表失败' },
      { status: 500 }
    );
  }
} 