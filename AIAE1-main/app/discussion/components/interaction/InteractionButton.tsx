'use client';

import { useState } from 'react';

interface InteractionButtonProps {
  icon: string;
  activeIcon: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  label: string;
  color: 'blue' | 'red' | 'yellow' | 'green' | 'purple';
  showCount?: boolean;
  showTooltip?: boolean;
}

export default function InteractionButton({
  icon,
  activeIcon,
  count,
  isActive,
  onClick,
  label,
  color,
  showCount = true,
  showTooltip = true
}: InteractionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const colorClasses = {
    blue: 'text-blue-600 hover:text-blue-700',
    red: 'text-red-600 hover:text-red-700',
    yellow: 'text-yellow-500 hover:text-yellow-600',
    green: 'text-green-600 hover:text-green-700',
    purple: 'text-purple-600 hover:text-purple-700'
  };

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center gap-1 transition-all duration-200 ${isActive ? colorClasses[color] : 'text-gray-500 hover:text-gray-700'
          } ${isAnimating ? 'scale-125' : ''}`}
      >
        <span className="text-xl transition-transform duration-200">
          {isActive ? activeIcon : icon}
        </span>
        {showCount && (
          <span className="text-sm font-medium transition-all duration-200">
            {count}
          </span>
        )}
      </button>
      {showTooltip && isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
          {label}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
} 