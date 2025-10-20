// hooks/useAnalytics.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite/AnalyticsSuite_service';
import AnalyticsAccessService from '../../../services/AnalyticsSuite/AnalyticsAccessService';

export const useAnalytics = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('main');
  const [currentSection, setCurrentSection] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true); // Iniciamos en true para verificar acceso
  const [error, setError] = useState(null);
  
  // Estados para control de acceso
  const [accessInfo, setAccessInfo] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [availableCards, setAvailableCards] = useState([]);

  // Opciones BI base (se filtrarán según permisos)
  const allBIOptions = [
    //{ name: 'DC Management', color: 'slate-800', cardKey: 'bi_card' },
    { name: 'Global Freight', color: 'slate-800', cardKey: 'bi_card' },
    { name: 'DC Quality & Operations', color: 'slate-800', cardKey: 'bi_card' },
    { name: 'Freight Audit & Pay (FAP)', color: 'slate-800', cardKey: 'bi_card' },
    { name: 'Global Control Tower', color: 'slate-800', cardKey: 'bi_card' },
    { name: 'Global Planning & ESH', color: 'slate-800', cardKey: 'bi_card' }
  ];

  // Opciones BI filtradas según permisos del usuario
  const biOptions = hasAccess && availableCards.some(card => card.key === 'bi_card') 
    ? allBIOptions 
    : [];

  // Verificar si es admin
  const isAdmin = ['TE605135', 'TE407929', 'TE589552', 'TE535073', 'TE588075', 'TE587267', 'TE558231', 'TE595382'  ]
  .includes(UserService.getCurrentUserId());

  // Función para verificar acceso inicial
  const checkUserAccess = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const accessData = await AnalyticsAccessService.getAllAccessInfo();
      
      if (accessData.error) {
        setError(accessData.error);
        setHasAccess(false);
        setAccessInfo(null);
        setAvailableCards([]);
      } else {
        setHasAccess(accessData.hasAccess);
        setAccessInfo(accessData);
        setAvailableCards(accessData.cards || []);
        
        if (!accessData.hasAccess) {
          setError('No tienes permisos para acceder a Analytics Suite');
        }
      }
    } catch (error) {
      console.error('💥 Error checking access:', error);
      setError('Error verificando permisos de acceso');
      setHasAccess(false);
      setAccessInfo(null);
      setAvailableCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar acceso al cargar el componente
  useEffect(() => {
    checkUserAccess();
  }, [checkUserAccess]);

  // Función para cargar datos de sección
  const loadSectionData = useCallback(async (sectionName = currentSection) => {
    if (!sectionName || !hasAccess) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await AnalyticsSuiteService.getUrlsBySection(sectionName);
      setAnalyticsData(response || []);
    } catch (error) {
      console.error('Error loading section data:', error);
      setError(error.message || 'Error loading data');
      setAnalyticsData([]);
    } finally {
      setLoading(false);
    }
  }, [currentSection, hasAccess]);

  // Cargar datos cuando cambia la sección
  useEffect(() => {
    if (currentSection && currentView === 'section' && hasAccess) {
      loadSectionData();
    }
  }, [currentSection, currentView, loadSectionData, hasAccess]);

  // Manejar clic en opción BI
  const handleBIOptionClick = useCallback((optionName) => {
    if (!hasAccess) {
      setError('No tienes permisos para acceder a esta sección');
      return;
    }
    
    setCurrentSection(optionName);
    setCurrentView('section');
    setLoading(true);
    setError(null);
    setAnalyticsData([]);
  }, [hasAccess]);

  // Manejar clic en AI
  const handleAIClick = useCallback(async () => {
    if (!hasAccess) {
      setError('No tienes permisos para acceder a Analytics Suite');
      return;
    }
    
    // Verificar si tiene acceso específico a AI
    const hasAIAccess = availableCards.some(card => card.key === 'ai_card');
    
    if (!hasAIAccess) {
      setError('No tienes permisos para acceder a la sección de AI');
      return;
    }
    
    // Si tiene acceso, navegar (por ahora a not-found, luego implementar AI)
    navigate('/not-found');
  }, [hasAccess, availableCards, navigate]);
  
  // Manejar clic en BI
  const handleBIClick = useCallback(async () => {
    if (!hasAccess) {
      setError('No tienes permisos para acceder a Analytics Suite');
      return;
    }
    
    // Verificar si tiene acceso específico a BI
    const hasBIAccess = availableCards.some(card => card.key === 'bi_card');
    
    if (!hasBIAccess) {
      setError('No tienes permisos para acceder a la sección de BI');
      return;
    }
    
    setCurrentView('bi');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, [hasAccess, availableCards]);
  
  // Otras funciones de navegación
  const handleBackToMain = useCallback(() => {
    setCurrentView('main');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);
  
  const handleBackToBIOptions = useCallback(() => {
    setCurrentView('bi');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  // Función para actualizar datos
  const handleDataUpdate = useCallback(() => {
    if (currentSection) {
      loadSectionData();
    } else {
      checkUserAccess();
    }
  }, [loadSectionData, checkUserAccess, currentSection]);

  // Función para recargar configuración (solo admin)
  const handleConfigReload = useCallback(async () => {
    if (!isAdmin) return;
    
    try {
      setLoading(true);
      const result = await AnalyticsAccessService.reloadConfig();
      
      // Recargar acceso después de actualizar config
      await checkUserAccess();
    } catch (error) {
      console.error('Error reloading config:', error);
      setError('Error recargando configuración');
    } finally {
      setLoading(false);
    }
  }, [isAdmin, checkUserAccess]);

  return {
    // Estados básicos
    currentView,
    currentSection,
    biOptions,
    isAdmin,
    analyticsData,
    loading,
    error,
    
    // Estados de acceso
    hasAccess,
    accessInfo,
    availableCards,
    
    // Funciones de navegación
    handleAIClick,
    handleBIClick,
    handleBIOptionClick,
    handleBackToMain,
    handleBackToBIOptions,
    handleDataUpdate,
    
    // Funciones adicionales
    handleConfigReload,
    checkUserAccess
  };
};