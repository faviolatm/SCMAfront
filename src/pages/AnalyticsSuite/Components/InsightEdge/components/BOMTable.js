import React from 'react';
import PaginationControls from './PaginationControls';
import DownloadButton from './DownloadButton';
import usePagination from '../../../hooks/InsightEdge/usePagination';

/**
 * BOM (Bill of Materials) Table Component
 */
const BOMTable = ({ bom, downloadBOMData }) => {
  const {
    currentPage,
    setCurrentPage,
    getPaginatedData,
    getTotalPages,
  } = usePagination(10);

  if (bom.length === 0) return null;

  const paginatedBom = getPaginatedData(bom);
  const totalPages = getTotalPages(bom.length);

  return (
    <div className="mb-8">
      <h4 className="text-gray-700 mb-4 text-lg font-bold text-center">
        Bill of Materials Relationships ({bom.length} records)
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
                Entered Part
              </th>
              <th className="bg-gray-100 text-gray-700 font-semibold px-3 py-3 text-left border-b-2 border-gray-300 sticky top-0 z-[1]">
                reference_pn
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBom.map((row, index) => (
              <tr key={index} className={`${index % 2 === 1 ? 'bg-gray-50' : ''} hover:bg-blue-50`}>
                <td className="px-3 py-2.5 border-b border-gray-300 align-top">
                  <strong className="text-gray-700 font-semibold">{row.entered_part_number}</strong>
                </td>
                <td className="px-3 py-2.5 border-b border-gray-300 align-top">
                  {row.reference_pn}
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
        onClick={downloadBOMData}
        label="Download BOM Data (CSV)"
      />
    </div>
  );
};

export default BOMTable;