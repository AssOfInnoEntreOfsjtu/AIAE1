import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    lab: string;
    department: string;
    status: string;
    startDate: string;
    endDate: string;
    progress: number;
    team: string[];
    tags: string[];
  }[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </div>
  );
} 