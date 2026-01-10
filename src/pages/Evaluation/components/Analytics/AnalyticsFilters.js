import React, { useState, useEffect } from 'react';
import AnalyticsService from '../../../../services/AnalyticsService';

const AnalyticsFilters = ({ onFilterChange }) => {
  const [businessUnits, setBusinessUnits] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedBU, setSelectedBU] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      setLoading(true);
      
      // Cargar Business Units
      const buData = await AnalyticsService.getByBusinessUnit();
      const uniqueBUs = buData.map(item => item.business_unit).filter(Boolean);
      setBusinessUnits(uniqueBUs);
      
      // Cargar Regions
      const regionData = await AnalyticsService.getByRegion();
      const uniqueRegions = regionData.map(item => item.region).filter(Boolean);
      setRegions(uniqueRegions);
      
    } catch (error) {
      console.error('Error loading filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBUChange = (value) => {
    setSelectedBU(value);
    onFilterChange({ businessUnit: value, region: selectedRegion });
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    onFilterChange({ businessUnit: selectedBU, region: value });
  };

  const handleClear = () => {
    setSelectedBU('');
    setSelectedRegion('');
    onFilterChange({ businessUnit: '', region: '' });
  };

  if (loading) {
    return (
      <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 mb-8">
        <div className="animate-pulse flex gap-4">
          <div className="h-10 bg-gray-700 rounded flex-1"></div>
          <div className="h-10 bg-gray-700 rounded flex-1"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h3>
        
        {(selectedBU || selectedRegion) && (
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm font-semibold transition-all"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Unit Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Business Unit
          </label>
          <select
            value={selectedBU}
            onChange={(e) => handleBUChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="">All Business Units</option>
            {businessUnits.map((bu) => (
              <option key={bu} value={bu}>
                {bu}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedBU || selectedRegion) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-gray-400 text-sm">Active filters:</span>
          {selectedBU && (
            <span className="px-3 py-1 bg-orange-500/20 border border-orange-500 text-orange-300 rounded-full text-xs font-semibold">
              BU: {selectedBU}
            </span>
          )}
          {selectedRegion && (
            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500 text-purple-300 rounded-full text-xs font-semibold">
              Region: {selectedRegion}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsFilters;