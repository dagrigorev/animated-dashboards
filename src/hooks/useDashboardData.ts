import { useState, useEffect, useCallback } from 'react';
import type {
    DashboardData,
    FilterKey,
    VisibleSeries,
    PieDataPoint
} from '../types/dashboard.types';
import { allDashboardData } from '../data/mockData';
import { generateNewDataPoint } from '../utils/dataGenerators';
import { TIMEOUTS } from '../constants/dashboard.constants';

interface UseDashboardDataReturn {
  loading: boolean;
  data: DashboardData;
  pieData: PieDataPoint[];
  activeFilter: FilterKey;
  visibleSeries: VisibleSeries;
  handleFilterChange: (filter: FilterKey) => void;
  toggleSeriesVisibility: (seriesKey: keyof VisibleSeries) => void;
}

/**
 * Хук для управления данными дашборда
 */
export const useDashboardData = (): UseDashboardDataReturn => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>(allDashboardData["All"]);
  const [pieData, setPieData] = useState<PieDataPoint[]>(allDashboardData["All"].pieData);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [visibleSeries, setVisibleSeries] = useState<VisibleSeries>({ 
    uv: true, 
    pv: true 
  });

  // Симуляция начальной загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, TIMEOUTS.initialLoad);
    
    return () => clearTimeout(timer);
  }, []);

  // Real-time обновление данных для линейного графика
  useEffect(() => {
    if (loading || activeFilter !== "All") return;

    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        timeSeries: [...prevData.timeSeries.slice(1), generateNewDataPoint()],
      }));
    }, TIMEOUTS.dataUpdate);

    return () => clearInterval(interval);
  }, [loading, activeFilter]);

  // Обработчик изменения фильтра
  const handleFilterChange = useCallback((filter: FilterKey) => {
    setActiveFilter(filter);
    setData(allDashboardData[filter]);
    
    // Анимированный переход для Pie Chart
    setTimeout(() => {
      setPieData(allDashboardData[filter].pieData);
    }, TIMEOUTS.pieTransition);
  }, []);

  // Переключение видимости серии графика
  const toggleSeriesVisibility = useCallback((seriesKey: keyof VisibleSeries) => {
    setVisibleSeries(prev => ({
      ...prev,
      [seriesKey]: !prev[seriesKey],
    }));
  }, []);

  return {
    loading,
    data,
    pieData,
    activeFilter,
    visibleSeries,
    handleFilterChange,
    toggleSeriesVisibility,
  };
};
