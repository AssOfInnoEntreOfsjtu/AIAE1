'use client';

interface TalentCardProps {
  name: string;
  title: string;
  skills: string[];
  experience: string;
  education: string;
  interests: string[];
}

export default function TalentCard({
  name,
  title,
  skills,
  experience,
  education,
  interests,
}: TalentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">{title}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">技能标签</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500">工作经验</h4>
              <p className="text-gray-700">{experience}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">教育背景</h4>
              <p className="text-gray-700">{education}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">求职意向</h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 