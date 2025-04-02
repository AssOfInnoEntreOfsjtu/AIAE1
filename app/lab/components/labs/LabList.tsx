import { motion } from 'framer-motion';
import { Lab } from '../../types';
import LabCard from './LabCard';

interface LabListProps {
  labs: Lab[];
  onJoin: (labId: string) => void;
}

export default function LabList({ labs, onJoin }: LabListProps) {
  return (
    <motion.div
      key="labs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {labs.map((lab, index) => (
        <motion.div
          key={lab.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <LabCard {...lab} onClick={() => onJoin(lab.id)} />
        </motion.div>
      ))}
    </motion.div>
  );
} 