// hooks/useAnalytics.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsDashboardService from '../../../services/AnalyiticsDashboards/Analytics_dashboards';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite_service';

/**
 * Custom hook para manejar la lógica de Analytics Suite
 * Maneja navegación, permisos de admin, y carga de dashboards
 */
export const useAnalytics = () => {
  const navigate = useNavigate();
  
  // ==================== STATE ====================
  const [currentView, setCurrentView] = useState('main');
  const [currentSection, setCurrentSection] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  // ==================== STATIC OPTIONS ====================
  
  const allBIOptions = useMemo(() => [
    { name: 'Global Freight', color: 'slate-800' },
    { name: 'DC Quality & Operations', color: 'slate-800' },
    { name: 'Freight Audit & Pay (FAP)', color: 'slate-800' },
    { name: 'Global Control Tower', color: 'slate-800' },
    { name: 'Global Planning & ESH', color: 'slate-800' }
  ], []);

  const allAIOptions = useMemo(() => [
    { 
      name: 'InsightEdge', 
      color: 'slate-800',
      description: 'Advanced part lookup and BOM analysis with AI-powered insights',
      route: '/analytics-suite/insightedge'
    }
  ], []);

  // ==================== ADMIN CHECK ====================
  
  /**
   * Verifica si el usuario actual es admin
   * Se ejecuta solo una vez al montar el componente
   */
  const checkAdminStatus = useCallback(async () => {
    setCheckingAdmin(true);
    
    try {
      const result = await AnalyticsSuiteService.checkAdmin();
      setIsAdmin(result.is_admin || false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false);
    }
  }, []);

  // Verificar admin al montar
  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  // ==================== DATA LOADING ====================
  
  /**
   * Carga los dashboards de una sección desde la BD
   */
  const loadSectionData = useCallback(async (sectionName = currentSection) => {
    if (!sectionName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await AnalyticsDashboardService.getUrlsBySection(sectionName);
      setAnalyticsData(response || []);
    } catch (error) {
      console.error('Error loading section data:', error);
      setError(error.message || 'Error loading dashboards');
      setAnalyticsData([]);
    } finally {
      setLoading(false);
    }
  }, [currentSection]);

  /**
   * Refresca los datos de la sección actual
   */
  const handleDataUpdate = useCallback(async () => {
    if (!currentSection) return;
    await loadSectionData(currentSection);
  }, [currentSection, loadSectionData]);

  // Auto-cargar datos cuando cambia la sección
  useEffect(() => {
    if (currentSection && currentView === 'section') {
      loadSectionData();
    }
  }, [currentSection, currentView, loadSectionData]);

  // ==================== NAVIGATION HANDLERS ====================

  /**
   * Navega a la vista principal (cards de BI y AI)
   */
  const handleBackToMain = useCallback(() => {
    setCurrentView('main');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  /**
   * Navega a la lista de opciones BI
   */
  const handleBIClick = useCallback(() => {
    setCurrentView('bi');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, []);

  /**
   * Navega a la lista de opciones AI
   */
  const handleAIClick = useCallback(() => {
    setCurrentView('ai');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, []);

  /**
   * Regresa a la lista de opciones BI
   */
  const handleBackToBIOptions = useCallback(() => {
    setCurrentView('bi');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  /**
   * Regresa a la lista de opciones AI
   */
  const handleBackToAIOptions = useCallback(() => {
    setCurrentView('ai');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  /**
   * Maneja el clic en una opción BI (carga sus dashboards)
   */
  const handleBIOptionClick = useCallback((optionName) => {
    setCurrentSection(optionName);
    setCurrentView('section');
    setLoading(true);
    setError(null);
    setAnalyticsData([]);
  }, []);

  /**
   * Maneja el clic en una opción AI (navega a su ruta)
   */
  const handleAIOptionClick = useCallback((optionName) => {
    const selectedOption = allAIOptions.find(opt => opt.name === optionName);
    
    if (selectedOption?.route) {
      navigate(selectedOption.route);
    } else {
      console.error('No route configured for:', optionName);
      setError('Route not configured for this option');
    }
  }, [navigate, allAIOptions]);

  // ==================== RETURN ====================

  return {
    // View state
    currentView,
    currentSection,
    
    // Options
    biOptions: allBIOptions,
    aiOptions: allAIOptions,
    
    // Data state
    analyticsData,
    loading,
    error,
    
    // Admin state
    isAdmin,
    checkingAdmin,
    
    // Navigation handlers
    handleBackToMain,
    handleBIClick,
    handleAIClick,
    handleBIOptionClick,
    handleAIOptionClick,
    handleBackToBIOptions,
    handleBackToAIOptions,
    
    // Data handlers
    handleDataUpdate,
    loadSectionData
  };
};