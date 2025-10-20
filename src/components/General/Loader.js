// src/components/Loader.js
import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading warehouse information...</p>
      </div>
    </div>
  );
}

export default Loader;