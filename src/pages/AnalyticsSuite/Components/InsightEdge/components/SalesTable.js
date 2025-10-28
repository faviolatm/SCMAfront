import React from 'react';
import PaginationControls from './PaginationControls';
import DownloadButton from './DownloadButton';
import usePagination from '../../../hooks/InsightEdge/usePagination';

/**
 * Sales Data Table Component
 */
const SalesTable = ({ shipment, years, formatNumber, downloadSalesData }) => {
  const {
    currentPage,
    setCurrentPage,
    getPaginatedData,
    getTotalPages,
  } = usePagination(10);

  if (shipment.length === 0 || years.length === 0) return null;

  const paginatedShipment = getPaginatedData(shipment);
  const totalPages = getTotalPages(shipment.length);

  return (
    <div className="mb-8">
      <h4 className="text-gray-700 mb-4 text-lg font-bold text-center">
        Sales Data by Year ({shipment.length} parts)
      </h4>
      
      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-md bg-white">
        <table className="w-full border-collapse m-0">
          <thead>
            <tr>
              <th className="bg-gray-100 text-gray-700 font-semibold px-3 py-3 text-left border-b-2 border-gray-300 sticky top-0 z-[1]">
                Part Number
              </th>
              {years.map((year) => (
                <th key={year} className="bg-gray-100 text-gray-700 font-semibold px-3 py-3 text-left border-b-2 border-gray-300 sticky top-0 z-[1]">
                  FY {year}
                </th>
              ))}
              <th className="bg-gray-100 text-gray-700 font-semibold px-3 py-3 text-left border-b-2 border-gray-300 sticky top-0 z-[1]">
                Total Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedShipment.map((row, index) => (
              <tr key={index} className={`${index % 2 === 1 ? 'bg-gray-50' : ''} hover:bg-blue-50`}>
                <td className="px-3 py-2.5 border-b border-gray-300 align-top">
                  <strong className="text-gray-700 font-semibold">{row.part_number}</strong>
                </td>
                {years.map((year) => (
                  <td key={year} className="px-3 py-2.5 border-b border-gray-300 align-top text-right font-['Arial']">
                    {formatNumber(row[`revenue_${year}`] || row[year] || 0)}
                  </td>
                ))}
                <td className="px-3 py-2.5 border-b border-gray-300 align-top text-right font-['Arial']">
                  <strong className="text-gray-700 font-semibold">
                    {formatNumber(row.total_revenue || 0)}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <DownloadButton 
        onClick={downloadSalesData}
        label="Download Sales Data (CSV)"
      />
    </div>
  );
};

export default SalesTable;