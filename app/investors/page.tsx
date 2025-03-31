import SearchBar from '../components/SearchBar';
import FilterBar from '../components/InvestorFilterBar';
import InvestorCard from '../components/InvestorCard';

// 模拟投资者数据
const investors = [
  {
    id: 1,
    name: '创新资本',
    type: '风险投资',
    focus: ['AI技术', '硬科技', '医疗科技'],
    investment: '500万-5000万',
    stage: ['种子轮', '天使轮', 'A轮'],
    portfolio: ['AI芯片', '智能医疗', '机器人'],
  },
  {
    id: 2,
    name: '科技基金',
    type: '产业基金',
    focus: ['人工智能', '大数据', '云计算'],
    investment: '1000万-1亿',
    stage: ['A轮', 'B轮', 'C轮'],
    portfolio: ['AI平台', '数据分析', '云服务'],
  },
  {
    id: 3,
    name: '创业天使',
    type: '天使投资',
    focus: ['AI应用', '教育科技', '金融科技'],
    investment: '100万-1000万',
    stage: ['种子轮', '天使轮'],
    portfolio: ['AI教育', '智能金融', '数字营销'],
  },
];

export default function InvestorsPage() {
  return (
    <div className="space-y-8">
      {/* 搜索栏 */}
      <section>
        <SearchBar />
      </section>

      {/* 检索栏 */}
      <section>
        <FilterBar />
      </section>

      {/* 投资者展示区域 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((investor) => (
            <InvestorCard
              key={investor.id}
              name={investor.name}
              type={investor.type}
              focus={investor.focus}
              investment={investor.investment}
              stage={investor.stage}
              portfolio={investor.portfolio}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 