// src/components/Evaluation/EvaluationSummary.jsx
import React, { useState, useEffect } from 'react';
import ResponseService from '../../../services/ResponseService';

const EvaluationSummary = ({ evaluationId, onClose }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    loadSummary();
  }, [evaluationId]);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await ResponseService.getResults(evaluationId);
      setSummary(data);
      
      // Expand all categories by default
      if (data?.categories) {
        const expanded = {};
        data.categories.forEach(cat => {
          expanded[cat.category_id] = true;
        });
        setExpandedCategories(expanded);
      }
    } catch (error) {
      console.error('Error loading summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 4) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (score >= 3) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    if (score >= 2) return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getScoreBadge = (score) => {
    if (score >= 4) return { text: 'Excellent', color: 'bg-gradient-to-r from-green-600 to-green-700' };
    if (score >= 3) return { text: 'Good', color: 'bg-gradient-to-r from-yellow-600 to-yellow-700' };
    if (score >= 2) return { text: 'Fair', color: 'bg-gradient-to-r from-orange-600 to-orange-700' };
    return { text: 'Needs Improvement', color: 'bg-gradient-to-r from-red-600 to-red-700' };
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl p-8 text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <div className="text-gray-300 font-medium">Loading summary...</div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-5 border-b-2 border-orange-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Evaluation Summary</h2>
              <p className="text-orange-100 text-sm mt-2">
                {summary.evaluation_name}
              </p>
              <p className="text-orange-200 text-xs mt-1">
                Evaluator: {summary.evaluator || 'N/A'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-200 hover:bg-white/10 rounded-lg p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {summary.categories && summary.categories.length > 0 ? (
            <div className="space-y-5">
              {summary.categories.map((category) => {
                const badge = getScoreBadge(category.min_score);
                const isExpanded = expandedCategories[category.category_id];
                
                return (
                  <div
                    key={category.category_id}
                    className="border-2 border-gray-700 rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-all"
                  >
                    {/* Category Header */}
                    <div className="bg-gray-800 p-5 border-b-2 border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg">
                            {category.category_name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            {category.total_sections} sections evaluated
                          </p>
                        </div>
                        
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${badge.color} text-white shadow-lg`}>
                          {badge.text}
                        </div>
                      </div>

                      {/* Scores Summary */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className={`p-4 rounded-xl border-2 ${getScoreColor(category.min_score)}`}>
                          <p className="text-xs font-semibold mb-1.5">Minimum Score</p>
                          <p className="text-3xl font-bold">
                            {category.min_score}
                          </p>
                        </div>

                        <div className="bg-gray-700/50 border-2 border-gray-600 p-4 rounded-xl">
                          <p className="text-xs font-semibold text-gray-400 mb-1.5">
                            Average Score
                          </p>
                          <p className="text-3xl font-bold text-white">
                            {category.avg_score?.toFixed(1) || 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Toggle Button */}
                      <button
                        onClick={() => toggleCategory(category.category_id)}
                        className="w-full px-4 py-2.5 bg-gray-700 border-2 border-gray-600 rounded-lg text-sm font-semibold text-gray-300 hover:bg-gray-600 hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                      >
                        <svg 
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {isExpanded ? 'Hide' : 'Show'} Section Details
                      </button>
                    </div>

                    {/* Sections Table */}
                    {isExpanded && category.sections && category.sections.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-700/50 border-b-2 border-gray-600">
                            <tr>
                              <th className="px-5 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                                Section
                              </th>
                              <th className="px-5 py-3 text-center text-xs font-bold text-gray-300 uppercase tracking-wider w-32">
                                Score
                              </th>
                              <th className="px-5 py-3 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                                Option Selected
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {category.sections.map((section, idx) => (
                              <tr key={idx} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-5 py-4 text-sm text-white font-medium">
                                  {section.section_name}
                                </td>
                                <td className="px-5 py-4 text-center">
                                  <span className={`inline-flex items-center justify-center w-14 h-14 rounded-xl text-xl font-bold border-2 ${getScoreColor(section.score)}`}>
                                    {section.score}
                                  </span>
                                </td>
                                <td className="px-5 py-4 text-sm text-gray-300">
                                  {section.option_selected || 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Warning */}
                    {category.min_score < 3 && (
                      <div className="p-4 bg-red-500/10 border-t-2 border-red-500/30">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-sm text-red-400 font-bold">
                            This category needs attention
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 border-2 border-gray-700 rounded-xl">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-400 font-medium">No results available</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-700 px-6 py-4 bg-gray-800">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSummary;