'use client';

interface ThemeSelectorProps {
  value: 'light' | 'dark' | 'system';
  onChange: (value: 'light' | 'dark' | 'system') => void;
}

export default function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  const themes = [
    { id: 'light', label: '浅色', icon: '☀️' },
    { id: 'dark', label: '深色', icon: '🌙' },
    { id: 'system', label: '跟随系统', icon: '💻' },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onChange(theme.id)}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${value === theme.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <span className="text-2xl mb-2">{theme.icon}</span>
          <span className="text-sm font-medium text-gray-900">{theme.label}</span>
        </button>
      ))}
    </div>
  );
} 