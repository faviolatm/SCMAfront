import { useState } from 'react';
import PartLookupService from '../../../../services/AnalyticsSuite/InsightEdge/PartLookupService';

/**
 * Custom hook for Part Lookup functionality
 * Manages state and logic for part number searches
 */
const usePartLookup = () => {
  const [partNumber, setPartNumber] = useState('');
  const [searchedPartNumber, setSearchedPartNumber] = useState('');
  const [results, setResults] = useState({ 
    bom: [], 
    shipment: [], 
    counts: null, 
    raw_dataframe_info: null 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!partNumber.trim()) {
      setError('Please enter a part number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Clear previous results immediately when submitting
    setResults({ bom: [], shipment: [], counts: null, raw_dataframe_info: null });
    setSearchedPartNumber('');
    
    try {
      const data = await PartLookupService.lookupPart(partNumber.trim());
      setResults(data);
      setSearchedPartNumber(partNumber.trim());
    } catch (error) {
      setError(`Network Error: ${error.message}`);
      setResults({ bom: [], shipment: [], counts: null, raw_dataframe_info: null });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  /**
   * Format numbers with locale string
   */
  const formatNumber = (value) => {
    if (!value || value === 0) return '0';
    return typeof value === 'number' ? value.toLocaleString() : value;
  };

  /**
   * Download CSV file
   */
  const downloadCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Download BOM data as CSV
   */
  const downloadBOMData = () => {
    downloadCSV(
      results.bom, 
      `BOM_Relationships_${searchedPartNumber}_${new Date().toISOString().split('T')[0]}.csv`
    );
  };

  /**
   * Download Sales data as CSV
   */
  const downloadSalesData = () => {
    downloadCSV(
      results.shipment, 
      `Sales_Data_${searchedPartNumber}_${new Date().toISOString().split('T')[0]}.csv`
    );
  };

  /**
   * Extract years from shipment data
   */
  const extractYears = () => {
    if (results.shipment.length === 0) return [];
    
    let years = Object.keys(results.shipment[0])
      .filter((key) => key !== 'part_number' && !key.startsWith('total_') && !key.startsWith('revenue_'))
      .sort((a, b) => Number(a) - Number(b));
    
    if (years.length === 0) {
      years = Object.keys(results.shipment[0])
        .filter((key) => key.startsWith('revenue_'))
        .map(key => key.replace('revenue_', ''))
        .sort((a, b) => Number(a) - Number(b));
    }
    
    return years;
  };

  return {
    // State
    partNumber,
    setPartNumber,
    searchedPartNumber,
    results,
    loading,
    error,
    
    // Functions
    handleSubmit,
    handleKeyPress,
    formatNumber,
    downloadBOMData,
    downloadSalesData,
    extractYears,
  };
};

export default usePartLookup;