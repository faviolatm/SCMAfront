// src/hooks/useEvaluationList.js
import { useState, useEffect } from 'react';
import EvaluationService from '../../../services/EvaluationService';

/**
 * Custom hook to manage evaluation list
 */
export const useEvaluationList = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  useEffect(() => {
    loadEvaluations();
  }, [filter]);

  const loadEvaluations = async () => {
    setLoading(true);
    try {
      // Always get all evaluations
      const data = await EvaluationService.getEvaluations(null);
      
      // Filter on client side
      if (filter === 'all') {
        setEvaluations(data || []);
      } else {
        const filtered = (data || []).filter(evaluation => evaluation.status === filter);
        setEvaluations(filtered);
      }
    } catch (error) {
      console.error('Error loading evaluations:', error);
      setEvaluations([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshList = () => {
    loadEvaluations();
  };

  return {
    evaluations,
    loading,
    filter,
    setFilter,
    refreshList
  };
};