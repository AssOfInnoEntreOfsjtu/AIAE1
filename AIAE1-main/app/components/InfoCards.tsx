'use client';

export default function InfoCards() {
  const cards = [
    {
      title: 'AI创业趋势',
      description: '2024年AI创业领域最新发展趋势分析',
      icon: '📈',
      color: 'bg-blue-500',
    },
    {
      title: '投资机会',
      description: '精选AI领域优质投资机会',
      icon: '💰',
      color: 'bg-green-500',
    },
    {
      title: '人才需求',
      description: 'AI领域最新人才需求报告',
      icon: '👥',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className={`${card.color} p-4 text-white text-3xl`}>
            {card.icon}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 