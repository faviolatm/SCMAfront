// Components/BaseSectionComponent.js
import React, { useState } from 'react';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite/AnalyticsSuite_service';

const BaseSectionComponent = ({ 
  sectionName, 
  predefinedOptions = [], 
  onBack, 
  isAdmin, 
  data = [], 
  onDataUpdate, 
  loading,
  useDatabase = false
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const [newUrl, setNewUrl] = useState('');

  const getOptionsWithUrls = () => {
    if (!useDatabase) {
      // Si predefinedOptions son objetos con imageUrl, manténlos así
      return predefinedOptions.map(option => {
        if (typeof option === 'object' && option.name) {
          return { ...option, url: '' };
        }
        return { name: option, url: '', imageUrl: null, hasImage: false };
      });
    }

    return predefinedOptions.map(option => {
      const optionName = typeof option === 'object' ? option.name : option;
      const imageUrl = typeof option === 'object' ? option.imageUrl : null;
      const hasImage = typeof option === 'object' ? option.hasImage : false;
      
      const dbOption = data.find(item =>
        item.name === optionName ||
        item.option_name === optionName ||
        item.optionName === optionName ||
        item.title === optionName
      );
      
      return { 
        name: optionName, 
        url: dbOption?.url || '', 
        imageUrl,
        hasImage
      };
    });
  };

  const options = getOptionsWithUrls();

  const handleOptionClick = (option) => {
    if (option.url) {
      window.open(option.url, '_blank');
    } else if (isAdmin && useDatabase) {
      openModal(option);
    }
  };

  const openModal = (option) => {
    setCurrentOption(option);
    setNewUrl(option.url || '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentOption(null);
    setNewUrl('');
  };

  const saveUrl = async () => {
    if (!currentOption) return;

    const success = await AnalyticsSuiteService.updateUrl(sectionName, currentOption.name, newUrl);
    if (success) {
      alert(`✅ URL ${newUrl ? 'configured' : 'removed'} successfully!`);
      if (typeof onDataUpdate === 'function') onDataUpdate();
    } else {
      alert('❌ Failed to update URL. Please try again.');
    }
    closeModal();
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-300 border-t-slate-700 mb-4"></div>
        <h2 className="text-2xl font-semibold text-slate-700">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <button
        onClick={onBack}
        className="bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium px-6 py-3 rounded-xl mb-8"
      >
        Back to BI Options
      </button>

      <h2 className="text-4xl font-bold text-slate-800 mb-6">{sectionName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {options.map((option) => {
          const hasUrl = Boolean(option.url);
          const hasImage = Boolean(option.imageUrl && option.hasImage);
          
          return (
            <div
              key={option.name}
              onClick={() => handleOptionClick(option)}
              className="group relative bg-white border rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                minHeight: '240px',
                backgroundImage: hasImage ? `url(${option.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay mejorado con gradiente más sutil */}
              {hasImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              )}
              
              {/* Contenido de la card */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                {/* Header con título y botón admin */}
                <div className="flex justify-between items-start mb-auto">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
                      hasImage 
                        ? 'text-black bg-white/80 px-3 py-1 rounded-lg backdrop-blur-sm group-hover:bg-white/95' 
                        : 'text-slate-800 group-hover:text-slate-900'
                    }`}>
                      {option.name}
                    </h3>
                    
                    {/* Status indicator */}
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      hasUrl 
                        ? hasImage 
                          ? 'bg-green-500/20 text-green-300 backdrop-blur-sm border border-green-400/30' 
                          : 'bg-green-100 text-green-800'
                        : hasImage
                          ? 'bg-amber-500/20 text-amber-300 backdrop-blur-sm border border-amber-400/30'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {hasUrl ? '● Active' : '● Pending'}
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal(option); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                        hasImage 
                          ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      style={{
                        textShadow: hasImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
                      }}
                    >
                      {option.url ? '⚙️ Edit' : '🔧 Setup'}
                    </button>
                  )}
                </div>

                {/* Badge de imagen pendiente - solo si no tiene imagen */}
                {!hasImage && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      📸 Image pending
                    </span>
                  </div>
                )}

                {/* Footer con botón de acción */}
                <div className="pt-4">
                  <div className={`w-full py-3 px-4 rounded-xl text-center font-semibold text-sm transition-all ${
                    hasUrl || (isAdmin && useDatabase) 
                      ? hasImage 
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:scale-105' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-lg'
                      : hasImage 
                        ? 'bg-black/20 text-white/70 border border-white/20 backdrop-blur-sm cursor-not-allowed' 
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`} style={{
                    textShadow: hasImage && (hasUrl || (isAdmin && useDatabase)) ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
                  }}>
                    {hasUrl 
                      ? 'Open Dashboard' 
                      : (isAdmin && useDatabase ? 'Configure URL' : 'Coming Soon')
                    }
                  </div>
                </div>
              </div>

              {/* Efecto hover para las cards con imagen */}
              {hasImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* Modal mejorado */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Configure URL</h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dashboard for: <span className="font-bold">{currentOption?.name}</span>
              </label>
              <input
                type="text"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://your-dashboard-url.com"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveUrl}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-medium transition-colors shadow-lg"
              >
                Save URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseSectionComponent;