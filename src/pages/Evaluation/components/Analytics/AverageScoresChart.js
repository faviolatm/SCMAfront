// src/pages/Evaluation/components/Analytics/AverageScoresChart.jsx
import React, { useState } from 'react';

const AverageScoresChart = ({ data, loading }) => {
  const [sortBy, setSortBy] = useState('avg_score'); // 'avg_score' | 'evaluations_count' | 'name'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  if (loading) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-gray-400">No average scores data available</p>
      </div>
    );
  }

  // Ordenar datos
  const sortedData = [...data].sort((a, b) => {
    let aValue, bValue;
    
    if (sortBy === 'name') {
      aValue = a.category_name.toLowerCase();
      bValue = b.category_name.toLowerCase();
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    aValue = a[sortBy];
    bValue = b[sortBy];
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const maxScore = 5;

  const getScoreColor = (score) => {
    if (score <= 1) return {
      gradient: 'from-red-600 to-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500',
      text: 'text-red-400'
    };
    if (score <= 2) return {
      gradient: 'from-orange-600 to-orange-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500',
      text: 'text-orange-400'
    };
    if (score <= 3) return {
      gradient: 'from-yellow-600 to-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500',
      text: 'text-yellow-400'
    };
    if (score <= 4) return {
      gradient: 'from-blue-600 to-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500',
      text: 'text-blue-400'
    };
    return {
      gradient: 'from-green-600 to-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500',
      text: 'text-green-400'
    };
  };

  const getMaturityLabel = (score) => {
    if (score <= 1) return 'Critical';
    if (score <= 2) return 'Low';
    if (score <= 3) return 'Moderate';
    if (score <= 4) return 'Good';
    return 'Excellent';
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'avg_score' ? 'asc' : 'desc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return (
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Calcular estadísticas generales
  const totalEvaluations = data.reduce((sum, cat) => sum + cat.evaluations_count, 0);
  const overallAvg = data.reduce((sum, cat) => sum + cat.avg_score, 0) / data.length;

  return (
    <div className="bg-gray-800/50 border-2 border-cyan-500 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 p-6 border-b border-cyan-500/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Average Scores by Category</h3>
              <p className="text-cyan-300 text-sm">
                Overall maturity assessment across all categories
              </p>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Sort by:</span>
            <button
              onClick={() => handleSort('avg_score')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
                sortBy === 'avg_score'
                  ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500'
                  : 'bg-gray-700 text-gray-400 border-2 border-gray-600 hover:border-gray-500'
              }`}
            >
              Score
              <SortIcon field="avg_score" />
            </button>
            <button
              onClick={() => handleSort('evaluations_count')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
                sortBy === 'evaluations_count'
                  ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500'
                  : 'bg-gray-700 text-gray-400 border-2 border-gray-600 hover:border-gray-500'
              }`}
            >
              Count
              <SortIcon field="evaluations_count" />
            </button>
            <button
              onClick={() => handleSort('name')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
                sortBy === 'name'
                  ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500'
                  : 'bg-gray-700 text-gray-400 border-2 border-gray-600 hover:border-gray-500'
              }`}
            >
              Name
              <SortIcon field="name" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-cyan-500/10 border border-cyan-500 rounded-lg p-3">
            <p className="text-cyan-300 text-xs font-semibold mb-1">Total Categories</p>
            <p className="text-cyan-400 text-2xl font-bold">{data.length}</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500 rounded-lg p-3">
            <p className="text-cyan-300 text-xs font-semibold mb-1">Total Evaluations</p>
            <p className="text-cyan-400 text-2xl font-bold">{totalEvaluations}</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500 rounded-lg p-3">
            <p className="text-cyan-300 text-xs font-semibold mb-1">Overall Average</p>
            <p className="text-cyan-400 text-2xl font-bold">{overallAvg.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Chart with Scroll */}
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6 space-y-4">
        {sortedData.map((category, index) => {
          const percentage = (category.avg_score / maxScore) * 100;
          const colors = getScoreColor(category.avg_score);
          const maturityLabel = getMaturityLabel(category.avg_score);

          return (
            <div key={category.category_id} className="group">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-white font-semibold text-sm truncate">
                    {category.category_name}
                  </span>
                  <span className="text-gray-500 text-xs flex-shrink-0">
                    ({category.evaluations_count} eval{category.evaluations_count !== 1 ? 's' : ''})
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Maturity Badge */}
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {maturityLabel}
                  </span>

                  {/* Score */}
                  <span className={`text-lg font-bold ${colors.text}`}>
                    {category.avg_score.toFixed(2)}
                  </span>

                  {/* Range */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span className="font-semibold">{category.lowest_score}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="font-semibold">{category.highest_score}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-10 bg-gray-700 rounded-lg overflow-hidden">
                {/* Full bar background with markers */}
                <div className="absolute inset-0 flex">
                  {[1, 2, 3, 4].map((marker) => (
                    <div
                      key={marker}
                      className="border-r border-gray-600"
                      style={{ width: '20%' }}
                    />
                  ))}
                </div>

                {/* Colored progress */}
                <div
                  className={`relative h-full bg-gradient-to-r ${colors.gradient} transition-all duration-700 ease-out flex items-center justify-between px-4 group-hover:opacity-90`}
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 15 && (
                    <>
                      <span className="text-white text-sm font-semibold">
                        {category.avg_score.toFixed(2)} / 5.00
                      </span>
                      {category.std_deviation > 0 && (
                        <span className="text-white text-xs">
                          σ: {category.std_deviation.toFixed(2)}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Hover tooltip */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 pointer-events-none">
                  <div className="text-center">
                    <p className="text-white text-sm font-semibold">
                      Range: {category.lowest_score} - {category.highest_score}
                    </p>
                    <p className="text-gray-300 text-xs">
                      Std Dev: {category.std_deviation.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Showing {sortedData.length} categories • Sorted by {sortBy === 'avg_score' ? 'Average Score' : sortBy === 'evaluations_count' ? 'Evaluation Count' : 'Name'} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
          </p>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-400">σ = Standard Deviation</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">Hover for details</span>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }
      `}</style>
    </div>
  );
};

export default AverageScoresChart;