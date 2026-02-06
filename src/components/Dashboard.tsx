import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnimatePresence, type Variants } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { DashboardHeader } from './DashboardHeader';
import { StatsGrid } from './StatsGrid';
import { Card, CardTitle } from './ui/Card';
import { CardSkeleton } from './ui/CardSkeleton';
import { FilterButton } from './ui/FilterButton';
import { SalesLineChart } from './charts/SalesLineChart';
import { ProductBarChart } from './charts/ProductBarChart';
import { CategoryPieChart } from './charts/CategoryPieChart';
import type { VisibleSeries } from '../types/dashboard.types';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// =============================================================================
// Loading Skeleton View
// =============================================================================

const DashboardSkeleton: React.FC = () => (
  <div className="dashboard-container">
    <DashboardHeader title="Loading Dashboard..." isLoading />
    <div className="stats-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} className="stat-card" />
      ))}
    </div>
    <CardSkeleton className="line-chart-card" />
    <CardSkeleton className="bar-chart-card" />
    <CardSkeleton className="pie-chart-card" />
  </div>
);

// =============================================================================
// Main Dashboard Component
// =============================================================================

export const Dashboard: React.FC = () => {
  const {
    loading,
    data,
    pieData,
    activeFilter,
    visibleSeries,
    handleFilterChange,
    toggleSeriesVisibility,
  } = useDashboardData();

  if (loading) {
    return <DashboardSkeleton />;
  }

  const isFilterActive = activeFilter !== "All";
  const chartSubtitle = isFilterActive ? '' : ' - Live updating';

  return (
    <div className="dashboard-container">
      <DashboardHeader 
        title="Interactive Data Dashboard"
        subtitle="Click on the bar chart items or filter buttons to update the view."
      />
      
      {/* Filter Controls */}
      <div className="filters">
        <AnimatePresence>
          {isFilterActive && (
            <FilterButton onClick={() => handleFilterChange("All")}>
              ← Show All Products
            </FilterButton>
          )}
        </AnimatePresence>
      </div>

      {/* Statistics Grid */}
      <StatsGrid stats={data.stats} />

      {/* Line Chart */}
      <Card className="line-chart-card" variants={itemVariants}>
        <CardTitle>
          Real-time Sales Data ({activeFilter})
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted-color)' }}>
            {chartSubtitle}
          </span>
        </CardTitle>
        <SalesLineChart 
          data={data.timeSeries}
          visibleSeries={visibleSeries}
          onLegendClick={(key: keyof VisibleSeries) => toggleSeriesVisibility(key)}
        />
      </Card>
      
      {/* Bar Chart */}
      <Card className="bar-chart-card" variants={itemVariants}>
        <CardTitle>Product Sales (Click to filter)</CardTitle>
        <ProductBarChart 
          data={data.barData}
          onBarClick={handleFilterChange}
        />
      </Card>

      {/* Pie Chart */}
      <Card className="pie-chart-card" variants={itemVariants}>
        <CardTitle>Category Distribution</CardTitle>
        <CategoryPieChart data={pieData} />
      </Card>
    </div>
  );
};
