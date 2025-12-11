// components/DashboardCard.js
import React from 'react';

const DashboardCard = ({ 
  option, 
  hasUrl, 
  hasImage, 
  isAdmin, 
  useDatabase, 
  onOptionClick, 
  onEditClick,
  onDeleteClick
}) => {
  return (
    <div
      onClick={() => onOptionClick(option)}
      className="group relative bg-white border rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105"
      style={{
        minHeight: '240px',
        backgroundImage: hasImage ? `url(${option.imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {hasImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      )}
      
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-auto">
          <div>
            <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
              hasImage 
                ? 'text-black bg-white/80 px-3 py-1 rounded-lg backdrop-blur-sm group-hover:bg-white/95' 
                : 'text-slate-800 group-hover:text-slate-900'
            }`}>
              {option.name}
            </h3>
            
            <StatusBadge hasUrl={hasUrl} hasImage={hasImage} />
          </div>
          
          {isAdmin && useDatabase && (
            <AdminButtons 
              option={option}
              hasImage={hasImage}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          )}
        </div>

        {!hasImage && <ImagePendingBadge />}
        <ActionButton hasUrl={hasUrl} hasImage={hasImage} isAdmin={isAdmin} useDatabase={useDatabase} />
      </div>

      {hasImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  );
};

const StatusBadge = ({ hasUrl, hasImage }) => (
  <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
    hasUrl 
      ? hasImage ? 'bg-green-500/20 text-green-300 backdrop-blur-sm border border-green-400/30' : 'bg-green-100 text-green-800'
      : hasImage ? 'bg-amber-500/20 text-amber-300 backdrop-blur-sm border border-amber-400/30' : 'bg-amber-100 text-amber-800'
  }`}>
    {hasUrl ? '● Active' : '● Pending'}
  </div>
);

const AdminButtons = ({ option, hasImage, onEditClick, onDeleteClick }) => (
  <div className="flex gap-2">
    <button
      onClick={(e) => { e.stopPropagation(); onEditClick(option); }}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
        hasImage 
          ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20' 
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
      }`}
      style={{ textShadow: hasImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none' }}
      title="Edit URL"
    >
      ⚙️
    </button>
    
    <button
      onClick={(e) => { e.stopPropagation(); onDeleteClick(option); }}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
        hasImage 
          ? 'bg-red-500/20 hover:bg-red-500/30 text-white backdrop-blur-sm border border-red-400/30' 
          : 'bg-red-100 hover:bg-red-200 text-red-700'
      }`}
      style={{ textShadow: hasImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none' }}
      title="Delete dashboard"
    >
      🗑️
    </button>
  </div>
);

const ImagePendingBadge = () => (
  <div className="absolute top-4 right-4">
    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
      📸 Image pending
    </span>
  </div>
);

const ActionButton = ({ hasUrl, hasImage, isAdmin, useDatabase }) => {
  const isClickable = hasUrl || (isAdmin && useDatabase);
  
  return (
    <div className="pt-4">
      <div className={`w-full py-3 px-4 rounded-xl text-center font-semibold text-sm transition-all ${
        isClickable
          ? hasImage ? 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:scale-105' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-lg'
          : hasImage ? 'bg-black/20 text-white/70 border border-white/20 backdrop-blur-sm cursor-not-allowed' 
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
      }`} 
      style={{ textShadow: hasImage && isClickable ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none' }}>
        {hasUrl ? 'Open Dashboard' : (isAdmin && useDatabase ? 'Configure URL' : 'Coming Soon')}
      </div>
    </div>
  );
};

export default DashboardCard;