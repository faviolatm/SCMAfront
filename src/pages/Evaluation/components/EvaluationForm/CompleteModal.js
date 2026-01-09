// src/pages/Evaluation/components/CompleteModal.jsx
import React from 'react';

const CompleteModal = ({ onConfirm, onCancel, isComplete, progress }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl max-w-md w-full transform animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-6 rounded-t-2xl border-b-2 border-orange-700">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold">Complete Evaluation</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {isComplete ? (
            <>
              <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-center text-green-400 mb-2">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-lg">All questions answered</span>
                </div>
                <div className="text-center text-green-300 text-sm">
                  {progress.answered} of {progress.total} responses recorded
                </div>
              </div>

              <p className="text-gray-300 text-center mb-6 leading-relaxed">
                Are you sure you want to complete this evaluation? 
                <span className="block mt-2 font-semibold text-orange-400">
                  You won't be able to modify your answers after completion.
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-center text-amber-400 mb-2">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-lg">Incomplete</span>
                </div>
                <div className="text-center text-amber-300 text-sm">
                  {progress.answered} of {progress.total} questions answered
                </div>
              </div>

              <p className="text-gray-300 text-center mb-6 leading-relaxed">
                You still have{' '}
                <span className="font-bold text-orange-400">
                  {progress.total - progress.answered} unanswered question
                  {progress.total - progress.answered !== 1 ? 's' : ''}
                </span>
                . Please complete all questions before submitting.
              </p>
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 hover:border-gray-500 text-gray-300 font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
            {isComplete && (
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-[1.02]"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;