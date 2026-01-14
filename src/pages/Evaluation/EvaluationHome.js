// src/pages/Evaluation/EvaluationHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EvaluationList from './components/EvaluationHome/EvaluationList';
import AnalyticsDashboard from './AnalyticsDashboard';
import CreateEvaluationModal from './components/EvaluationHome/CreateEvaluationModal';
import KPICards from './components/EvaluationHome/KPICards';
import UserInfoCard from './components/EvaluationHome/UserInfoCard';
import TabNavigation from './components/EvaluationHome/TabNavigation';
import CreateEvaluationButton from './components/EvaluationHome/CreateEvaluationButton';
import { useEvaluationList } from './hooks/useEvaluationList';

const EvaluationHome = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('evaluations');
  
  const { evaluations, loading } = useEvaluationList();

  const handleEvaluationCreated = (evaluation) => {
    setShowCreateModal(false);
    navigate(`/evaluation/${evaluation.id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Title + Tabs + User Info */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-2">
                Supply Chain Planning Maturity Assessment
              </h1>
              <p className="text-gray-400 text-lg mb-6">
                Manage your evaluation process
              </p>

              {/* Tabs - Moved here, below title */}
              {isAdmin && (
                <TabNavigation 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
              )}
            </div>

            {/* Right Side: Create Button */}
            <CreateEvaluationButton onClick={() => setShowCreateModal(true)} />
          </div>

          {/* User Info Section */}
          <div className="mb-6">
            <UserInfoCard 
              currentUser={currentUser} 
              onLogout={handleLogout} 
            />
          </div>

          {/* KPI Cards */}
          {!loading && activeTab === 'evaluations' && (
            <KPICards evaluations={evaluations} />
          )}
        </div>
      </div>

      {/* Content */}
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