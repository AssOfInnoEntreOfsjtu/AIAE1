import { NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const wss = new WebSocketServer({ noServer: true });

// 存储所有活动的 WebSocket 连接
const connections = new Map<string, WebSocket[]>();

wss.on('connection', (ws, userId) => {
  console.log(`Client connected: ${userId}`);

  // 将连接添加到用户连接池
  if (!connections.has(userId)) {
    connections.set(userId, []);
  }
  connections.get(userId)?.push(ws);

  // 发送欢迎消息
  ws.send(JSON.stringify({
    type: 'system',
    content: '已连接到活动通知服务'
  }));

  // 处理连接关闭
  ws.on('close', () => {
    console.log(`Client disconnected: ${userId}`);
    const userConnections = connections.get(userId);
    if (userConnections) {
      const index = userConnections.indexOf(ws);
      if (index > -1) {
        userConnections.splice(index, 1);
      }
      if (userConnections.length === 0) {
        connections.delete(userId);
      }
    }
  });
});

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = verify(token.value, JWT_SECRET);
    const userId = params.userId;

    // 验证用户是否有权限访问该 WebSocket
    if (decoded.id !== userId) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // 获取请求头
    const headersList = headers();
    const upgrade = headersList.get('upgrade');
    const connection = headersList.get('connection');

    // 检查是否是 WebSocket 升级请求
    if (upgrade?.toLowerCase() !== 'websocket' || connection?.toLowerCase() !== 'upgrade') {
      return new NextResponse('Expected Upgrade: WebSocket', { status: 426 });
    }

    // 创建 WebSocket 连接
    const { socket, response } = new WebSocketServer({ noServer: true });
    wss.handleUpgrade(request, socket, Buffer.from([]), (ws) => {
      wss.emit('connection', ws, userId);
    });

    return response;
  } catch (error) {
    console.error('WebSocket error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 