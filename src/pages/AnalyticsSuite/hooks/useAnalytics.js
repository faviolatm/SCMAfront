// hooks/useAnalytics.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite/AnalyticsSuite_service';

export const useAnalytics = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('main');
  const [currentSection, setCurrentSection] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // 🔹 NUEVOS - Estados de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  // Opciones BI (ahora públicas)
  const allBIOptions = useMemo(() => [
    { name: 'Global Freight', color: 'slate-800' },
    { name: 'DC Quality & Operations', color: 'slate-800' },
    { name: 'Freight Audit & Pay (FAP)', color: 'slate-800' },
    { name: 'Global Control Tower', color: 'slate-800' },
    { name: 'Global Planning & ESH', color: 'slate-800' }
  ], []);

  // Opciones AI (ahora públicas)
  const allAIOptions = useMemo(() => [
    { 
      name: 'InsightEdge', 
      color: 'slate-800',
      description: 'Advanced part lookup and BOM analysis with AI-powered insights',
      route: '/analytics-suite/insightedge'
    }
  ], []);

  // 🔹 NUEVO - Verificar autenticación y permisos
  const checkAuthStatus = useCallback(async () => {
    const storedToken = localStorage.getItem('analytics_token');
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      
      // Verificar si es admin
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analytics-suite/admin/check`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        const data = await response.json();
        setIsAdmin(data.is_admin);
        setUserInfo({ user_id: data.user_id });
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setToken(null);
      setUserInfo(null);
    }
  }, []);

  // 🔹 Verificar autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
    setLoading(false);
  }, [checkAuthStatus]);

  // 🔹 MODIFICADO - Cargar datos de sección (ahora público, pero pasa token si existe)
  const loadSectionData = useCallback(async (sectionName = currentSection) => {
    if (!sectionName) return;
    
    setLoading(true);
    setError(null);
   
    try {
      // Las URLs son públicas, no necesita autenticación
      const response = await AnalyticsSuiteService.getUrlsBySection(sectionName);
      setAnalyticsData(response || []);
    } catch (error) {
      console.error('Error loading section data:', error);
      setError(error.message || 'Error loading data');
      setAnalyticsData([]);
    } finally {
      setLoading(false);
    }
  }, [currentSection]);

  // Cargar datos cuando cambia la sección
  useEffect(() => {
    if (currentSection && currentView === 'section') {
      loadSectionData();
    }
  }, [currentSection, currentView, loadSectionData]);

  // 🔹 MODIFICADO - Manejar clic en opción BI (ahora público)
  const handleBIOptionClick = useCallback((optionName) => {
    setCurrentSection(optionName);
    setCurrentView('section');
    setLoading(true);
    setError(null);
    setAnalyticsData([]);
  }, []);

  // 🔹 MODIFICADO - Manejar clic en opción AI (ahora público)
  const handleAIOptionClick = useCallback((optionName) => {
    // Buscar la ruta de la opción seleccionada
    const selectedOption = allAIOptions.find(opt => opt.name === optionName);
    
    if (selectedOption && selectedOption.route) {
      // Navegar a la ruta específica de la aplicación AI
      navigate(selectedOption.route);
    } else {
      // Si no hay ruta definida, mostrar error
      setError('Ruta no configurada para esta opción');
    }
  }, [navigate, allAIOptions]);

  // 🔹 MODIFICADO - Manejar clic en AI card (ahora público)
  const handleAIClick = useCallback(() => {
    setCurrentView('ai');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, []);

  // 🔹 MODIFICADO - Manejar clic en BI (ahora público)
  const handleBIClick = useCallback(() => {
    setCurrentView('bi');
    setAnalyticsData([]);
    setCurrentSection(null);
    setError(null);
  }, []);
 
  // Funciones de navegación (sin cambios)
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

  const handleBackToAIOptions = useCallback(() => {
    setCurrentView('ai');
    setCurrentSection(null);
    setAnalyticsData([]);
    setError(null);
  }, []);

  // 🔹 MODIFICADO - Función para actualizar datos
  const handleDataUpdate = useCallback(() => {
    if (currentSection) {
      loadSectionData();
    }
  }, [loadSectionData, currentSection]);

  // 🔹 NUEVO - Función para logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('analytics_token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setToken(null);
    setUserInfo(null);
    window.location.reload();
  }, []);

  return {
    // Estados básicos
    currentView,
    currentSection,
    biOptions: allBIOptions, // 🔹 Ahora siempre disponibles
    aiOptions: allAIOptions, // 🔹 Ahora siempre disponibles
    isAdmin, // 🔹 Ahora viene del backend
    analyticsData,
    loading,
    error,
   
    // 🔹 NUEVOS - Estados de autenticación
    isAuthenticated,
    userInfo,
    token,
   
    // Funciones de navegación
    handleAIClick,
    handleBIClick,
    handleBIOptionClick,
    handleAIOptionClick,
    handleBackToMain,
    handleBackToBIOptions,
    handleBackToAIOptions,
    handleDataUpdate,
   
    // 🔹 NUEVAS - Funciones adicionales
    handleLogout,
    checkAuthStatus
  };
};