'use client';

import { useState } from 'react';

interface JoinFormData {
  type: 'project' | 'talent' | 'investor' | 'lab' | 'other';
  name: string;
  contact: string;
  phone: string;
  email: string;
  description: string;
  website: string;
  additionalInfo: string;
}

export default function JoinPage() {
  const [formData, setFormData] = useState<JoinFormData>({
    type: 'project',
    name: '',
    contact: '',
    phone: '',
    email: '',
    description: '',
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
              <span className="text-blue-600 font-medium">平台合作</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">加入平台</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              成为平台合作伙伴，共创AI产业未来。我们期待与您携手，共同推动AI产业的发展。
            </p>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧说明区域 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">合作方式</h3>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      项目入库
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        AI技术创新项目
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        产业应用项目
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        创业孵化项目
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      人才入库
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        AI技术专家
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        产业顾问
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        创业导师
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      投资人入库
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        风险投资
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        产业投资
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        天使投资
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      实验室入库
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        研究机构
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        企业实验室
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-100 rounded-full"></span>
                        联合实验室
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧表单区域 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">申请表单</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 入库类型选择 */}
                  <div className="group">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      入库类型
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 appearance-none bg-white"
                      required
                    >
                      <option value="project">项目入库</option>
                      <option value="talent">人才入库</option>
                      <option value="investor">投资人入库</option>
                      <option value="lab">实验室入库</option>
                      <option value="other">其他合作</option>
                    </select>
                  </div>

                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.type === 'talent' ? '姓名' :
                          formData.type === 'project' ? '项目名称' :
                            formData.type === 'investor' ? '机构名称' :
                              formData.type === 'lab' ? '实验室名称' : '名称'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                        联系人
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
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

                  {/* 描述信息 */}
                  <div className="group">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.type === 'talent' ? '个人简介' :
                        formData.type === 'project' ? '项目简介' :
                          formData.type === 'investor' ? '投资领域' :
                            formData.type === 'lab' ? '研究方向' : '合作意向'}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-200 resize-none"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      相关网站
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