// src/pages/Evaluation/components/Analytics/LowScoresOverview.jsx
import React from 'react';

const LowScoresOverview = ({ data, loading, threshold }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 border-2 border-red-500/50 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-400">No low scores data available</p>
      </div>
    );
  }

  const stats = [
    {
      label: 'Categories Affected',
      value: data.categories_with_low_scores,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      label: 'Total Low Score Instances',
      value: data.total_low_score_instances,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: 'Average Low Score',
      value: data.avg_low_score.toFixed(2),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Lowest Score Found',
      value: data.lowest_score,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      color: 'text-red-500',
      bgColor: 'bg-red-600/10'
    },
    {
      label: 'Evaluations with Low Scores',
      value: data.evaluations_with_low_scores,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-2 border-red-500 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Low Scores Alert</h3>
            <p className="text-red-300 text-sm">
              Categories scoring ≤ {threshold} require immediate attention
            </p>
          </div>
        </div>

        {/* Threshold Badge */}
        <div className="px-4 py-2 bg-red-500/20 border-2 border-red-500 rounded-lg">
          <p className="text-xs text-red-300 font-semibold">THRESHOLD</p>
          <p className="text-2xl font-bold text-red-400">≤ {threshold}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-gray-400 text-xs font-medium">
                {stat.label}
              </p>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Warning Message */}
      {data.total_low_score_instances > 0 && (
        <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-300 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Action Required:</span>
            {data.total_low_score_instances} low score instance{data.total_low_score_instances !== 1 ? 's' : ''} detected across {data.categories_with_low_scores} categor{data.categories_with_low_scores !== 1 ? 'ies' : 'y'}.
          </p>
        </div>
      )}
    </div>
  );
};

export default LowScoresOverview;