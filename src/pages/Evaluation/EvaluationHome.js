// src/pages/Evaluation/EvaluationHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EvaluationList from './components/EvaluationHome/EvaluationList';
import CreateEvaluationModal from './components/EvaluationHome/CreateEvaluationModal';
import KPICards from './components/EvaluationHome/KPICards';
import { useEvaluationList } from './hooks/useEvaluationList';

const EvaluationHome = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { evaluations, loading, refreshList } = useEvaluationList();  // ✅ CAMBIO: refreshList en lugar de refetch

  const handleEvaluationCreated = (evaluation) => {
    setShowCreateModal(false);
    refreshList();  // ✅ CAMBIO: usar refreshList
    navigate(`/evaluation/${evaluation.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Floating Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">
                Supply Chain Planning Maturity Assessment 
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your evaluation process
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="group relative"
            >
              {/* Outer glow circle */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Main button */}
              <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>
          </div>

          {/* KPI Cards */}
          {!loading && <KPICards evaluations={evaluations} />}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <EvaluationList />
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateEvaluationModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleEvaluationCreated}
        />
      )}
    </div>
  );
};

export default EvaluationHome;