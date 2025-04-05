'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfoCard from './components/InfoCard';
import InfoFilter from './components/InfoFilter';
import PolicyDetail from './components/PolicyDetail';

interface InfoItem {
  id: string;
  title: string;
  date: string;
  type: 'activity' | 'lecture' | 'course' | 'policy';
  subType?: 'support' | 'subsidy' | 'competition' | 'salon' | 'tech' | 'startup' | 'basic' | 'advanced' | 'experience' | 'practical';
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  location?: string;
  capacity?: number;
  registered?: number;
  price?: number;
  tags?: string[];
  image: string;
  source?: string;
  link?: string;
}

interface InfoData {
  activities: InfoItem[];
  lectures: InfoItem[];
  courses: InfoItem[];
  policies: InfoItem[];
}

// 模拟数据
const mockData: InfoData = {
  activities: [
    {
      id: '1',
      title: '第十九届“挑战杯”全国大学生课外学术科技作品竞赛',
      date: '2025-4~5月',
      type: 'activity' as const,
      subType: 'competition' as const,
      description: '为全面贯彻党的二十大和二十届二中、三中全会精神，深入贯彻全国科技大会和全国教育大会精神，一体推进教育发展、科技创新、人才培养,为首都国际科技创新中心建设贡献青春力量。',
      status: 'upcoming' as const,
      location: '各大高校',
      price: 0,
      tags: ['挑战杯', '创新', '竞赛'],
      image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.rYiSU2mQx4JyVyt47mYiAQHaDJ?w=295&h=148&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      id: '2',
      title: '创业沙龙',
      date: '2025-03-30',
      type: 'activity' as const,
      subType: 'salon' as const,
      description: '创业者交流分享会，探讨AI创业机会，分享创业经验，对接投资资源。',
      status: 'completed' as const,
      location: '学生创新中心',
      capacity: 50,
      registered: 30,
      price: 0,
      tags: ['创业', 'AI', '投资'],
      image: 'https://img1.baidu.com/it/u=2882112245,2253310932&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
    },
  ],
  lectures: [
    {
      id: '3',
      title: '大学生创新创业实践大赛',
      date: '2025-3~10月',
      type: 'activity' as const,
      subType: 'competition' as const,
      description: '“大学生创新创业训练计划项目”，是教育部在“十二五”期间实施的国家级大学生创新创业训练计划。该计划旨在通过创新训练项目、创业训练项目和创业实践项目，培养学生的创新思维和创业能力。',
      status: 'ongoing' as const,
      location: '各大高校',
      price: 0,
      tags: ['创新', '创业', '技术实践'],
      image: 'https://cxcy.jisu.edu.cn/__local/D/33/D2/C1861EDAFE92396D6D6F2AC4D0C_E3B82A86_12995.jpg',
    },
    {
      id: '4',
      title: '创业经验分享',
      date: '2025-03-25',
      type: 'lecture' as const,
      subType: 'experience' as const,
      description: '成功创业者分享创业历程和经验，包括团队组建、产品开发、市场推广等关键环节。',
      status: 'completed' as const,
      location: '深圳科技园',
      capacity: 100,
      registered: 100,
      price: 0,
      tags: ['创业', '经验', '分享'],
      image: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.M0YtC2w2eyfV4MdSW-1wCAHaCf?w=322&h=117&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
  ],
  courses: [
    {
      id: '5',
      title: 'AI基础课程',
      date: '2024-04-10',
      type: 'course' as const,
      subType: 'basic' as const,
      description: '从零开始学习AI基础知识，包括机器学习、深度学习、神经网络等核心概念。',
      status: 'upcoming' as const,
      location: '线上课程',
      capacity: 500,
      registered: 200,
      price: 299,
      tags: ['AI', '课程', '零基础入门'],
      image: 'https://img2.baidu.com/it/u=740714593,3285256935&fm=253&fmt=auto&app=120&f=JPEG?w=902&h=500',
    },
    {
      id: '6',
      title: '创业实战课程',
      date: '2024-03-20',
      type: 'course' as const,
      subType: 'practical' as const,
      description: '创业必备知识和技能培训，包括商业计划书撰写、融资技巧、团队管理等。',
      status: 'ongoing' as const,
      location: '线上课程',
      capacity: 300,
      registered: 250,
      price: 499,
      tags: ['创业', '课程', '实战'],
      image: 'https://img1.baidu.com/it/u=996486549,2884148576&fm=253&fmt=auto&app=138&f=JPEG?w=585&h=352',
    },
  ],
  policies: [
    {
      id: 'p1',
      title: '创业担保贷款贴息',
      date: '2024-05-31',
      type: 'policy',
      subType: 'subsidy',
      description: '一、贴息范围：对以创业者个人或创业组织为借款人，由上海创业担保贷款担保资金提供担保，由经办银行发放，用于支持个人创业或创业组织扩大就业的创业担保贷款，由本市财政部门给予一定的利息补贴。根据《上海市创业担保贷款实施办法》（沪财发〔2024〕4 号），具体包括个人创业担保贷款、创业组织创业担保贷款、创业前创业担保贷款3 个品种，以及创业担保资金运营管理机构与经办银行合作推出的相关专项创业担保贷款产品。二、贴息条件：借款人按期归还贷款本息的（含提前还款），可以申请利息补贴。创业前创业担保贷款借款人须在获得贷款期限内在本市创办小微企业、民办非企业单位、农民合作社、个体工商户等各类创业组织。对展期、逾期、借新还旧的创业担保贷款不予贴息。对申请无还本续贷的，仅对按期偿还本息的续贷(含提前结清本息)给予贴息。三、贴息标准：自2024年5月31日（含）起，对于符合条件的创业担保贷款，按照贷款实际利率的50%进行贴息。同一借款人享受利息补贴政策累计不超过3 次。',
      status: 'ongoing',
      tags: ['创业', '贷款', '贴息', '补贴'],
      source: '上海市财政局',
      image: 'https://img0.baidu.com/it/u=533714853,3128384392&fm=253&fmt=auto&app=138&f=JPEG?w=437&h=300',
    },
    {
      id: 'p2',
      title: '创业组织创业担保贷款',
      date: '2024-05-31',
      type: 'policy',
      subType: 'subsidy',
      description: '一、办理依据：《上海市财政局、上海市人力资源和社会保障局、中国人民银行上海市分行关于印发修订后的上海市创业担保贷款实施办法的通知》（沪财发〔2024〕4号）《上海市财政局、中国人民银行上海市分行、上海市人力资源和社会保障局关于进一步做好本市创业担保贷款利息补贴工作的通知》（沪财发〔2024〕5 号）。二、申请对象：在本市注册经营的小微企业，民办非企业单位和农民合作社。三、申请条件：1. 创业组织应当建立财会核算管理制度，并依法进行税务登记；2. 申请人及组织法定代表人非人民法院认定的失信被执行人，且无影响偿债能力的不良信用记录；3. 创业组织须吸纳本市劳动者就业，并应符合以下条件之一：（1）申请创业担保贷款前1年内新招用重点就业群体的人数达到创业组织现有在职职工人数10%(超过100人的创业组织达到5%)。（2）吸纳本市劳动者就业比例不低于15%(超过100人的创业组织不低于8%)。四、贷款金额：担保贷款金额最高为400万元。对其中符合本市产业发展方向的先导产业和重点产业的创业组织，创业担保贷款金额最高不超过500万元。五、贷款利率和期限：贷款利率上限不超过贷款市场报价利率（LPR）+50BP。担保贷款期限最长为2年。六、受理部门：可登陆上海市人力资源和社会保障自助经办系统线上申请，也可至创业组织注册所在地的区就业促进中心创业指导服务部门申请。',
      status: 'ongoing',
      tags: ['创业', '贷款', '担保', '小微企业'],
      image: 'https://img1.baidu.com/it/u=648978514,1432407220&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=300',
      source: '上海市财政局、上海市人力资源和社会保障局',
    },
    {
      id: 'p3',
      title: '创业团队孵化场地费补贴',
      date: '2024-01-01',
      type: 'policy',
      subType: 'subsidy',
      description: '一、办理依据：《上海市人力资源和社会保障局 上海市财政局 上海市教育委员会关于进一步完善本市创业扶持政策举措的通知》（沪人社规〔2023〕1号）。二、申请对象：经认定的市级创业孵化示范基地成功孵化的创业团队（含个人）。三、申请条件：1.创业团队入驻市级创业孵化示范基地孵化，签订书面孵化协议，并支付工位费用；2.创业团队负责人在孵化协议期内成功创办小微企业、个体工商户、民办非企业、农民专业合作社四类创业组织，且担任创业组织法定代表人（负责人）或合伙人。四、补贴标准：1.孵化场地费补贴以创业团队入孵之日起至创业组织注册登记之间实际承担的场地费为限，最长不超过6个月；2.每个团队补贴标准最高不超过10000元，补贴支付到创业组织单位账户。五、受理部门：入孵孵化基地所在地的区就业促进中心创业指导服务部门。六、特别提示：1.申请创业团队孵化场地费补贴政策须在创业组织注册登记之日起的6个月内提出；2.市级创业孵化示范基地摘牌后入孵的创业团队(含个人)不再享受本政策。',
      status: 'ongoing',
      tags: ['创业', '孵化', '补贴', '场地费'],
      image: 'https://img1.baidu.com/it/u=1418769983,1651946920&fm=253&fmt=auto&app=138&f=JPEG?w=833&h=500',
      source: '上海市人力资源和社会保障局',
    },
    {
      id: 'p4',
      title: '首次创业一次性补贴政策',
      date: '2024-01-01',
      type: 'policy',
      subType: 'subsidy',
      description: '一、办理依据：《上海市人力资源和社会保障局 上海市财政局 上海市教育委员会关于进一步完善本市创业扶持政策举措的通知》（沪人社规〔2023〕1号）。二、申请对象：1.具有本市户籍、毕业两年之内，且其教育经历可通过中国高等教育学生信息网验证的高校毕业生。2.具有本市户籍、并经本市人社部门认定的就业困难人员。三、申请条件：1.注册登记创业组织时，法定代表人或负责人应符合申请对象条件；2.申请对象在本市首次注册创办小微型企业、个体工商户、农民合作社、民办非企业单位等创业组织，且担任法定代表人或负责人；3.注册成功后经营满一年；4.创业组织按规定至少为一人缴纳城镇职工社会保险费满6个月，其缴费单位须与登记就业单位、申请补贴单位相一致。四、补贴标准：一次性补贴8000元。五、受理部门：可登陆上海市人力资源和社会保障自助经办系统线上申请，也可至创业组织注册所在地区就业促进中心创业指导服务部门提出申请。六、特别提示：1.同一法定代表人(负责人)只能享受一次该政策补贴；2.申请人应为创业组织注册登记时的法定代表人或负责人；3.申请首次创业一次性补贴政策须在创业组织注册登记之日起的18个月内提出；4.申请人需开通社会保障卡银行账户的金融功能。',
      status: 'ongoing',
      tags: ['创业', '补贴', '高校毕业生', '就业困难人员'],
      source: '上海市人力资源和社会保障局',
      image: 'https://img1.baidu.com/it/u=3924202752,2944531476&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500'
    },
  ]
};

export default function InfoPage() {
  const [filteredData, setFilteredData] = useState<InfoData>(mockData);
  const [selectedItem, setSelectedItem] = useState<InfoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredItems, setRegisteredItems] = useState<Set<string>>(new Set());

  const handleFilterChange = (filters: {
    type: string[];
    status: string[];
    dateRange: string;
    subType: string[];
  }) => {
    const { type, status, dateRange, subType } = filters;

    // 根据筛选条件过滤数据
    const newData: InfoData = {
      activities: mockData.activities.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
      lectures: mockData.lectures.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
      courses: mockData.courses.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
      policies: mockData.policies.filter(item => {
        const matchesType = type.length === 0 || type.includes(item.type);
        const matchesStatus = status.length === 0 || status.includes(item.status);
        const matchesSubType = subType.length === 0 || (item.subType && subType.includes(item.subType as string));
        return matchesType && matchesStatus && matchesSubType;
      }),
    };

    setFilteredData(newData);
  };

  const handleItemClick = (item: InfoItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleRegister = (item: InfoItem) => {
    // 检查是否已报名
    if (registeredItems.has(item.id)) {
      return;
    }

    // 检查是否还有名额
    if (item.registered && item.capacity && item.registered >= item.capacity) {
      return;
    }

    // 更新报名状态
    setRegisteredItems(prev => {
      const newSet = new Set(prev);
      newSet.add(item.id);
      return newSet;
    });

    // 更新数据中的报名人数
    setFilteredData(prev => {
      const typeKey = `${item.type}s` as keyof InfoData;
      return {
        ...prev,
        [typeKey]: prev[typeKey].map(i =>
          i.id === item.id && i.registered !== undefined
            ? { ...i, registered: i.registered + 1 }
            : i
        ),
      };
    });

    // 显示成功提示
    alert('报名成功！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-20 right-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          />
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            信息中心
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            发现最新活动、讲座、课程和政策信息，助力创新创业
          </p>
        </motion.div>

        {/* 筛选器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <InfoFilter onFilterChange={handleFilterChange} />
        </motion.div>

        {/* 信息展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ...filteredData.activities,
            ...filteredData.lectures,
            ...filteredData.courses,
            ...filteredData.policies,
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300 hover:shadow-xl"
            >
              <InfoCard
                {...item}
                onClick={() => handleItemClick(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 详情模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-8">
                {selectedItem.type === 'policy' && selectedItem.subType && (selectedItem.subType === 'support' || selectedItem.subType === 'subsidy') ? (
                  <PolicyDetail
                    title={selectedItem.title}
                    date={selectedItem.date}
                    source={selectedItem.source || '政策解读'}
                    type={selectedItem.subType as 'support' | 'subsidy'}
                    description={selectedItem.description}
                    link={selectedItem.link || '#'}
                    onClose={() => setIsModalOpen(false)}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">{selectedItem.title}</h2>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        ✕
                      </motion.button>
                    </div>
                    <div className="space-y-6">
                      <p className="text-gray-600 text-lg leading-relaxed">{selectedItem.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags?.map((tag: string, index: number) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500">📅</span>
                          <span className="font-medium">日期：</span>
                          {selectedItem.date}
                        </div>
                        {selectedItem.location && (
                          <div className="flex items-center gap-2">
                            <span className="text-purple-500">📍</span>
                            <span className="font-medium">地点：</span>
                            {selectedItem.location}
                          </div>
                        )}
                        {selectedItem.capacity && (
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">👥</span>
                            <span className="font-medium">名额：</span>
                            {selectedItem.registered}/{selectedItem.capacity}
                          </div>
                        )}
                        {selectedItem.price !== undefined && (
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">💰</span>
                            <span className="font-medium">价格：</span>
                            {selectedItem.price === 0 ? '免费' : `¥${selectedItem.price}`}
                          </div>
                        )}
                      </div>
                      {selectedItem.status === 'upcoming' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-4 border-t border-gray-100"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleRegister(selectedItem);
                              setIsModalOpen(false);
                            }}
                            disabled={Boolean(registeredItems.has(selectedItem.id)) || Boolean(selectedItem.registered && selectedItem.capacity && selectedItem.registered >= selectedItem.capacity)}
                            className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300
                              ${registeredItems.has(selectedItem.id)
                                ? 'bg-green-500 cursor-not-allowed'
                                : selectedItem.registered && selectedItem.capacity && selectedItem.registered >= selectedItem.capacity
                                  ? 'bg-gray-500 cursor-not-allowed'
                                  : 'bg-blue-500 hover:bg-blue-600'
                              }`}
                          >
                            {registeredItems.has(selectedItem.id)
                              ? '已报名'
                              : selectedItem.registered && selectedItem.capacity && selectedItem.registered >= selectedItem.capacity
                                ? '名额已满'
                                : '立即报名'}
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}