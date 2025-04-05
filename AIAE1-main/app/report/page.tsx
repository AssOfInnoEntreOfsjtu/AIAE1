'use client';

import { useState } from 'react';

interface FormData {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  projectName: string;
  projectDescription: string;
  projectStage: string;
  website: string;
  additionalInfo: string;
}

export default function ReportPage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    projectName: '',
    projectDescription: '',
    projectStage: '',
    website: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 处理表单提交
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题和说明 */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
              <span className="text-blue-600 font-medium">AI创新报道</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">寻求报道</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              分享您的创新故事，让更多人了解您的项目。我们期待与您合作，共同传播AI领域的创新成果。
            </p>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧说明区域 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">报道说明</h3>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      报道范围
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        AI技术创新项目
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        产业应用案例
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        创业团队故事
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        行业发展趋势
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      报道形式
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        深度专访
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        项目报道
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        案例分析
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        行业洞察
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      合作流程
                    </h4>
                    <ol className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                        提交申请
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                        初步审核
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                        深入沟通
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">4</span>
                        确定方案
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">5</span>
                        执行报道
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧表单区域 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">申请表单</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                        公司名称
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                        联系人
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                        required
                      />
                    </div>
                  </div>

                  {/* 联系方式 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        联系电话
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        电子邮箱
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                        required
                      />
                    </div>
                  </div>

                  {/* 项目信息 */}
                  <div className="group">
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                      项目名称
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      项目简介
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 resize-none"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="projectStage" className="block text-sm font-medium text-gray-700 mb-1">
                      项目阶段
                    </label>
                    <select
                      id="projectStage"
                      name="projectStage"
                      value={formData.projectStage}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 appearance-none bg-white"
                      required
                    >
                      <option value="">请选择项目阶段</option>
                      <option value="idea">创意阶段</option>
                      <option value="development">研发阶段</option>
                      <option value="testing">测试阶段</option>
                      <option value="launched">已上线</option>
                      <option value="scaling">规模化阶段</option>
                    </select>
                  </div>

                  <div className="group">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      项目网站
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                      placeholder="https://"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                      补充信息
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 resize-none"
                      placeholder="其他需要补充的信息..."
                    />
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      提交申请
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}