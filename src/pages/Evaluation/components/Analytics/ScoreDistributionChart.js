// src/pages/Evaluation/components/Analytics/ScoreDistributionChart.jsx
import React from 'react';

const ScoreDistributionChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!data || !data.distribution) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-400">No score distribution data available</p>
      </div>
    );
  }

  const distribution = data.distribution;
  const total = data.total;

  // Calcular máximo para normalizar las barras
  const maxValue = Math.max(...Object.values(distribution));

  const scores = [
    { 
      score: '0', 
      label: 'Critical',
      description: 'No capability',
      color: 'from-red-600 to-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500',
      textColor: 'text-red-400',
      icon: '🔴'
    },
    { 
      score: '1', 
      label: 'Very Low',
      description: 'Initial awareness',
      color: 'from-orange-600 to-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-400',
      icon: '🟠'
    },
    { 
      score: '2', 
      label: 'Low',
      description: 'Basic implementation',
      color: 'from-yellow-600 to-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-400',
      icon: '🟡'
    },
    { 
      score: '3', 
      label: 'Moderate',
      description: 'Defined processes',
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-400',
      icon: '🔵'
    },
    { 
      score: '4', 
      label: 'Good',
      description: 'Managed & measured',
      color: 'from-green-600 to-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      textColor: 'text-green-400',
      icon: '🟢'
    },
    { 
      score: '5', 
      label: 'Excellent',
      description: 'Optimized',
      color: 'from-purple-600 to-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-400',
      icon: '🟣'
    }
  ];

  return (
    <div className="bg-gray-800/50 border-2 border-indigo-500 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-indigo-800/30 p-6 border-b border-indigo-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Score Distribution</h3>
              <p className="text-indigo-300 text-sm">
                Overall maturity level distribution across all completed evaluations
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-indigo-500/20 border-2 border-indigo-500 rounded-lg">
            <p className="text-xs text-indigo-300 font-semibold">TOTAL SCORES</p>
            <p className="text-2xl font-bold text-indigo-400">{total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="space-y-6">
          {scores.map((scoreData) => {
            const count = distribution[scoreData.score] || 0;
            const percentage = total > 0 ? ((count / total) * 100) : 0;
            const barWidth = maxValue > 0 ? ((count / maxValue) * 100) : 0;

            return (
              <div key={scoreData.score} className="group">
                {/* Score Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{scoreData.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${scoreData.textColor}`}>
                          Score {scoreData.score}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${scoreData.bgColor} ${scoreData.textColor} border ${scoreData.borderColor}`}>
                          {scoreData.label}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs">{scoreData.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${scoreData.textColor}`}>
                      {count.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs font-semibold">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-10 bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${scoreData.color} transition-all duration-700 ease-out flex items-center px-4 group-hover:opacity-90`}
                    style={{ width: `${barWidth}%` }}
                  >
                    {barWidth > 15 && (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-white text-sm font-semibold">
                          {count} score{count !== 1 ? 's' : ''}
                        </span>
                        <span className="text-white text-sm font-bold">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-center">
              <p className="text-red-400 text-xs font-semibold mb-1">Low Scores (0-2)</p>
              <p className="text-red-400 text-2xl font-bold">
                {(distribution['0'] + distribution['1'] + distribution['2']).toLocaleString()}
              </p>
              <p className="text-red-300 text-xs mt-1">
                {((((distribution['0'] + distribution['1'] + distribution['2']) / total) * 100) || 0).toFixed(1)}%
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4 text-center">
              <p className="text-blue-400 text-xs font-semibold mb-1">Moderate (3)</p>
              <p className="text-blue-400 text-2xl font-bold">
                {distribution['3'].toLocaleString()}
              </p>
              <p className="text-blue-300 text-xs mt-1">
                {(((distribution['3'] / total) * 100) || 0).toFixed(1)}%
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 text-center">
              <p className="text-green-400 text-xs font-semibold mb-1">High Scores (4-5)</p>
              <p className="text-green-400 text-2xl font-bold">
                {(distribution['4'] + distribution['5']).toLocaleString()}
              </p>
              <p className="text-green-300 text-xs mt-1">
                {((((distribution['4'] + distribution['5']) / total) * 100) || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDistributionChart;