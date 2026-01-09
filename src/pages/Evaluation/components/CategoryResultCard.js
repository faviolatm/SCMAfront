// src/components/Evaluation/CategoryResultCard.jsx
import React from 'react';

const CategoryResultCard = ({ category }) => {
  const getScoreColor = (score) => {
    if (score >= 4) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score >= 2) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="border-l-4 border-orange-500 bg-white rounded-r-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <h3 className="font-semibold text-gray-800 text-lg mb-3">
        {category.category_name}
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Min Score */}
        <div className={`p-3 rounded-lg border-2 ${getScoreColor(category.min_score)}`}>
          <p className="text-xs font-semibold mb-1">Min Score</p>
          <p className="text-2xl font-bold">
            {category.min_score}
          </p>
          <p className="text-xs mt-1 opacity-75">
            Lowest value
          </p>
        </div>

        {/* Average Score */}
        <div className="bg-gray-50 border-2 border-gray-200 p-3 rounded-lg">
          <p className="text-xs font-semibold text-gray-600 mb-1">
            Average
          </p>
          <p className="text-2xl font-bold text-gray-700">
            {category.avg_score?.toFixed(1) || 'N/A'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Category avg
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        {category.total_sections} sections evaluated
      </p>

      {category.min_score < 3 && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 font-semibold">
          ⚠️ Needs attention
        </div>
      )}
    </div>
  );
};

export default CategoryResultCard;