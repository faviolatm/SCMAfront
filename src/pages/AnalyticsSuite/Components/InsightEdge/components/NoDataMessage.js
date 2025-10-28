import React from 'react';

/**
 * No data found message component
 */
const NoDataMessage = ({ searchedPartNumber, counts }) => {
  return (
    <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 rounded px-5 py-5 text-center mt-5">
      <p className="my-1">
        No BOM relationships or sales data found for part: <strong className="text-yellow-900">{searchedPartNumber}</strong>
      </p>
      {counts && counts.parent_count === 0 && counts.child_count === 0 && (
        <p className="my-1">This part number was not found in the BOM database.</p>
      )}
    </div>
  );
};

export default NoDataMessage;