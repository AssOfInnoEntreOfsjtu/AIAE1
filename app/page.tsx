'use client';

import TopSection from '@/app/components/home/TopSection';
import MiddleSection from '@/app/components/home/MiddleSection';
import BottomSection from '@/app/components/home/BottomSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </div>
  );
}
