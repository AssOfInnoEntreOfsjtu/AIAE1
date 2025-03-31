import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function PUT(
  request: Request,
  { params }: { params: { activityId: string } }
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

    // 验证 token
    verify(token.value, JWT_SECRET);
    const activityId = params.activityId;

    // 这里应该更新数据库中的活动状态
    // 目前只返回成功响应
    return NextResponse.json({
      message: '活动已标记为已读',
      activityId
    });
  } catch (error) {
    console.error('标记活动已读失败:', error);
    return NextResponse.json(
      { message: '标记活动已读失败' },
      { status: 500 }
    );
  }
} 