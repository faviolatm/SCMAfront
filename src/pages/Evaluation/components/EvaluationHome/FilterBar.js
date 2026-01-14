// src/pages/Evaluation/components/EvaluationHome/FilterBar.jsx
import React from 'react';

const FilterBar = ({ filters, filterOptions, onFilterChange, onClearFilters }) => {
  if (!filterOptions) return null;

  const { filters: availableFilters, locked_filters, user_level } = filterOptions;
  const hasAnyFilters = availableFilters.business_units.length > 0 || 
                        availableFilters.regions.length > 0 || 
                        availableFilters.buildings.length > 0;

  // Nivel 5 solo ve el filtro de status
  if (user_level === 5) {
    return (
      <div className="mb-6 bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAnyFilters) return null;

  const hasActiveFilters = filters.business_unit || filters.region || filters.building || filters.status !== 'all';

  return (
    <div className="mb-6 bg-gray-800/50 border-2 border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          <span className="text-xs text-gray-500">
            ({user_level === 1 ? 'Hierarchical' : 'Available'})
          </span>
        </h3>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded-lg text-sm font-semibold transition-all"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Business Unit Filter */}
        {availableFilters.business_units.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Business Unit
              {locked_filters.business_unit && (
                <span className="ml-2 text-xs text-orange-400">(Locked)</span>
              )}
            </label>
            <select
              value={filters.business_unit || ''}
              onChange={(e) => onFilterChange('business_unit', e.target.value || null)}
              disabled={locked_filters.business_unit}
              className={`w-full px-4 py-2 bg-gray-700 border-2 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all ${
                locked_filters.business_unit 
                  ? 'border-orange-500 cursor-not-allowed opacity-70' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <option value="">All Business Units</option>
              {availableFilters.business_units.map(bu => (
                <option key={bu} value={bu}>{bu}</option>
              ))}
            </select>
            {user_level === 1 && filters.business_unit && (
              <p className="text-xs text-gray-500 mt-1">
                ↓ Regions and Buildings will filter based on this BU
              </p>
            )}
          </div>
        )}

        {/* Region Filter */}
        {availableFilters.regions.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Region
              {locked_filters.region && (
                <span className="ml-2 text-xs text-orange-400">(Locked)</span>
              )}
            </label>
            <select
              value={filters.region || ''}
              onChange={(e) => onFilterChange('region', e.target.value || null)}
              disabled={locked_filters.region}
              className={`w-full px-4 py-2 bg-gray-700 border-2 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all ${
                locked_filters.region 
                  ? 'border-orange-500 cursor-not-allowed opacity-70' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <option value="">All Regions</option>
              {availableFilters.regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            {(user_level === 1 || user_level === 2) && filters.region && (
              <p className="text-xs text-gray-500 mt-1">
                ↓ Buildings will filter based on this Region
              </p>
            )}
          </div>
        )}

        {/* Building Filter */}
        {availableFilters.buildings.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Building / Plant
              {locked_filters.building && (
                <span className="ml-2 text-xs text-orange-400">(Locked)</span>
              )}
            </label>
            <select
              value={filters.building || ''}
              onChange={(e) => onFilterChange('building', e.target.value || null)}
              disabled={locked_filters.building}
              className={`w-full px-4 py-2 bg-gray-700 border-2 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all ${
                locked_filters.building 
                  ? 'border-orange-500 cursor-not-allowed opacity-70' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <option value="">All Buildings</option>
              {availableFilters.buildings.map(building => (
                <option key={building} value={building}>{building}</option>
              ))}
            </select>
          </div>
        )}

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none hover:border-gray-500 transition-all"
          >
            <option value="all">All Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-400 font-medium">Active filters:</span>
            
            {filters.business_unit && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                BU: {filters.business_unit}
              </span>
            )}
            
            {filters.region && (
              <span className="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Region: {filters.region}
              </span>
            )}
            
            {filters.building && (
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500 text-purple-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Building: {filters.building}
              </span>
            )}
            
            {filters.status !== 'all' && (
              <span className="px-3 py-1 bg-orange-500/20 border border-orange-500 text-orange-400 rounded-lg text-xs font-semibold">
                Status: {filters.status === 'in_progress' ? 'In Progress' : 'Completed'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;