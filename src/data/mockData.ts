import type { AllDataType, BarDataPoint, PieDataPoint } from '../types/dashboard.types';
import { generateTimeSeriesData } from '../utils/dataGenerators';
import { CHART_COLORS } from '../constants/dashboard.constants';

// =============================================================================
// Начальные данные для Bar Chart
// =============================================================================

export const initialBarData: BarDataPoint[] = [
  { name: 'Product A', sales: 4000, color: CHART_COLORS.purple },
  { name: 'Product B', sales: 3000, color: CHART_COLORS.green },
  { name: 'Product C', sales: 2000, color: CHART_COLORS.yellow },
  { name: 'Product D', sales: 2780, color: CHART_COLORS.orange },
  { name: 'Product E', sales: 1890, color: CHART_COLORS.blue },
];

// =============================================================================
// Начальные данные для Pie Chart
// =============================================================================

export const initialPieData: PieDataPoint[] = [
  { name: 'Electronics', value: 400, color: CHART_COLORS.blue },
  { name: 'Fashion', value: 300, color: CHART_COLORS.teal },
  { name: 'Groceries', value: 300, color: CHART_COLORS.amber },
  { name: 'Home Goods', value: 200, color: CHART_COLORS.orange },
];

// =============================================================================
// Все данные дашборда
// =============================================================================

export const allDashboardData: AllDataType = {
  "All": { 
    timeSeries: generateTimeSeriesData(20, 2000), 
    barData: initialBarData, 
    pieData: initialPieData, 
    stats: { revenue: 123456, users: 7890, orders: 4321, growth: 15 },
  },
  "Product A": { 
    timeSeries: generateTimeSeriesData(20, 1500), 
    barData: [initialBarData[0]], 
    pieData: [{ name: 'Electronics', value: 400, color: CHART_COLORS.blue }], 
    stats: { revenue: 45000, users: 2100, orders: 850, growth: 5 },
  },
  "Product B": { 
    timeSeries: generateTimeSeriesData(20, 1200), 
    barData: [initialBarData[1]], 
    pieData: [{ name: 'Fashion', value: 300, color: CHART_COLORS.teal }], 
    stats: { revenue: 32000, users: 1500, orders: 600, growth: 8 },
  },
  "Product C": { 
    timeSeries: generateTimeSeriesData(20, 800), 
    barData: [initialBarData[2]], 
    pieData: [{ name: 'Groceries', value: 300, color: CHART_COLORS.amber }], 
    stats: { revenue: 21000, users: 950, orders: 400, growth: -2 },
  },
  "Product D": { 
    timeSeries: generateTimeSeriesData(20, 1000), 
    barData: [initialBarData[3]], 
    pieData: [{ name: 'Home Goods', value: 250, color: CHART_COLORS.orange }], 
    stats: { revenue: 29000, users: 1100, orders: 480, growth: 12 },
  },
  "Product E": { 
    timeSeries: generateTimeSeriesData(20, 700), 
    barData: [initialBarData[4]], 
    pieData: [{ name: 'Electronics', value: 150, color: CHART_COLORS.blue }], 
    stats: { revenue: 19500, users: 800, orders: 320, growth: 3 },
  },
};
