// src/pages/Evaluation/components/EvaluationHome/Analytics/TopPerformersTable.jsx
import React from 'react';

const TopPerformersTable = ({ data, loading }) => {
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

  const getMedalIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-white font-bold text-xl flex items-center gap-2">
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Top Performers
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Users with most completed evaluations
        </p>
      </div>

      {/* Table */}
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Business Unit
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((item, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-gray-700/30 transition-colors ${
                    index < 3 ? 'bg-yellow-500/5' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="text-2xl">{getMedalIcon(index)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{item.evaluator_userid}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{item.region || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm truncate max-w-xs block">
                      {item.business_unit || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-white font-semibold">{item.total_evaluations}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-400 font-semibold">{item.completed}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all"
                          style={{ width: `${item.completion_rate}%` }}
                        ></div>
                      </div>
                      <span className="text-purple-400 font-semibold text-sm">
                        {item.completion_rate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center">
          <p className="text-gray-500">No performance data available</p>
        </div>
      )}
    </div>
  );
};

export default TopPerformersTable;