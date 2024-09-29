// components/ProjectTile.tsx

"use client";

import { motion } from 'framer-motion';

interface ProjectProps {
  project: {
    id: number;
    title: string;
    link: string;
  };
}

const ProjectTile: React.FC<ProjectProps> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-purple-900 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg border border-purple-500 cursor-pointer transition-all duration-300 hover:bg-purple-800 hover:bg-opacity-50"
    >
      <h2 className="text-3xl font-bold text-purple-200 text-center">{project.title}</h2>
    </motion.div>
  );
};

export default ProjectTile;
