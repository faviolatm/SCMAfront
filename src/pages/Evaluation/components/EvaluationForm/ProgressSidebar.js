// src/pages/Evaluation/components/ProgressSidebar.jsx
import React from 'react';

const ProgressSidebar = ({ evaluation, progress, isCompleted, onBack, categories, responses }) => {
  const getCategoryProgress = (category) => {
    const totalSections = category.sections.length;
    const answeredSections = category.sections.filter(section => responses[section.id]).length;
    return { total: totalSections, answered: answeredSections };
  };

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-gray-800 border-r-2 border-gray-700 shadow-2xl overflow-y-auto">
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-orange-400 hover:text-orange-300 font-semibold mb-6 transition-all group w-full px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg border-2 border-gray-600 hover:border-orange-500"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to list</span>
        </button>

        {/* Status Badge */}
        {isCompleted && (
          <div className="mb-6 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 border-2 border-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-bold">Completed</span>
          </div>
        )}

        {/* Evaluation Title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white mb-3 leading-tight">
            {evaluation.name}
          </h1>
          <div className="flex items-center text-sm text-gray-300 bg-gray-700 rounded-lg px-3 py-2 border-2 border-gray-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>{evaluation.evaluator_name || 'N/A'}</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 rounded-xl p-5 mb-6 border-2 border-orange-500/30">
          <h2 className="text-xs font-bold text-orange-400 mb-3 uppercase tracking-wider">
            Overall Progress
          </h2>
          
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-3xl font-bold text-orange-400">
                {progress.percentage}%
              </span>
              <span className="text-sm text-gray-300 font-bold">
                {progress.answered}/{progress.total}
              </span>
            </div>
            
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner border-2 border-gray-600">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-gray-300">
            {progress.isComplete ? (
              <span className="text-green-400 font-bold">✓ All questions answered</span>
            ) : (
              <span>
                <span className="font-bold text-orange-400">{progress.total - progress.answered}</span>
                {' '}remaining
              </span>
            )}
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
            Categories
          </h2>
          <div className="space-y-2">
            {categories.map((category) => {
              const catProgress = getCategoryProgress(category);
              const percentage = Math.round((catProgress.answered / catProgress.total) * 100);
              const isComplete = catProgress.answered === catProgress.total;

              return (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className="w-full text-left p-3 rounded-lg border-2 border-gray-700 hover:border-orange-500 bg-gray-700/50 hover:bg-gray-700 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-200 group-hover:text-orange-400 transition-colors">
                      {category.name}
                    </span>
                    {isComplete && (
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden border border-gray-500">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 font-bold min-w-[2.5rem] text-right">
                      {catProgress.answered}/{catProgress.total}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;