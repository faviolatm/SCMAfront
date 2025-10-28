import React from 'react';
import usePartLookup from '../../hooks/InsightEdge/usePartLookup';
import PartLookupHeader from './components/PartLookupHeader';
import PartLookupInput from './components/PartLookupInput';
import ErrorMessage from './components/ErrorMessage';
import SummarySection from './components/SummarySection';
import BOMTable from './components/BOMTable';
import SalesTable from './components/SalesTable';
import NoDataMessage from './components/NoDataMessage';
import BackButton from '../../../../components/General/BackButton';
import {useAnalytics} from '../../hooks/useAnalytics';

/**
 * PartLookup - Part Lookup Application
 * Parent component that orchestrates the part lookup functionality
 */
const PartLookup = () => {
  const {
    partNumber,
    setPartNumber,
    searchedPartNumber,
    results,
    loading,
    error,
    handleSubmit,
    handleKeyPress,
    formatNumber,
    downloadBOMData,
    downloadSalesData,
    extractYears,
  } = usePartLookup();
  const { handleBackToAIOptions } = useAnalytics();
  const { bom, shipment, counts } = results;
  const years = extractYears();

  // Show results only when we have searched part number and not loading
  const showResults = searchedPartNumber && !loading && (bom.length > 0 || shipment.length > 0 || counts);

  return (
    <div className="max-w-[1000px] mx-auto p-5 font-sans bg-white">

          <BackButton onClick={handleBackToAIOptions} className="mb-8">
            Back to AI Options
          </BackButton>
      <PartLookupHeader />

      <PartLookupInput 
        partNumber={partNumber}
        setPartNumber={setPartNumber}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
        loading={loading}
      />

      <ErrorMessage error={error} />

      {showResults && !error && (
        <div className="mt-5">
          <h3 className="text-gray-800 mb-5 text-l font-bold text-center">Results for Part: {searchedPartNumber}</h3>

          <SummarySection 
            searchedPartNumber={searchedPartNumber}
            bomLength={bom.length}
            shipmentLength={shipment.length}
          />

          <BOMTable 
            bom={bom}
            downloadBOMData={downloadBOMData}
          />

          <SalesTable 
            shipment={shipment}
            years={years}
            formatNumber={formatNumber}
            downloadSalesData={downloadSalesData}
          />

          {bom.length === 0 && shipment.length === 0 && counts && (
            <NoDataMessage 
              searchedPartNumber={searchedPartNumber}
              counts={counts}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PartLookup;