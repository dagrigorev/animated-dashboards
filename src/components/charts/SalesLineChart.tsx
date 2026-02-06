import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import type { TimeSeriesDataPoint, VisibleSeries, LegendPayloadItem } from '../../types/dashboard.types';
import { CustomTooltip } from './CustomTooltip';
import { LINE_SERIES_CONFIG, ANIMATION_CONFIG, THEME_COLORS } from '../../constants/dashboard.constants';

interface SalesLineChartProps {
  data: TimeSeriesDataPoint[];
  visibleSeries: VisibleSeries;
  onLegendClick: (seriesKey: keyof VisibleSeries) => void;
}

const axisStyle = {
  stroke: THEME_COLORS.muted,
  tick: { fill: THEME_COLORS.muted, fontSize: 12 },
};

export const SalesLineChart: React.FC<SalesLineChartProps> = ({ 
  data, 
  visibleSeries, 
  onLegendClick 
}) => {
  const handleLegendClick = (legendData: LegendPayloadItem) => {
    const dataKey = legendData?.dataKey;
    if (dataKey === 'uv' || dataKey === 'pv') {
      onLegendClick(dataKey);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="rgba(224, 224, 224, 0.1)" 
        />
        <XAxis dataKey="name" {...axisStyle} />
        <YAxis {...axisStyle} />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          onClick={(e) => handleLegendClick(e as unknown as LegendPayloadItem)}
          wrapperStyle={{ cursor: 'pointer', paddingTop: '10px' }}
        />
        
        {LINE_SERIES_CONFIG.map(({ dataKey, name, color }) => (
          visibleSeries[dataKey] && (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              name={name}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 6, stroke: THEME_COLORS.background, strokeWidth: 2 }}
              isAnimationActive
              animationDuration={ANIMATION_CONFIG.chart.duration}
            />
          )
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
