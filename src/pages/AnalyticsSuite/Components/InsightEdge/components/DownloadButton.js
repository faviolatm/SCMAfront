import React from 'react';

/**
 * Download button component
 */
const DownloadButton = ({ onClick, label }) => {
  return (
    <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
      <button 
        className="px-5 py-2.5 bg-green-600 text-white border-none rounded cursor-pointer text-sm font-medium hover:bg-green-700 active:bg-green-800 transition-colors"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default DownloadButton;