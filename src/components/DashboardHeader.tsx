import React from 'react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle, 
  isLoading = false 
}) => (
  <motion.div 
    className="header" 
    initial={{ opacity: 0, y: -20 }} 
    animate={{ opacity: 1, y: 0 }}
  >
    <h1>{title}</h1>
    {isLoading ? (
      <p 
        className="skeleton-text" 
        style={{ width: '30%', margin: '0.5rem auto 0' }} 
      />
    ) : (
      subtitle && <p>{subtitle}</p>
    )}
  </motion.div>
);
