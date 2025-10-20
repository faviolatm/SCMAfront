import React from 'react';
import { motion } from 'framer-motion';

const Category = ({ dashboards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboards.map((dashboard, index) => (
        <motion.div
          key={index}
          whileHover={{ 
            y: -8,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full group"
          onClick={() => window.open(dashboard.link, '_blank')}
          role="link"
          aria-label={`Abrir dashboard de ${dashboard.title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.open(dashboard.link, '_blank');
            }
          }}
        >
          {/* Colorful top banner - random color based on index */}
          <div 
            className="h-2"
            style={{ 
              background: `hsl(${(index * 60) % 360}, 80%, 65%)` 
            }}
          />
          
          <div className="p-6 flex flex-col items-center text-center h-full cursor-pointer">
            {/* Icon with animation */}
            <div className="mb-4 text-3xl text-gray-700 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-indigo-500">
              {dashboard.icon}
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-bold mb-3 text-gray-800">{dashboard.title}</h2>
            
            {/* Description */}
            <p className="text-gray-600 flex-grow">{dashboard.description}</p>
            
            {/* Access button */}
            <div className="mt-4 w-full">
              <div className="inline-flex items-center justify-center text-sm font-medium text-indigo-600 mt-2 py-2 px-4 rounded-md bg-indigo-50 transition-colors duration-200 group-hover:bg-indigo-100">
                Open Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Category;