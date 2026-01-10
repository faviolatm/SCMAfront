// src/pages/Evaluation/components/EvaluationHome/Analytics/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import AnalyticsService from '../../services/AnalyticsService';

// Importar todos los componentes
import OverviewCards from './components/Analytics/OverviewCards';
import AnalyticsFilters from './components/Analytics/AnalyticsFilters';
import LowScoresTable from './components/Analytics/LowScoresTable';
import AverageScoresChart from './components/Analytics/AverageScoresChart';
import BusinessUnitChart from './components/Analytics/BusinessUnitChart';
import RegionChart from './components/Analytics/RegionChart';
import CompletionTrendChart from './components/Analytics/CompletionTrendChart';
import TopPerformersTable from './components/Analytics/TopPerformersTable';

const AnalyticsDashboard = () => {
  // States para los datos
  const [overviewData, setOverviewData] = useState(null);
  const [lowScoresData, setLowScoresData] = useState([]);
  const [avgScoresData, setAvgScoresData] = useState([]);
  const [buData, setBuData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [performersData, setPerformersData] = useState([]);

  // States para loading
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingLowScores, setLoadingLowScores] = useState(true);
  const [loadingAvgScores, setLoadingAvgScores] = useState(true);
  const [loadingBU, setLoadingBU] = useState(true);
  const [loadingRegion, setLoadingRegion] = useState(true);
  const [loadingTrend, setLoadingTrend] = useState(true);
  const [loadingPerformers, setLoadingPerformers] = useState(true);

  // Filtros activos
  const [filters, setFilters] = useState({
    businessUnit: '',
    region: ''
  });

  // Cargar datos iniciales (sin filtros)
  useEffect(() => {
    loadOverviewData();
    loadBusinessUnitData();
    loadRegionData();
    loadCompletionTrendData();
    loadTopPerformersData();
  }, []);

  // Cargar datos con filtros
  useEffect(() => {
    loadLowScoresData();
    loadAverageScoresData();
  }, [filters]);

  // ========================================
  // Funciones de carga de datos
  // ========================================

  const loadOverviewData = async () => {
    try {
      setLoadingOverview(true);
      const data = await AnalyticsService.getOverview();
      setOverviewData(data);
    } catch (error) {
      console.error('Error loading overview:', error);
    } finally {
      setLoadingOverview(false);
    }
  };

  const loadLowScoresData = async () => {
    try {
      setLoadingLowScores(true);
      const data = await AnalyticsService.getLowScores(
        2, 
        filters.businessUnit || null, 
        filters.region || null
      );
      setLowScoresData(data);
    } catch (error) {
      console.error('Error loading low scores:', error);
    } finally {
      setLoadingLowScores(false);
    }
  };

  const loadAverageScoresData = async () => {
    try {
      setLoadingAvgScores(true);
      const data = await AnalyticsService.getAverageScores(
        filters.businessUnit || null, 
        filters.region || null
      );
      setAvgScoresData(data);
    } catch (error) {
      console.error('Error loading average scores:', error);
    } finally {
      setLoadingAvgScores(false);
    }
  };

  const loadBusinessUnitData = async () => {
    try {
      setLoadingBU(true);
      const data = await AnalyticsService.getByBusinessUnit();
      setBuData(data);
    } catch (error) {
      console.error('Error loading BU data:', error);
    } finally {
      setLoadingBU(false);
    }
  };

  const loadRegionData = async () => {
    try {
      setLoadingRegion(true);
      const data = await AnalyticsService.getByRegion();
      setRegionData(data);
    } catch (error) {
      console.error('Error loading region data:', error);
    } finally {
      setLoadingRegion(false);
    }
  };

  const loadCompletionTrendData = async () => {
    try {
      setLoadingTrend(true);
      const data = await AnalyticsService.getCompletionTrend(30);
      setTrendData(data);
    } catch (error) {
      console.error('Error loading trend data:', error);
    } finally {
      setLoadingTrend(false);
    }
  };

  const loadTopPerformersData = async () => {
    try {
      setLoadingPerformers(true);
      const data = await AnalyticsService.getTopPerformers(10);
      setPerformersData(data);
    } catch (error) {
      console.error('Error loading performers data:', error);
    } finally {
      setLoadingPerformers(false);
    }
  };

  // Handler para cambio de filtros
  const handleFilterChange = (newFilters) => {
    console.log('📊 Filters changed:', newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">
            Comprehensive insights and performance metrics
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => {
            loadOverviewData();
            loadLowScoresData();
            loadAverageScoresData();
            loadBusinessUnitData();
            loadRegionData();
            loadCompletionTrendData();
            loadTopPerformersData();
          }}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-400 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Overview Cards */}
      <OverviewCards data={overviewData} loading={loadingOverview} />

      {/* Filters */}
      <AnalyticsFilters onFilterChange={handleFilterChange} />

      {/* Low Scores Alert - Prioridad Alta */}
      <LowScoresTable 
        data={lowScoresData} 
        loading={loadingLowScores}
        filters={filters}
      />

      {/* Average Scores Chart */}
      <AverageScoresChart 
        data={avgScoresData} 
        loading={loadingAvgScores}
      />

      {/* Completion Trend */}
      <CompletionTrendChart 
        data={trendData} 
        loading={loadingTrend}
      />

      {/* Grid de 2 columnas para BU y Region */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BusinessUnitChart 
          data={buData} 
          loading={loadingBU}
        />
        <RegionChart 
          data={regionData} 
          loading={loadingRegion}
        />
      </div>

      {/* Top Performers */}
      <TopPerformersTable 
        data={performersData} 
        loading={loadingPerformers}
      />

      {/* Footer Info */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
        <p className="text-gray-400 text-sm text-center">
          <span className="font-semibold">Note:</span> All metrics are calculated from completed evaluations. 
          Data updates in real-time when new evaluations are submitted.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
