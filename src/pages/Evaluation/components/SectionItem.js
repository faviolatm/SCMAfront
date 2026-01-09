// src/pages/Evaluation/components/SectionItem.jsx
import React from 'react';
import OptionCard from './OptionCard';

const SectionItem = ({ 
  section, 
  isAnswered, 
  selectedOptionId, 
  onOptionSelect, 
  isCompleted,
  isLast 
}) => {
  return (
    <div className={`p-6 ${!isLast ? 'border-b-2 border-gray-700' : ''}`}>
      {/* Section Title */}
      <div className="mb-5">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-white flex items-center flex-1">
            <span className="mr-3">{section.name}</span>
            {isAnswered && (
              <span className="inline-flex items-center justify-center w-7 h-7 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg">
                ✓
              </span>
            )}
          </h3>
        </div>
        {section.description && (
          <p className="text-gray-400 mt-2 leading-relaxed text-sm">{section.description}</p>
        )}
      </div>

      {/* Options Grid - 5 cards */}
      <div className="grid grid-cols-5 gap-3">
        {section.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onClick={() => onOptionSelect(section.id, option.id, option.score)}
            disabled={isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionItem;