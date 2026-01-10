// src/pages/Evaluation/hooks/useEvaluationList.js
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import EvaluationService from '../../../services/EvaluationService';

export const useEvaluationList = () => {
  const { currentUser, isAdmin } = useAuth();
  const [evaluations, setEvaluations] = useState([]);
  const [allEvaluations, setAllEvaluations] = useState([]); // ✅ NUEVO: Guardar todas
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'in_progress', 'completed'

  // ✅ Cargar evaluaciones cuando cambia el usuario o rol
  useEffect(() => {
    console.log('🔄 useEvaluationList - Effect triggered');
    console.log('👤 currentUser:', currentUser);
    console.log('🔑 isAdmin:', isAdmin);

    if (currentUser) {
      loadEvaluations();
    } else {
      console.log('⚠️ No currentUser, skipping load');
      setLoading(false);
    }
  }, [currentUser, isAdmin]);

  // ✅ Filtrar cuando cambia el filtro
  useEffect(() => {
    applyFilter();
  }, [filter, allEvaluations]);

  const loadEvaluations = async () => {
    console.log('📡 Starting loadEvaluations...');
    setLoading(true);
    
    try {
      let data;
      
      console.log('📊 Loading with:', { isAdmin, userid: currentUser?.userid });
      
      // ✅ Cargar TODAS las evaluaciones (sin filtro de status)
      if (isAdmin) {
        console.log('🔓 Admin mode - loading ALL evaluations');
        data = await EvaluationService.getEvaluations(null); // Sin filtro
      } else {
        console.log('🔒 User mode - loading USER evaluations');
        data = await EvaluationService.getUserEvaluations(currentUser.userid, null); // Sin filtro
      }
      
      console.log('✅ Evaluations loaded:', data);
      setAllEvaluations(data || []); // Guardar todas
      
    } catch (error) {
      console.error('❌ Error loading evaluations:', error);
      setAllEvaluations([]);
    } finally {
      setLoading(false);
      console.log('🏁 Loading finished');
    }
  };

  const applyFilter = () => {
    console.log('🎯 Applying filter:', filter);
    
    if (filter === 'all') {
      setEvaluations(allEvaluations);
    } else {
      const filtered = allEvaluations.filter(e => e.status === filter);
      setEvaluations(filtered);
    }
  };

  const refreshList = () => {
    console.log('🔄 Refreshing list...');
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