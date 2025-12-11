// components/ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
        {/* Icono de error */}
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 className="text-red-800 font-bold text-xl mb-3">Error Loading Data</h3>
        <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
        
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                     text-white font-medium px-6 py-3 rounded-xl transition-all duration-300
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
        >
          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;