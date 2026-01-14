// src/pages/Evaluation/AnalyticsDashboard.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAnalytics } from './hooks/useAnalytics';
import { useEvaluationList } from './hooks/useEvaluationList';

// Importar componentes
import OverviewCards from './components/Analytics/OverviewCards';
import AnalyticsFilters from './components/Analytics/AnalyticsFilters';
import LowScoresOverview from './components/Analytics/LowScoresOverview';
import LowScoresByCategory from './components/Analytics/LowScoresByCategory';
import LowScoresByBU from './components/Analytics/LowScoresByBU';
import LowScoresByRegion from './components/Analytics/LowScoresByRegion';
import LowScoresByBuilding from './components/Analytics/LowScoresByBuilding';
import AverageScoresChart from './components/Analytics/AverageScoresChart';
import ScoreDistributionChart from './components/Analytics/ScoreDistributionChart';

const AnalyticsDashboard = () => {
  const { currentUser } = useAuth();
  const { filterOptions } = useEvaluationList(); // Reutilizar filter options
  
  const {
    loading,
    threshold,
    filters,
    overview,
    lowScoresOverview,
    lowScoresByCategory,
    lowScoresByBU,
    lowScoresByRegion,
    lowScoresByBuilding,
    averageScores,
    scoreDistribution,
    updateFilter,
    clearFilters,
    updateThreshold,
    refreshAnalytics
  } = useAnalytics();

  return (
    <div className="space-y-6">
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
          onClick={refreshAnalytics}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-400 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg 
            className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Overview Cards */}
      <OverviewCards data={overview} loading={loading} />

      {/* Filters */}
      <AnalyticsFilters
        filters={filters}
        filterOptions={filterOptions}
        threshold={threshold}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        onThresholdChange={updateThreshold}
        userLevel={currentUser?.scma_level}
      />

      {/* 🔴 LOW SCORES SECTION - PRIORIDAD ALTA */}
      <div className="space-y-6">
        {/* Low Scores Overview - Cards de resumen */}
        <LowScoresOverview 
          data={lowScoresOverview} 
          loading={loading}
          threshold={threshold}
        />

        {/* Low Scores by Category - Top problemas */}
        <LowScoresByCategory 
          data={lowScoresByCategory} 
          loading={loading}
          threshold={threshold}
        />

        {/* Grid de 2 columnas: BU y Region */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LowScoresByBU 
            data={lowScoresByBU} 
            loading={loading}
            threshold={threshold}
          />
          <LowScoresByRegion 
            data={lowScoresByRegion} 
            loading={loading}
            threshold={threshold}
          />
        </div>

        {/* Low Scores by Building - Full width */}
        <LowScoresByBuilding 
          data={lowScoresByBuilding} 
          loading={loading}
          threshold={threshold}
        />
      </div>

      {/* Divider */}
      <div className="border-t-2 border-gray-700 my-8"></div>

      {/* 📊 GENERAL ANALYTICS SECTION */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">General Analytics</h3>

        {/* Score Distribution */}
        <ScoreDistributionChart 
          data={scoreDistribution} 
          loading={loading}
        />

        {/* Average Scores by Category */}
        <AverageScoresChart 
          data={averageScores} 
          loading={loading}
        />
      </div>

      {/* Footer Info */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-gray-300 text-sm font-semibold mb-1">About Analytics</p>
            <p className="text-gray-400 text-sm">
              All metrics are calculated from completed evaluations only. Data respects your permission level 
              (Level {currentUser?.scma_level}) and updates in real-time when new evaluations are submitted. 
              Low scores are categorized as scores ≤ {threshold}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;