import React from 'react';

/**
 * Summary section displaying search results overview
 */
const SummarySection = ({ searchedPartNumber, bomLength, shipmentLength }) => {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-md p-5 mb-6">
      <h4 className="mt-0 mb-4 text-gray-700">Summary</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div className="bg-white p-3 rounded border border-gray-200">
          <strong className="text-gray-700">Input Part Number:</strong> {searchedPartNumber}
        </div>
        {bomLength > 0 && (
          <div className="bg-white p-3 rounded border border-gray-200 ">
            <strong className="text-gray-700">Bill of Materials Relationships:</strong> {bomLength} records
          </div>
        )}
        {shipmentLength > 0 && (
          <div className="bg-white p-3 rounded border border-gray-200">
            <strong className="text-gray-700">Sales Data by Year:</strong> {shipmentLength} parts
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarySection;