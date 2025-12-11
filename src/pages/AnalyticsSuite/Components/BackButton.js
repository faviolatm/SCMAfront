// components/BackButton.js
import React from 'react';

const BackButton = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900
                 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300
                 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
      {children}
    </button>
  );
};

export default BackButton;