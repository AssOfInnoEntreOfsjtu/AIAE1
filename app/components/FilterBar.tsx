'use client'; // 告诉Next.js这是一个客户端组件

import { useState } from 'react'; // 导入useState钩子，用于管理组件状态

// 定义FilterOption接口，用于描述过滤选项的结构
interface FilterOption {
  title: string; // 过滤选项的标题
  options: string[]; // 过滤选项的具体选项列表
}

// 定义过滤选项数组，包含多个过滤类别及其选项
const filters: FilterOption[] = [
  {
    title: '所属行业', // 所属行业的标题
    options: ['AI硬件', '硬科技', '教育', '金融', '其他'], // 所属行业的选项列表
  },
  {
    title: '创业阶段', // 创业阶段的标题
    options: ['创意阶段', '原形开发中', '种子轮筹备', '参赛项目', '已落地', '其他'], // 创业阶段的选项列表
  },
  {
    title: '项目类型', // 项目类型的标题
    options: ['科研转化', '学生创业', '校企合作', '社会创新'], // 项目类型的选项列表
  },
  {
    title: '资源需求', // 资源需求的标题
    options: ['资金需求', '实验室支持', '导师指导', '场地申请'], // 资源需求的选项列表
  },
  {
    title: '团队状态', // 团队状态的标题
    options: ['招募队友', '缺技术', '缺运营', '团队完整'], // 团队状态的选项列表
  },
];

// 定义FilterBar组件，这是一个用于过滤的工具栏
export default function FilterBar() {
  // 使用useState钩子定义activeFilter状态，用于记录当前激活的过滤器
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  // 使用useState钩子定义selectedOptions状态，用于记录每个过滤器的已选选项
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  // 切换过滤器激活状态的函数
  const toggleFilter = (title: string) => {
    // 如果当前激活的过滤器是同一个，则取消激活；否则，激活该过滤器
    setActiveFilter(activeFilter === title ? null : title);
  };

  // 切换选项选择状态的函数
  const toggleOption = (title: string, option: string) => {
    setSelectedOptions(prev => { // 更新selectedOptions状态
      const currentOptions = prev[title] || []; // 获取当前过滤器的已选选项，若无则为空数组
      const newOptions = currentOptions.includes(option) // 判断选项是否已被选中
        ? currentOptions.filter(opt => opt !== option) // 若已选，则从数组中移除该选项
        : [...currentOptions, option]; // 若未选，则添加到数组中
      return { ...prev, [title]: newOptions }; // 返回新的selectedOptions对象
    });
  };

  // 返回FilterBar组件的JSX结构
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-[140px] flex flex-col">
      {/* 主按钮区域，包含各个过滤器的主按钮 */}
      <div className="flex justify-center items-center gap-3 mb-4">
        {filters.map((filter) => ( // 遍历filters数组，为每个过滤器生成一个按钮
          <div key={filter.title} className="relative"> {/* 每个过滤器按钮的容器 */}
            <button
              onClick={() => toggleFilter(filter.title)} // 点击按钮时调用toggleFilter函数
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-base
                ${activeFilter === filter.title // 根据activeFilter状态动态设置按钮样式
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              <span className="font-medium">{filter.title}</span> {/* 显示过滤器的标题 */}
              {selectedOptions[filter.title]?.length > 0 && ( // 如果该过滤器有已选选项，则显示数字提示
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                  ${activeFilter === filter.title // 根据activeFilter状态动态设置提示样式
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {selectedOptions[filter.title].length} {/* 显示已选选项的数量 */}
                </span>
              )}
            </button>

            {/* 下拉菜单，当过滤器被激活时显示 */}
            {activeFilter === filter.title && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl z-10 border border-gray-100">
                <div className="p-3">
                  {filter.options.map((option) => ( // 遍历当前过滤器的选项列表
                    <label
                      key={option}
                      className="flex items-center space-x-4 p-4 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-150"
                    >
                      <input
                        type="checkbox" // 使用复选框作为选项选择的控件
                        checked={selectedOptions[filter.title]?.includes(option) || false} // 检查选项是否被选中
                        onChange={() => toggleOption(filter.title, option)} // 改变选项状态时调用toggleOption函数
                        className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium text-lg">{option}</span> {/* 显示选项的文本 */}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 已选择的选项展示区域 */}
      {Object.keys(selectedOptions).length > 0 && ( // 如果有已选选项，则显示该区域
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(selectedOptions).map(([title, options]) => // 遍历selectedOptions对象的键值对
              options.map((option) => ( // 遍历每个过滤器的已选选项列表
                <div
                  key={`${title}-${option}`} // 设置唯一的key值
                  className="group flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span>{option}</span> {/* 显示已选选项的文本 */}
                  <button
                    onClick={() => toggleOption(title, option)} // 点击“×”按钮时移除该选项
                    className="ml-2 text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    × {/* 删除选项的图标 */}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
