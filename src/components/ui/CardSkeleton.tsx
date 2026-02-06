import React from 'react';
import { motion } from 'framer-motion';

interface CardSkeletonProps {
  className?: string;
  height?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ 
  className = '', 
  height = 250 
}) => (
  <motion.div 
    className={`card skeleton ${className}`} 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
  >
    <div 
      className="card-title skeleton-text" 
      style={{ width: '40%' }} 
    />
    <div 
      style={{ 
        height: `${height}px`, 
        backgroundColor: 'var(--primary-color)', 
        borderRadius: '8px' 
      }} 
    />
  </motion.div>
);
