import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PieDataPoint } from '../../types/dashboard.types';
import { CustomTooltip } from './CustomTooltip';
import { ANIMATION_CONFIG } from '../../constants/dashboard.constants';

interface CategoryPieChartProps {
  data: PieDataPoint[];
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        paddingAngle={5}
        dataKey="value"
        isAnimationActive
        animationDuration={ANIMATION_CONFIG.pie.duration}
        animationBegin={0}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);
