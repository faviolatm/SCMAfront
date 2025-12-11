// components/modals/DeleteConfirmationModal.js
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, dashboard, isSubmitting, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Delete Dashboard</h3>
          <button onClick={onClose} disabled={isSubmitting} className="text-slate-400 hover:text-slate-600 text-2xl disabled:opacity-50">×</button>
        </div>
        
        <div className="mb-6">
          <p className="text-slate-700 mb-4">Are you sure you want to delete this dashboard?</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-medium text-red-800 mb-2"><strong>Dashboard:</strong> {dashboard?.name}</p>
            <p className="text-xs text-red-600">⚠️ This will deactivate the dashboard. It can be reactivated later from the database.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors disabled:opacity-50">Cancel</button>
          <button onClick={onConfirm} disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center">
            {isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>Deleting...</> : 'Delete Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;