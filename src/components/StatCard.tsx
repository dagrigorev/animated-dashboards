import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { AnimatedCounter } from './ui/AnimatedCounter';
import type { StatCardConfig, DashboardStats } from '../types/dashboard.types';

interface StatCardProps {
  config: StatCardConfig;
  stats: DashboardStats;
  variants?: Variants;
}

export const StatCard: React.FC<StatCardProps> = ({ config, stats, variants }) => {
  const value = config.getValue(stats);
  const color = config.getColor?.(value);
  const prefix = config.id === 'growth' && value >= 0 ? '+' : '';

  return (
    <motion.div className="card stat-card" variants={variants}>
      <div className="card-title">{config.title}</div>
      <div className="stat-number" style={color ? { color } : undefined}>
        {config.prefix}
        {prefix}
        <AnimatedCounter value={value} />
        {config.suffix}
      </div>
    </motion.div>
  );
};
