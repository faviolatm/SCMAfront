// src/pages/Evaluation/components/Analytics/LowScoresByBU.jsx
import React from 'react';

const LowScoresByBU = ({ data, loading, threshold }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg mb-1">Excellent!</p>
        <p className="text-gray-400 text-sm">No Business Units with low scores</p>
      </div>
    );
  }

  // Encontrar el máximo para normalizar las barras
  const maxScore = Math.max(...data.map(d => d.total_low_scores));

  const getBarColor = (avgScore) => {
    if (avgScore <= 1) return 'from-red-600 to-red-500';
    if (avgScore <= 1.5) return 'from-orange-600 to-orange-500';
    if (avgScore <= 2) return 'from-yellow-600 to-yellow-500';
    return 'from-gray-600 to-gray-500';
  };

  const getTextColor = (avgScore) => {
    if (avgScore <= 1) return 'text-red-400';
    if (avgScore <= 1.5) return 'text-orange-400';
    if (avgScore <= 2) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-gray-800/50 border-2 border-blue-500 rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-5 border-b border-blue-500/50 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Low Scores by Business Unit</h3>
            <p className="text-blue-300 text-xs">Threshold ≤ {threshold}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-400">Critical (≤1)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-400">High (≤1.5)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-400">Medium (≤2)</span>
          </div>
        </div>
      </div>

      {/* Chart with Scroll */}
      <div className="flex-1 overflow-hidden">
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-5 space-y-4">
          {data.map((bu, index) => {
            const percentage = (bu.total_low_scores / maxScore) * 100;
            const barColor = getBarColor(bu.avg_low_score);
            const textColor = getTextColor(bu.avg_low_score);

            return (
              <div key={index} className="group">
                {/* BU Name and Stats */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-white font-semibold text-sm truncate">
                      {bu.business_unit}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({bu.categories_affected} categories)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-sm font-bold ${textColor}`}>
                      Avg: {bu.avg_low_score.toFixed(2)}
                    </span>
                    <span className="text-white font-bold text-sm">
                      {bu.total_low_scores}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${barColor} transition-all duration-500 ease-out flex items-center justify-between px-3 group-hover:opacity-90`}
                    style={{ width: `${percentage}%` }}
                  >
                    {/* Left side - Score indicator */}
                    {percentage > 20 && (
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {bu.lowest_score === 0 ? 'CRITICAL' : `Low: ${bu.lowest_score}`}
                      </span>
                    )}
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/80 pointer-events-none">
                    <span className="text-white text-xs font-semibold">
                      {bu.total_low_scores} low score{bu.total_low_scores !== 1 ? 's' : ''} • 
                      Lowest: {bu.lowest_score}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900/50 px-5 py-3 border-t border-gray-700 flex-shrink-0">
        <p className="text-gray-400 text-xs flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Showing {data.length} Business Unit{data.length !== 1 ? 's' : ''} with low scores
        </p>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </div>
  );
};

export default LowScoresByBU;