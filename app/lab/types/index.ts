export interface Lab {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  department: string;
  director: string;
  researchAreas: string[];
  achievementCount: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  lab: string;
  department: string;
  status: '进行中' | '已完成' | '计划中';
  startDate: string;
  endDate: string;
  progress: number;
  team: string[];
  tags: string[];
}

export interface FilterProps {
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedField: string;
  setSelectedField: (value: string) => void;
  selectedTag: string;
  setSelectedTag: (value: string) => void;
  departments: string[];
  researchFields: string[];
  projectTags: string[];
} 