// src/pages/Evaluation/EvaluationForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvaluationForm } from './hooks/useEvaluationForm';
import ProgressSidebar from './components/EvaluationForm/ProgressSidebar';
import CategoryCard from './components/EvaluationForm/CategoryCard';
import CompleteModal from './components/EvaluationForm/CompleteModal';
import LoadingOverlay from './components/EvaluationForm/LoadingOverlay';


const EvaluationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  const {
    evaluation,
    formStructure,
    responses,
    loading,
    saving,
    selectOption,
    completeEvaluation,
    calculateProgress
  } = useEvaluationForm(id);

  const handleComplete = async () => {
    const result = await completeEvaluation();
    
    if (result.success) {
      setShowCompleteModal(false);
      // Pequeño delay para que vean el éxito
      setTimeout(() => {
        navigate('/evaluations');
      }, 1500);
    } else {
      alert(result.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 font-semibold text-lg">Loading evaluation...</p>
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-400 font-bold text-xl mb-4">Evaluation not found</p>
          <button
            onClick={() => navigate('/evaluations')}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-lg transition-all shadow-lg"
          >
            Back to list
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = evaluation.status === 'completed';
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Loading Overlay */}
      {saving && <LoadingOverlay message="Saving your responses..." />}
      
      {/* Complete Modal */}
      {showCompleteModal && (
        <CompleteModal
          onConfirm={handleComplete}
          onCancel={() => setShowCompleteModal(false)}
          isComplete={progress.isComplete}
          progress={progress}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <ProgressSidebar
          evaluation={evaluation}
          progress={progress}
          isCompleted={isCompleted}
          onBack={() => navigate('/evaluations')}
          categories={formStructure}
          responses={responses}
        />

        {/* Main Content - Full Width */}
        <div className="flex-1 ml-80 min-h-screen">
          <div className="p-2">
            {formStructure.length > 0 ? (
              <>
                {formStructure.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    responses={responses}
                    onOptionSelect={selectOption}
                    isCompleted={isCompleted}
                  />
                ))}
                
                {/* Complete Button at Bottom */}
                {!isCompleted && (
                  <div className="sticky bottom-0 py-6 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent">
                    <button
                      onClick={() => setShowCompleteModal(true)}
                      disabled={!progress.isComplete || saving}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-2xl border-2 ${
                        progress.isComplete && !saving
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-orange-500 shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-[1.01]'
                          : 'bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {progress.isComplete 
                        ? 'Complete Evaluation' 
                        : `Answer all questions (${progress.answered}/${progress.total})`
                      }
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl p-12 text-center">
                <svg className="w-20 h-20 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-lg font-semibold">No categories configured in the system.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;