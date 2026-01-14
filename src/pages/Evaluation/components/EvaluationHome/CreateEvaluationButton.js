// src/pages/Evaluation/components/EvaluationHome/CreateEvaluationButton.jsx
import React from 'react';

const CreateEvaluationButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={onClick}
        className="group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      
      <div className="text-right">
        <p className="text-orange-400 font-bold text-sm">New Evaluation</p>
        <p className="text-gray-500 text-xs">Click to create</p>
      </div>
    </div>
  );
};

export default CreateEvaluationButton;