// src/pages/Evaluation/components/KPICards.jsx
import React from 'react';

const KPICards = ({ evaluations = [] }) => {  // ✅ Recibir array de evaluaciones
  // ✅ Calcular estadísticas reales
  const stats = {
    total: evaluations.length,
    completed: evaluations.filter(e => e.status === 'completed').length,
    inProgress: evaluations.filter(e => e.status === 'in_progress').length,
    pending: evaluations.filter(e => e.status === 'pending').length
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Total */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-blue-500 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">Total Evaluations</p>
            <p className="text-4xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-green-500 rounded-2xl p-5 hover:border-green-400 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">Completed</p>
            <p className="text-4xl font-bold text-white">{stats.completed}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-orange-500 rounded-2xl p-5 hover:border-orange-400 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium mb-1">In Progress</p>
            <p className="text-4xl font-bold text-white">{stats.inProgress}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;