import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { StatCard } from './StatCard';
import type { DashboardStats } from '../types/dashboard.types';
import { STAT_CARDS_CONFIG, ANIMATION_CONFIG } from '../constants/dashboard.constants';

interface StatsGridProps {
  stats: DashboardStats;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: ANIMATION_CONFIG.stagger } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <motion.div 
    className="stats-grid" 
    variants={containerVariants} 
    initial="hidden" 
    animate="visible"
  >
    {STAT_CARDS_CONFIG.map((config) => (
      <StatCard 
        key={config.id} 
        config={config} 
        stats={stats} 
        variants={itemVariants}
      />
    ))}
  </motion.div>
);
