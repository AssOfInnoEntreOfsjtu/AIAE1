interface EmptyStateProps {
  activeTab: string;
}

export default function EmptyState({ activeTab }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">暂无符合条件的{activeTab === 'labs' ? '实验室' : '研究项目'}</p>
    </div>
  );
} 