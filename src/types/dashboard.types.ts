// =============================================================================
// Типы данных для графиков
// =============================================================================

export interface TimeSeriesDataPoint {
  name: string;
  uv: number;
  pv: number;
}

export interface BarDataPoint {
  name: string;
  sales: number;
  color: string;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

// =============================================================================
// Типы для статистики и дашборда
// =============================================================================

export interface DashboardStats {
  revenue: number;
  users: number;
  orders: number;
  growth: number;
}

export interface DashboardData {
  timeSeries: TimeSeriesDataPoint[];
  barData: BarDataPoint[];
  pieData: PieDataPoint[];
  stats: DashboardStats;
}

// =============================================================================
// Типы фильтров
// =============================================================================

export type FilterKey = 
  | 'All' 
  | 'Product A' 
  | 'Product B' 
  | 'Product C' 
  | 'Product D' 
  | 'Product E';

export type AllDataType = Record<FilterKey, DashboardData>;

// =============================================================================
// Типы для видимости серий графика
// =============================================================================

export interface VisibleSeries {
  uv: boolean;
  pv: boolean;
}

// =============================================================================
// Типы для Recharts (кастомные, т.к. встроенные проблемные)
// =============================================================================

export interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

export interface LegendPayloadItem {
  value?: string;
  id?: string;
  type?: string;
  color?: string;
  dataKey?: string;
}

export interface BarClickData {
  name?: string;
  sales?: number;
  color?: string;
  [key: string]: unknown;
}

// =============================================================================
// Типы для конфигурации статистических карточек
// =============================================================================

export interface StatCardConfig {
  id: string;
  title: string;
  getValue: (stats: DashboardStats) => number;
  prefix?: string;
  suffix?: string;
  getColor?: (value: number) => string;
}
