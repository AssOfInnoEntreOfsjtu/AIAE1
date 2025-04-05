import { FilterProps } from '../../types';

interface LabFiltersProps extends Pick<FilterProps, 'selectedDepartment' | 'setSelectedDepartment' | 'selectedField' | 'setSelectedField' | 'departments' | 'researchFields'> { }

export default function LabFilters({
  selectedDepartment,
  setSelectedDepartment,
  selectedField,
  setSelectedField,
  departments,
  researchFields,
}: LabFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          按学院筛选
        </label>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedDepartment === dept
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          按研究方向筛选
        </label>
        <div className="flex flex-wrap gap-2">
          {researchFields.map((field) => (
            <button
              key={field}
              onClick={() => setSelectedField(field)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedField === field
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {field}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 