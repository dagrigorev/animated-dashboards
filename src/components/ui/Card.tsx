import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variants = defaultVariants 
}) => (
  <motion.div 
    className={`card ${className}`}
    variants={variants}
    initial="hidden"
    animate="visible"
  >
    {children}
  </motion.div>
);

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-title">{children}</div>
);
