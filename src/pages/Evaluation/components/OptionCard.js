// src/pages/Evaluation/components/OptionCard.jsx
import React from 'react';

const OptionCard = ({ option, isSelected, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`relative p-5 rounded-xl transition-all duration-200 h-full flex flex-col text-left ${
        isSelected
          ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl ring-4 ring-orange-200'
          : 'bg-white hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg'
      } ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
    >
      {/* Check Icon */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Score Badge */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl mb-3 flex-shrink-0 ${
          isSelected 
            ? 'bg-white bg-opacity-30 text-white' 
            : 'bg-orange-100 text-orange-600'
        }`}>
          {option.score}
        </div>

        {/* Description (full text without "Basic", "Intermediate" labels) */}
        <p className={`text-sm leading-relaxed flex-1 ${
          isSelected ? 'text-white' : 'text-gray-700'
        }`}>
          {option.description}
        </p>
      </div>
    </button>
  );
};

export default OptionCard;