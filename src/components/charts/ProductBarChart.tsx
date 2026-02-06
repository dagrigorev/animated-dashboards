import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Cell, ResponsiveContainer 
} from 'recharts';
import type { BarDataPoint, BarClickData, FilterKey } from '../../types/dashboard.types';
import { CustomTooltip } from './CustomTooltip';
import { ANIMATION_CONFIG, THEME_COLORS } from '../../constants/dashboard.constants';
import { allDashboardData } from '../../data/mockData';

interface ProductBarChartProps {
  data: BarDataPoint[];
  onBarClick: (filter: FilterKey) => void;
}

const axisStyle = {
  stroke: THEME_COLORS.muted,
  tick: { fill: THEME_COLORS.muted, fontSize: 12 },
};

export const ProductBarChart: React.FC<ProductBarChartProps> = ({ 
  data, 
  onBarClick 
}) => {
  const handleBarClick = (clickData: BarClickData) => {
    const productName = clickData?.name;
    if (productName && productName in allDashboardData) {
      onBarClick(productName as FilterKey);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="rgba(224, 224, 224, 0.1)" 
        />
        <XAxis type="number" {...axisStyle} />
        <YAxis type="category" dataKey="name" width={80} {...axisStyle} />
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
        />
        <Bar 
          dataKey="sales" 
          isAnimationActive
          animationDuration={ANIMATION_CONFIG.chart.duration + 200}
          onClick={(_, __, e) => {
            if (e && 'payload' in e) {
              handleBarClick(e.payload as BarClickData);
            }
          }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color} 
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
