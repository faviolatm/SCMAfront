// src/pages/Evaluation/EvaluationHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EvaluationList from './components/EvaluationHome/EvaluationList';
import AnalyticsDashboard from './AnalyticsDashboard';
import CreateEvaluationModal from './components/EvaluationHome/CreateEvaluationModal';
import KPICards from './components/EvaluationHome/KPICards';
import { useEvaluationList } from './hooks/useEvaluationList';

const EvaluationHome = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('evaluations'); // ✅ NUEVO: 'evaluations' o 'analytics'
  const { evaluations, loading, refreshList } = useEvaluationList();

  const handleEvaluationCreated = (evaluation) => {
    setShowCreateModal(false);
    refreshList();
    navigate(`/evaluation/${evaluation.id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              
              {/* User Info */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {currentUser?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{currentUser?.name}</p>
                    <p className="text-gray-400 text-xs">{currentUser?.userid}</p>
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="px-3 py-1 bg-purple-500/20 border border-purple-500 rounded-full">
                    <span className="text-purple-300 text-xs font-bold">ADMIN</span>
                  </div>
                )}
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500 text-gray-300 hover:text-red-400 rounded-lg text-sm font-semibold transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>
          </div>

          {/* KPI Cards */}
          {!loading && activeTab === 'evaluations' && <KPICards evaluations={evaluations} />}

          {/* ✅ NUEVO: Tabs (solo si es admin) */}
          {isAdmin && (
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setActiveTab('evaluations')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                  activeTab === 'evaluations'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-lg'
                    : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Evaluations
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500 shadow-lg'
                    : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Content - Conditional rendering */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'evaluations' ? (
          <EvaluationList />
        ) : (
          <AnalyticsDashboard />
        )}
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