import type { TimeSeriesDataPoint } from '../types/dashboard.types';

/**
 * Генерирует данные временного ряда с синусоидальным паттерном
 */
export const generateTimeSeriesData = (
  numPoints: number, 
  factor: number
): TimeSeriesDataPoint[] => {
  return Array.from({ length: numPoints }, (_, i) => ({
    name: `T-${numPoints - i}`,
    uv: Math.floor(Math.sin(i / 2) * factor + Math.random() * (factor / 2) + factor),
    pv: Math.floor(Math.cos(i / 1.5) * factor + Math.random() * (factor / 2) + factor),
  })).reverse();
};

/**
 * Генерирует новую точку данных для real-time обновления
 */
export const generateNewDataPoint = (): TimeSeriesDataPoint => ({
  name: `T+${Math.floor(Math.random() * 10)}`,
  uv: Math.floor(Math.sin(Date.now() / 1000) * 2000 + Math.random() * 1000 + 2000),
  pv: Math.floor(Math.cos(Date.now() / 1500) * 2000 + Math.random() * 1000 + 2000),
});

/**
 * Форматирует число с разделителями тысяч
 */
export const formatNumber = (value: number | string | undefined): string => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return String(value ?? '');
};
