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
    console.log('🔍 ===== CHECKING ADMIN STATUS =====');
    setCheckingAdmin(true);
    
    try {
      console.log('🔍 Calling AnalyticsSuiteService.checkAdmin()...');
      const result = await AnalyticsSuiteService.checkAdmin();
      
      console.log('🔍 Admin check response:', result);
      console.log('🔍 User ID:', result.user_id);
      console.log('🔍 Is Admin:', result.is_admin);
      
      setIsAdmin(result.is_admin || false);
      
      if (result.is_admin) {
        console.log('✅ Admin check: IS ADMIN');
      } else {
        console.log('❌ Admin check: NOT ADMIN');
      }
      
    } catch (error) {
      console.error('❌ Error checking admin status:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false);
      console.log('🔍 ===== ADMIN CHECK COMPLETE =====');
    }
  }, []);

  // Verificar admin al montar
  useEffect(() => {
    console.log('🚀 useAnalytics mounted, checking admin...');
    checkAdminStatus();
  }, [checkAdminStatus]);

  // ==================== DATA LOADING ====================
  
  /**
   * Carga los dashboards de una sección desde la BD
   */
  const loadSectionData = useCallback(async (sectionName = currentSection) => {
    if (!sectionName) {
      console.warn('⚠️ loadSectionData called without section name');
      return;
    }
    
    console.log(`📊 ===== LOADING SECTION DATA =====`);
    console.log(`📊 Section: ${sectionName}`);
    
    setLoading(true);
    setError(null);
    
    try {
      console.log(`📊 Calling AnalyticsDashboardService.getUrlsBySection("${sectionName}")...`);
      
      const response = await AnalyticsDashboardService.getUrlsBySection(sectionName);
      
      console.log(`📊 Response received:`, response);
      console.log(`📊 Number of dashboards: ${response?.length || 0}`);
      
      if (response && response.length > 0) {
        console.log(`📊 First dashboard:`, response[0]);
        console.log(`📊 Has image_url: ${!!response[0]?.image_url}`);
        console.log(`📊 Has has_image: ${!!response[0]?.has_image}`);
      }
      
      setAnalyticsData(response || []);
      console.log('✅ Section data loaded successfully');
      
    } catch (error) {
      console.error('❌ Error loading section data:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      setError(error.message || 'Error loading dashboards');
      setAnalyticsData([]);
    } finally {
      setLoading(false);
      console.log('📊 ===== SECTION DATA LOADING COMPLETE =====');
    }
  }, [currentSection]);

  /**
   * Refresca los datos de la sección actual
   */
  const handleDataUpdate = useCallback(async () => {
    if (!currentSection) {
      console.warn('⚠️ handleDataUpdate called but no section selected');
      return;
    }
    
    console.log(`🔄 ===== REFRESHING DATA =====`);
    console.log(`🔄 Section: ${currentSection}`);
    
    await loadSectionData(currentSection);
    
    console.log('🔄 ===== REFRESH COMPLETE =====');
  }, [currentSection, loadSectionData]);

  // Auto-cargar datos cuando cambia la sección
  useEffect(() => {
    if (currentSection && currentView === 'section') {
      console.log(`🔄 Section or view changed, loading data...`);
      console.log(`🔄 Current section: ${currentSection}`);
      console.log(`🔄 Current view: ${currentView}`);
      loadSectionData();
    }
  }, [currentSection, currentView, loadSectionData]);

  // ==================== NAVIGATION HANDLERS ====================

  /**
   * Navega a la vista principal (cards de BI y AI)
   */
  const handleBackToMain = useCallback(() => {
    console.log('🔙 Navigating back to main view');
    setCurrentView('main');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  /**
   * Navega a la lista de opciones BI
   */
  const handleBIClick = useCallback(() => {
    console.log('🎯 BI card clicked');
    setCurrentView('bi');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, []);

  /**
   * Navega a la lista de opciones AI
   */
  const handleAIClick = useCallback(() => {
    console.log('🎯 AI card clicked');
    setCurrentView('ai');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, []);

  /**
   * Regresa a la lista de opciones BI
   */
  const handleBackToBIOptions = useCallback(() => {
    console.log('🔙 Navigating back to BI options');
    setCurrentView('bi');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  /**
   * Regresa a la lista de opciones AI
   */
  const handleBackToAIOptions = useCallback(() => {
    console.log('🔙 Navigating back to AI options');
    setCurrentView('ai');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  /**
   * Maneja el clic en una opción BI (carga sus dashboards)
   */
  const handleBIOptionClick = useCallback((optionName) => {
    console.log(`🎯 ===== BI OPTION CLICKED =====`);
    console.log(`🎯 Option: ${optionName}`);
    
    setCurrentSection(optionName);
    setCurrentView('section');
    setLoading(true);
    setError(null);
    setAnalyticsData([]);
    
    console.log(`🎯 State updated, will load section data...`);
  }, []);

  /**
   * Maneja el clic en una opción AI (navega a su ruta)
   */
  const handleAIOptionClick = useCallback((optionName) => {
    console.log(`🎯 ===== AI OPTION CLICKED =====`);
    console.log(`🎯 Option: ${optionName}`);
    
    const selectedOption = allAIOptions.find(opt => opt.name === optionName);
    
    if (selectedOption?.route) {
      console.log(`🎯 Navigating to: ${selectedOption.route}`);
      navigate(selectedOption.route);
    } else {
      console.error('❌ No route configured for:', optionName);
      setError('Route not configured for this option');
    }
  }, [navigate, allAIOptions]);

  // ==================== DEBUG INFO ON STATE CHANGES ====================
  
  useEffect(() => {
    console.log('📊 ===== STATE UPDATE =====');
    console.log('📊 Current View:', currentView);
    console.log('📊 Current Section:', currentSection);
    console.log('📊 Is Admin:', isAdmin);
    console.log('📊 Checking Admin:', checkingAdmin);
    console.log('📊 Loading:', loading);
    console.log('📊 Data Count:', analyticsData.length);
    console.log('📊 Error:', error);
    console.log('📊 =====================');
  }, [currentView, currentSection, isAdmin, checkingAdmin, loading, analyticsData, error]);

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
