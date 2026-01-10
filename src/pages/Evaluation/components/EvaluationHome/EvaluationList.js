// src/pages/Evaluation/components/EvaluationList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluationList } from '../../hooks/useEvaluationList';
import EvaluationSummary from '../EvaluationSummary';

const EvaluationList = () => {
  const navigate = useNavigate();
  const { evaluations, loading, filter, setFilter } = useEvaluationList();
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calcular paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvaluations = evaluations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(evaluations.length / itemsPerPage);

  // Resetear a página 1 cuando cambia el filtro
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

    const getStatusConfig = (status) => {
    const configs = {
      in_progress: {
        color: 'from-orange-500 to-amber-500',
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500',
        label: 'In Progress'
      },
      completed: {
        color: 'from-green-500 to-green-600',
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500',
        label: 'Completed'
      }
    };
    return configs[status] || configs.in_progress; // Default fallback
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEvaluationClick = (evaluation) => {
    if (evaluation.status === 'completed') {
      navigate(`/evaluation/${evaluation.id}/results`);
    } else {
      navigate(`/evaluation/${evaluation.id}`);
    }
  };

  const handleQuickView = (e, evaluationId) => {
    e.stopPropagation();
    setSelectedEvaluationId(evaluationId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-xl p-10 text-center">
        <div className="inline-block w-12 h-12 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-medium">Loading evaluations...</p>
      </div>
    );
  };

  return (
    <div>
    {/* Filter Pills */}
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => setFilter('all')}
        className={`px-5 py-2.5 rounded-full font-semibold transition-all border-2 ${
          filter === 'all'
            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30 border-orange-500'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700 hover:border-gray-600'
        }`}
      >
        All ({evaluations.length})
      </button>
      
      <button
        onClick={() => setFilter('in_progress')}
        className={`px-5 py-2.5 rounded-full font-semibold transition-all border-2 ${
          filter === 'in_progress'
            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30 border-orange-500'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700 hover:border-gray-600'
        }`}
      >
        In Progress
      </button>
      
      <button
        onClick={() => setFilter('completed')}
        className={`px-5 py-2.5 rounded-full font-semibold transition-all border-2 ${
          filter === 'completed'
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30 border-green-500'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700 hover:border-gray-600'
        }`}
      >
        Completed
      </button>
    </div>

      {/* Evaluations Grid */}
      {evaluations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentEvaluations.map((evaluation) => {
              const statusConfig = getStatusConfig(evaluation.status);
              
              return (
                <div
                  key={evaluation.id}
                  onClick={() => handleEvaluationClick(evaluation)}
                  className={`bg-gray-800/50 backdrop-blur-sm border-2 ${statusConfig.border} rounded-xl hover:border-opacity-100 hover:shadow-lg transition-all cursor-pointer p-5 group hover:-translate-y-1`}
                >
                  {/* Header with circular status */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Status Circle */}
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${statusConfig.color} flex items-center justify-center flex-shrink-0`}>
                      {evaluation.status === 'completed' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {evaluation.status === 'in_progress' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {evaluation.status === 'pending' && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>

                    {/* Title and Status */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1.5 truncate">
                        {evaluation.name}
                      </h3>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">
                        {evaluation.evaluator_userid || evaluation.evaluator_name || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(evaluation.created_at)}</span>
                    </div>

                    {evaluation.completed_at && (
                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-xs">Completed {formatDate(evaluation.completed_at)}</span>
                      </div>
                    )}
                  </div>

                  {/* Description if exists */}
                  {evaluation.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {evaluation.description}
                    </p>
                  )}

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                    <span className="text-xs text-gray-500">
                      {evaluation.status === 'completed' ? 'View results' : 'Continue evaluation'}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {evaluation.status === 'completed' && (
                        <button
                          onClick={(e) => handleQuickView(e, evaluation.id)}
                          className={`px-3 py-1 ${statusConfig.bg} ${statusConfig.text} rounded-lg text-xs font-semibold hover:bg-opacity-80 transition-all border ${statusConfig.border}`}
                        >
                          Quick View
                        </button>
                      )}
                      <div className="w-7 h-7 rounded-full bg-gray-700 group-hover:bg-orange-500 flex items-center justify-center transition-all">
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {/* Botón Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  currentPage === 1
                    ? 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-orange-500 hover:text-orange-400'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Números de página */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Mostrar solo las páginas cercanas a la actual
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all border-2 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-lg shadow-orange-500/30'
                          : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="text-gray-600 px-2">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              {/* Botón Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-orange-500 hover:text-orange-400'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-gray-600">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-white font-semibold text-lg mb-2">No evaluations found</p>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Create a new evaluation to get started'
              : `No ${filter} evaluations at the moment`
            }
          </p>
        </div>
      )}

      {/* Summary Modal */}
      {selectedEvaluationId && (
        <EvaluationSummary
          evaluationId={selectedEvaluationId}
          onClose={() => setSelectedEvaluationId(null)}
        />
      )}
    </div>
  );
};

export default EvaluationList;