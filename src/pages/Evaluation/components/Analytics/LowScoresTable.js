// src/pages/Evaluation/components/EvaluationHome/Analytics/LowScoresTable.jsx
import React from 'react';

const LowScoresTable = ({ data, loading, filters }) => {
  const getScoreColor = (score) => {
    if (score === 0) return 'text-red-500 bg-red-500/10';
    if (score === 1) return 'text-orange-500 bg-orange-500/10';
    if (score === 2) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-gray-500 bg-gray-500/10';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Low Scores Alert
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Categories with scores ≤ 2 requiring attention
            </p>
          </div>
          
          <div className="px-4 py-2 bg-red-500/10 border border-red-500 rounded-lg">
            <span className="text-red-400 font-bold text-2xl">{data.length}</span>
            <span className="text-red-400 text-sm ml-2">issues</span>
          </div>
        </div>
      </div>

      {/* Table */}
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Evaluation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Evaluator
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Business Unit
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{item.category_name}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${getScoreColor(item.min_score)}`}>
                      {item.min_score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{item.evaluation_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{item.evaluator_userid}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{item.region || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm truncate max-w-xs block">
                      {item.business_unit || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{formatDate(item.completed_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white font-semibold text-lg mb-2">No Low Scores Found!</p>
          <p className="text-gray-400">All categories are performing well.</p>
        </div>
      )}
    </div>
  );
};

export default LowScoresTable;