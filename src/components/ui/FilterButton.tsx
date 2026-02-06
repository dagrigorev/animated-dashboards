import React from 'react';
import { motion } from 'framer-motion';

interface FilterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const buttonAnimations = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick, children }) => (
  <motion.button 
    className="filter-button" 
    onClick={onClick}
    {...buttonAnimations}
  >
    {children}
  </motion.button>
);
