// src/components/Evaluation/CreateEvaluationModal.jsx
import React, { useState } from 'react';
import EvaluationService from '../../../../services/EvaluationService';
import EmployeeSearchInput from '../EmployeeSearchInput';

const CreateEvaluationModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    evaluator_userid: ''  // ✅ ELIMINAR 'name' del formData
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    if (employee) {
      setFormData({
        evaluator_userid: employee.userid
      });
    } else {
      setFormData({
        evaluator_userid: ''
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.evaluator_userid) {
      setError('Please select an employee');
      return;
    }

    if (!selectedEmployee) {
      setError('Employee information not loaded. Please select again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await EvaluationService.createEvaluation(formData);
      
      if (result) {
        onSuccess(result);
      } else {
        setError('Failed to create evaluation');
      }
    } catch (err) {
      console.error('Error creating evaluation:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-5 rounded-t-2xl border-b-2 border-orange-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Create New Evaluation</h2>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-white hover:text-orange-200 hover:bg-white/10 rounded-lg p-1.5 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border-2 border-red-500/30 text-red-400 rounded-lg text-sm font-medium flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Employee Search */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Select Evaluator *
            </label>
            <EmployeeSearchInput
              value={formData.evaluator_userid}
              onChange={(userid) => {
                setFormData({ evaluator_userid: userid });
              }}
              onEmployeeSelect={handleEmployeeSelect}
              placeholder="Search by USERID or name..."
              className="w-full"
            />
            <p className="mt-2 text-xs text-gray-400">
              The evaluation will be created for the selected employee's Business Unit
            </p>
          </div>

          {/* Employee Information Display */}
          {selectedEmployee && (
            <div className="mb-6 p-4 bg-gray-700/50 border-2 border-gray-600 rounded-lg">
              <h3 className="text-sm font-bold text-gray-300 mb-3">Evaluator Information</h3>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-xs font-semibold text-gray-400 w-32 flex-shrink-0">Name:</span>
                  <span className="text-sm text-white font-medium flex-1">{selectedEmployee.name || 'N/A'}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-xs font-semibold text-gray-400 w-32 flex-shrink-0">Business Unit:</span>
                  <span className="text-sm text-white font-bold">{selectedEmployee.business_unit || 'N/A'}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-xs font-semibold text-gray-400 w-32 flex-shrink-0">Region:</span>
                  <span className="text-sm text-white">{selectedEmployee.region || 'N/A'}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="text-xs font-semibold text-gray-400 w-32 flex-shrink-0">Business Segment:</span>
                  <span className="text-sm text-white">{selectedEmployee.business_segment || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-5 py-3 bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedEmployee}
              className="flex-1 px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Evaluation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvaluationModal;