'use client';

export default function Dashboard() {
  const stats = [
    { label: '注册项目', value: '128', change: '+12%' },
    { label: '活跃用户', value: '2.4k', change: '+8%' },
    { label: '投资总额', value: '¥1.2M', change: '+15%' },
    { label: '成功案例', value: '32', change: '+5%' },
  ];
  'use client';

  interface Stat {
    label: string;
    value: string;
    change: string;
  }

  const Dashboard = () => {
    const stats: Stat[] = [
      { label: '注册项目', value: '128', change: '+12%' },
      { label: '活跃用户', value: '2.4k', change: '+8%' },
      { label: '投资总额', value: '¥1.2M', change: '+15%' },
      { label: '成功案例', value: '32', change: '+5%' },
    ];

    if (!stats || stats.length === 0) {
      return <div className="text-red-500">没有可用的统计数据。</div>;
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            <div className="text-sm text-green-500 mt-2">{stat.change}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
          <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          <div className="text-sm text-green-500 mt-2">{stat.change}</div>
        </div>
      ))}
    </div>
  );
} 