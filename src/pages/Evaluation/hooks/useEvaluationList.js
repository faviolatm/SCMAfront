// src/pages/Evaluation/hooks/useEvaluationList.js
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import EvaluationService from '../../../services/EvaluationService';

export const useEvaluationList = () => {
  const { currentUser } = useAuth();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState(null);
  
  // Estado de filtros
  const [filters, setFilters] = useState({
    status: 'all',
    business_unit: null,
    region: null,
    building: null
  });

  // ✅ NUEVO: Ref para evitar múltiples cargas
  const isInitialMount = useRef(true);
  const isLoadingRef = useRef(false);

  // ✅ Cargar opciones de filtros SOLO al montar y cuando cambie el usuario
  useEffect(() => {
    if (currentUser && !filterOptions) {
      loadFilterOptions();
    }
  }, [currentUser]);

  // ✅ Cargar evaluaciones cuando cambian los filtros (pero NO en el primer mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (currentUser) {
        loadEvaluations();
      }
      return;
    }

    if (currentUser) {
      loadEvaluations();
    }
  }, [filters]); // ✅ Solo dependencia: filters

  const loadFilterOptions = async () => {
    try {
      console.log('📡 Loading filter options...');
      const options = await EvaluationService.getFilterOptions(currentUser.userid);
      console.log('✅ Filter options loaded:', options);
      setFilterOptions(options);
    } catch (error) {
      console.error('❌ Error loading filter options:', error);
      setFilterOptions(null);
    }
  };

  const loadEvaluations = async () => {
    // ✅ Evitar múltiples cargas simultáneas
    if (isLoadingRef.current) {
      console.log('⏸️ Ya hay una carga en progreso, esperando...');
      return;
    }

    isLoadingRef.current = true;
    console.log('📡 Loading evaluations with filters:', filters);
    setLoading(true);
    
    try {
      // ✅ Construir filtros para enviar al backend
      const filtersToSend = {
        status: filters.status !== 'all' ? filters.status : null,
        business_unit: filters.business_unit,
        region: filters.region,
        building: filters.building
      };
      
      console.log('📤 Sending filters to backend:', filtersToSend);
      
      const data = await EvaluationService.getEvaluations(
        currentUser.userid,
        filtersToSend
      );
      
      console.log('✅ Evaluations loaded:', data?.length || 0);
      setEvaluations(data || []);
      
    } catch (error) {
      console.error('❌ Error loading evaluations:', error);
      setEvaluations([]);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
      console.log('🏁 Loading finished');
    }
  };

  const updateFilter = (filterName, value) => {
    console.log(`🎯 Updating filter ${filterName}:`, value);
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    console.log('🧹 Clearing all filters');
    setFilters({
      status: 'all',
      business_unit: null,
      region: null,
      building: null
    });
  };

  const refreshList = () => {
    console.log('🔄 Refreshing list...');
    loadEvaluations();
  };

  // Helper para info de permisos (simplificado - sin descripciones largas)
  const getPermissionInfo = () => {
    if (!currentUser) return null;
    
    const level = currentUser.scma_level;
    
    const info = {
      1: { level: 1, icon: '🌐', label: 'Admin' },
      2: { level: 2, icon: '🏢', label: 'BU Manager' },
      3: { level: 3, icon: '🌎', label: 'Regional' },
      4: { level: 4, icon: '🏭', label: 'Plant' },
      5: { level: 5, icon: '👤', label: 'Individual' }
    };
    
    return info[level] || info[5];
  };

  return {
    evaluations,
    loading,
    filters,
    filterOptions,
    updateFilter,
    clearFilters,
    refreshList,
    permissionInfo: getPermissionInfo()
  };
};