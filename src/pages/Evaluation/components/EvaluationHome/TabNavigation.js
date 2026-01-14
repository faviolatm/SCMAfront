// src/pages/Evaluation/components/EvaluationHome/TabNavigation.jsx
import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onTabChange('evaluations')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
          activeTab === 'evaluations'
            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-lg'
            : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Evaluations
        </div>
      </button>

      <button
        onClick={() => onTabChange('analytics')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
          activeTab === 'analytics'
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500 shadow-lg'
            : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Analytics
        </div>
      </button>
    </div>
  );
};

export default TabNavigation;