import React from 'react';
import { motion } from 'framer-motion';

interface PolicyDetailProps {
  title: string;
  date: string;
  source: string;
  type: 'support' | 'subsidy';
  description: string;
  link: string;
  onClose: () => void;
}

const PolicyDetail: React.FC<PolicyDetailProps> = ({
  title,
  date,
  source,
  type,
  description,
  link,
  onClose,
}) => {
  const getPolicyBackground = () => {
    if (type === 'support') {
      return {
        title: 'AI产业扶持政策',
        background: '为促进AI产业发展，推动技术创新和产业升级，特制定本政策。政策旨在通过税收优惠、人才补贴、研发支持等措施，为AI企业提供全方位支持。',
        measures: [
          '对AI企业研发投入给予最高30%的税收优惠',
          '提供人才引进补贴，最高50万元/人',
          '支持建设AI研发平台，最高补贴1000万元',
          '设立AI产业发展基金，规模10亿元'
        ],
        conditions: [
          '企业注册地在本市范围内',
          '主营业务为AI技术研发或应用',
          '研发人员占比不低于30%',
          '上年度研发投入不低于100万元'
        ]
      };
    } else {
      return {
        title: '创业补贴政策',
        background: '为鼓励创新创业，支持初创企业发展，特制定本政策。政策通过创业补贴、场地补贴、社保补贴等措施，降低创业成本，提高创业成功率。',
        measures: [
          '创业补贴：一次性补贴5-10万元',
          '场地补贴：最高补贴面积500平方米，补贴期限3年',
          '社保补贴：补贴比例50%，期限2年',
          '创业培训补贴：最高补贴1万元/人'
        ],
        conditions: [
          '年龄在18-45周岁之间',
          '具有大专及以上学历',
          '首次创业且注册时间不超过3年',
          '带动就业人数不少于3人'
        ]
      };
    }
  };

  const policyInfo = getPolicyBackground();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {source}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              ✕
            </motion.button>
          </div>
        </div>
        <div className="text-gray-500 mb-4">
          <span className="mr-4">发布日期：{date}</span>
          <span>政策类型：{policyInfo.title}</span>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          查看原文
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">政策背景</h3>
          <p className="text-gray-600 leading-relaxed">{policyInfo.background}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">主要措施</h3>
          <ul className="space-y-2">
            {policyInfo.measures.map((measure, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-600"
              >
                <span className="text-blue-500 mr-2">•</span>
                {measure}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">申请条件</h3>
          <ul className="space-y-2">
            {policyInfo.conditions.map((condition, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-600"
              >
                <span className="text-green-500 mr-2">✓</span>
                {condition}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">申请流程</h3>
          <ol className="space-y-3">
            {[
              '准备申请材料（营业执照、财务报表等）',
              '在线提交申请',
              '材料审核（5个工作日）',
              '现场考察（如需要）',
              '公示（3个工作日）',
              '发放补贴'
            ].map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-600"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                  {index + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  );
};

export default PolicyDetail; 