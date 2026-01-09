// src/pages/Evaluation/components/CategoryCard.jsx
import React from 'react';
import SectionItem from '../SectionItem';

const CategoryCard = ({ category, responses, onOptionSelect, isCompleted }) => {
  return (
    <div className="mb-3" id={`category-${category.id}`}>
      {/* Category Header */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white px-6 py-4 rounded-t-xl shadow-lg border-2 border-orange-700">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        {category.description && (
          <p className="text-orange-100 text-sm mt-2 leading-relaxed">{category.description}</p>
        )}
      </div>

      {/* Sections */}
      <div className="bg-gray-800/50 rounded-b-xl shadow-2xl border-2 border-gray-700 border-t-0">
        {category.sections.map((section, index) => (
          <SectionItem
            key={section.id}
            section={section}
            isAnswered={!!responses[section.id]}
            selectedOptionId={responses[section.id]?.option_id}
            onOptionSelect={onOptionSelect}
            isCompleted={isCompleted}
            isLast={index === category.sections.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;