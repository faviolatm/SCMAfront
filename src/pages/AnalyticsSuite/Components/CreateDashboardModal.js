// components/modals/CreateDashboardModal.js
import React from 'react';

const CreateDashboardModal = ({ isOpen, sectionName, dashboardName, setDashboardName, dashboardUrl, setDashboardUrl, isSubmitting, onCreate, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Add New Dashboard</h3>
          <button onClick={onClose} disabled={isSubmitting} className="text-slate-400 hover:text-slate-600 text-2xl disabled:opacity-50">×</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Dashboard Name <span className="text-red-500">*</span></label>
            <input type="text" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors" value={dashboardName} onChange={(e) => setDashboardName(e.target.value)} placeholder="e.g., Performance Tracker" disabled={isSubmitting} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Dashboard URL <span className="text-red-500">*</span></label>
            <input type="url" className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors" value={dashboardUrl} onChange={(e) => setDashboardUrl(e.target.value)} placeholder="https://your-dashboard-url.com" disabled={isSubmitting} />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700"><strong>Section:</strong> {sectionName}</p>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors disabled:opacity-50">Cancel</button>
          <button onClick={onCreate} disabled={isSubmitting || !dashboardName.trim() || !dashboardUrl.trim()} className="flex-1 px-4 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 font-medium transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center">
            {isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>Creating...</> : 'Create Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDashboardModal;