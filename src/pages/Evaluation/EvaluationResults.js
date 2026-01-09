// src/pages/Evaluation/EvaluationResults.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvaluationResults } from './hooks/useEvaluationResults';
import CategoryResultCard from './components/CategoryResultCard';

const EvaluationResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { results, loading, error, exportResults } = useEvaluationResults(id);

  const handleExport = async (format) => {
    const result = await exportResults(format);
    if (!result.success) {
      alert(`Export failed: ${result.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Loading results...</div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">
          {error || 'Results not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/evaluations')}
            className="text-orange-600 hover:text-orange-800 mb-4 font-medium"
          >
            ← Back to list
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Evaluation Results
              </h1>
              <p className="text-gray-600 mt-1">{results.evaluation_name}</p>
              <p className="text-sm text-gray-500">
                Evaluator: {results.evaluator || 'N/A'}
              </p>
            </div>
            
            {/* Export Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('pdf')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
              >
                Export PDF
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg font-semibold transition-colors"
              >
                Export Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Summary by Category
          </h2>
          
          {results.categories && results.categories.length > 0 ? (
            <div className="space-y-4">
              {results.categories.map((category, index) => (
                <CategoryResultCard key={index} category={category} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No results available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;