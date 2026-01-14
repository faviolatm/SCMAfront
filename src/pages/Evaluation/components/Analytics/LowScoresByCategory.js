// src/pages/Evaluation/components/Analytics/LowScoresByCategory.jsx
import React from 'react';

const LowScoresByCategory = ({ data, loading, threshold }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
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
        <p className="text-white font-semibold text-lg mb-1">Great News!</p>
        <p className="text-gray-400">No categories with scores ≤ {threshold} found</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score === 0) return 'text-red-500 bg-red-500/20 border-red-500';
    if (score === 1) return 'text-orange-500 bg-orange-500/20 border-orange-500';
    if (score === 2) return 'text-yellow-500 bg-yellow-500/20 border-yellow-500';
    return 'text-gray-400 bg-gray-500/20 border-gray-500';
  };

  const getSeverityLabel = (score) => {
    if (score === 0) return 'Critical';
    if (score === 1) return 'Severe';
    if (score === 2) return 'Low';
    return 'Below Avg';
  };

  return (
    <div className="bg-gray-800/50 border-2 border-orange-500 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 border-b border-orange-500/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Top Problem Categories</h3>
              <p className="text-orange-300 text-sm">
                Categories with the most low scores (threshold ≤ {threshold})
              </p>
            </div>
          </div>
          <div className="px-3 py-1 bg-orange-500/20 border border-orange-500 rounded-lg">
            <p className="text-orange-400 font-bold text-lg">{data.length}</p>
            <p className="text-orange-300 text-xs">Categories</p>
          </div>
        </div>
      </div>

      {/* Table with Scroll */}
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-gray-900/50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Occurrences
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Min Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Max Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((category, index) => (
                <tr
                  key={category.category_id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  {/* Rank */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index < 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-red-500/20 text-red-400 border-2 border-red-500' :
                          index === 1 ? 'bg-orange-500/20 text-orange-400 border-2 border-orange-500' :
                          'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500'
                        }`}>
                          {index + 1}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-gray-400 font-semibold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Category Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-white font-medium">{category.category_name}</span>
                    </div>
                  </td>

                  {/* Occurrences */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500 rounded-lg">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-bold text-red-400">{category.occurrences}</span>
                    </div>
                  </td>

                  {/* Avg Score */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg font-bold border-2 ${getScoreColor(Math.floor(category.avg_score))}`}>
                      {category.avg_score.toFixed(2)}
                    </span>
                  </td>

                  {/* Min Score */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg font-bold border-2 ${getScoreColor(category.min_score)}`}>
                      {category.min_score}
                    </span>
                  </td>

                  {/* Max Score */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-lg font-semibold text-gray-400 bg-gray-700 border-2 border-gray-600">
                      {category.max_score}
                    </span>
                  </td>

                  {/* Severity */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-bold border-2 ${getScoreColor(category.min_score)}`}>
                      {category.min_score === 0 && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {getSeverityLabel(category.min_score)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900/50 px-6 py-3 border-t border-gray-700">
        <p className="text-gray-400 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Showing top {data.length} categories with the most occurrences of low scores
        </p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 1);
        }
      `}</style>
    </div>
  );
};

export default LowScoresByCategory;