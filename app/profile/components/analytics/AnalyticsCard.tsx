'use client';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  trend: number[];
  icon: string;
}

export default function AnalyticsCard({ title, value, trend, icon }: AnalyticsCardProps) {
  const calculateTrend = () => {
    if (trend.length < 2) return 0;
    const current = trend[trend.length - 1];
    const previous = trend[trend.length - 2];
    return ((current - previous) / previous) * 100;
  };

  const trendValue = calculateTrend();
  const isPositive = trendValue > 0;
  const isNegative = trendValue < 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl">{icon}</div>
        <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'}`}>
          {isPositive ? '+' : ''}{trendValue.toFixed(1)}%
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="mt-4 h-8">
        <div className="flex items-center h-full">
          {trend.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-gray-100 rounded-full mx-0.5"
              style={{
                height: `${(value / Math.max(...trend)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 