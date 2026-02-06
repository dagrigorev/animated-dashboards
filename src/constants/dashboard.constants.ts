import type { StatCardConfig } from '../types/dashboard.types';

// =============================================================================
// Цвета темы
// =============================================================================

export const THEME_COLORS = {
  accent: 'var(--accent-color)',
  secondary: 'var(--secondary-color)',
  muted: 'var(--text-muted-color)',
  background: 'var(--bg-color)',
  cardBackground: 'var(--card-bg-color)',
  border: 'var(--border-color)',
  primary: 'var(--primary-color)',
} as const;

// =============================================================================
// Цвета для графиков
// =============================================================================

export const CHART_COLORS = {
  purple: '#8884d8',
  green: '#82ca9d',
  yellow: '#ffc658',
  orange: '#ff8042',
  blue: '#0088FE',
  teal: '#00C49F',
  amber: '#FFBB28',
} as const;

// =============================================================================
// Конфигурация анимаций
// =============================================================================

export const ANIMATION_CONFIG = {
  spring: {
    damping: 40,
    stiffness: 300,
  },
  chart: {
    duration: 300,
  },
  pie: {
    duration: 800,
  },
  stagger: 0.1,
} as const;

// =============================================================================
// Таймауты
// =============================================================================

export const TIMEOUTS = {
  initialLoad: 2000,
  dataUpdate: 2500,
  pieTransition: 300,
} as const;

// =============================================================================
// Конфигурация статистических карточек
// =============================================================================

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    getValue: (stats) => stats.revenue,
    prefix: '$',
  },
  {
    id: 'users',
    title: 'Active Users',
    getValue: (stats) => stats.users,
  },
  {
    id: 'orders',
    title: 'Total Orders',
    getValue: (stats) => stats.orders,
  },
  {
    id: 'growth',
    title: 'Growth',
    getValue: (stats) => stats.growth,
    suffix: '%',
    getColor: (value) => value >= 0 ? THEME_COLORS.accent : THEME_COLORS.secondary,
  },
];

// =============================================================================
// Конфигурация линий графика
// =============================================================================

export const LINE_SERIES_CONFIG = [
  {
    dataKey: 'uv' as const,
    name: 'UV Visitors',
    color: THEME_COLORS.accent,
  },
  {
    dataKey: 'pv' as const,
    name: 'Page Views',
    color: THEME_COLORS.secondary,
  },
];
