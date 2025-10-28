import React from 'react';

/**
 * Input section component for part number entry
 */
const PartLookupInput = ({ 
  partNumber, 
  setPartNumber, 
  handleSubmit, 
  handleKeyPress, 
  loading 
}) => {
  return (
    <div className="flex items-center justify-center mb-8 gap-2.5 bg-white p-4">
      <input
        type="text"
        placeholder="Enter Material Part Number"
        value={partNumber}
        onChange={(e) => setPartNumber(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
        className="px-3 py-3 w-[250px] border-2 border-gray-300 rounded text-l focus:outline-none focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed font-bold"
      />
      <button 
        onClick={handleSubmit} 
        disabled={loading || !partNumber.trim()}
        className="px-6 py-3 bg-blue-600 text-white border-none rounded cursor-pointer text-sm font-medium hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Searching...' : 'Submit'}
      </button>
    </div>
  );
};

export default PartLookupInput;