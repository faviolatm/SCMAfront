import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Menu = ({ title, categories }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].name);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mx-auto">
      {/* Title with subtle gradient underline */}
      <h2 className="text-2xl font-bold mb-6 pb-2 relative">
        {title}
        <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
      </h2>

      {/* Tabs - Improved with better spacing and interaction */}
      <div className="flex flex-wrap mb-8 gap-2 border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            aria-selected={activeCategory === category.name}
            role="tab"
            aria-controls={`panel-${category.name}`}
            className={`relative flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
              activeCategory === category.name
                ? 'text-indigo-600 bg-indigo-50 font-medium'
                : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-50'
            }`}
          >
            {/* Icon with subtle hover effect */}
            <span className="text-xl transition-transform duration-200 group-hover:scale-110">
              {category.icon}
            </span>
            
            {/* Category Name */}
            <span className="text-sm">{category.name}</span>
            
            {/* Active indicator line */}
            {activeCategory === category.name && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Active Category Content with animation */}
      <div className="min-h-[200px]">
        {categories.map((category) => (
          <div 
            key={category.name}
            id={`panel-${category.name}`}
            role="tabpanel"
            aria-labelledby={category.name}
            hidden={activeCategory !== category.name}
          >
            {activeCategory === category.name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-2"
              >
                {category.component}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;