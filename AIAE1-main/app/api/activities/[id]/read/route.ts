import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = verify(token.value, JWT_SECRET);

    // 获取活动ID
    const id = params.id;

    // 在这里添加将活动标记为已读的逻辑
    // 例如：await db.activities.update({ id, read: true });

    return new NextResponse('Activity marked as read', { status: 200 });
  } catch (error) {
    console.error('Error marking activity as read:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 