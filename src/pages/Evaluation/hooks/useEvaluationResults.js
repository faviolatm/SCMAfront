// src/hooks/useEvaluationResults.js
import { useState, useEffect } from 'react';
import ResponseService from '../../../services/ResponseService';

/**
 * Custom hook to manage evaluation results
 */
export const useEvaluationResults = (evaluationId) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (evaluationId) {
      loadResults();
    }
  }, [evaluationId]);

  const loadResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ResponseService.getResults(evaluationId);
      setResults(data);
    } catch (err) {
      console.error('Error loading results:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportResults = async (format = 'pdf') => {
    try {
      const blob = await ResponseService.exportResults(evaluationId, format);
      
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `evaluation-${evaluationId}-results.${format}`;
        link.click();
        window.URL.revokeObjectURL(url);
        return { success: true };
      }
      
      return { success: false, message: 'Export failed' };
    } catch (error) {
      console.error('Error exporting results:', error);
      return { success: false, message: error.message };
    }
  };

  return {
    results,
    loading,
    error,
    exportResults
  };
};