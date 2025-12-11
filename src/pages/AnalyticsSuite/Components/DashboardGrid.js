// components/DashboardGrid.js
import React from 'react';
import DashboardCard from './DashboardCard';

const DashboardGrid = ({ 
  options, 
  isAdmin, 
  useDatabase, 
  onOptionClick, 
  onEditClick, 
  onDeleteClick,
  onCreateClick 
}) => {
  if (options.length === 0) {
    return (
      <EmptyState 
        isAdmin={isAdmin} 
        useDatabase={useDatabase} 
        onCreateClick={onCreateClick} 
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {options.map((option) => {
        const hasUrl = Boolean(option.url);
        const hasImage = Boolean(option.imageUrl && option.hasImage);
        
        return (
          <DashboardCard
            key={option.id || option.name}
            option={option}
            hasUrl={hasUrl}
            hasImage={hasImage}
            isAdmin={isAdmin}
            useDatabase={useDatabase}
            onOptionClick={onOptionClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        );
      })}
    </div>
  );
};

const EmptyState = ({ isAdmin, useDatabase, onCreateClick }) => (
  <div className="col-span-full text-center py-12">
    <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-12">
      <div className="text-slate-400 text-6xl mb-4">📊</div>
      <h3 className="text-2xl font-bold text-slate-700 mb-2">No dashboards yet</h3>
      <p className="text-slate-500 mb-6">
        {isAdmin && useDatabase 
          ? "Get started by creating your first dashboard" 
          : "Dashboards will appear here once they are configured"}
      </p>
      
      {isAdmin && useDatabase && (
        <button
          onClick={onCreateClick}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white font-medium px-8 py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Create First Dashboard
        </button>
      )}
    </div>
  </div>
);

export default DashboardGrid;