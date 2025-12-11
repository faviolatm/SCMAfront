// components/modals/EditUrlModal.js
import React from 'react';

const EditUrlModal = ({ isOpen, currentOption, newUrl, setNewUrl, isSubmitting, onSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Configure URL</h3>
          <button onClick={onClose} disabled={isSubmitting} className="text-slate-400 hover:text-slate-600 text-2xl disabled:opacity-50">×</button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Dashboard for: <span className="font-bold">{currentOption?.name}</span>
          </label>
          <input
            type="url"
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://your-dashboard-url.com"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex gap-3">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onSave} disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-medium transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center">
            {isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>Saving...</> : 'Save URL'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUrlModal;