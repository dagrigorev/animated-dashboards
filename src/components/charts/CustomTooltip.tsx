import React from 'react';
import type { CustomTooltipProps, TooltipPayloadItem } from '../../types/dashboard.types';
import { formatNumber } from '../../utils/dataGenerators';

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="custom-tooltip">
      <p className="tooltip-label">{label}</p>
      {payload.map((item: TooltipPayloadItem, index: number) => (
        <p key={index} style={{ color: item.color }}>
          {item.name}: {formatNumber(item.value)}
        </p>
      ))}
    </div>
  );
};
