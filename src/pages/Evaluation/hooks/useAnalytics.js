// src/pages/Evaluation/hooks/useAnalytics.js
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import AnalyticsService from '../../../services/AnalyticsService';

export const useAnalytics = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(2);
  
  // Filtros (compartidos con evaluations)
  const [filters, setFilters] = useState({
    business_unit: null,
    region: null,
    building: null
  });

  // Data states
  const [overview, setOverview] = useState(null);
  const [lowScoresOverview, setLowScoresOverview] = useState(null);
  const [lowScoresByCategory, setLowScoresByCategory] = useState([]);
  const [lowScoresByBU, setLowScoresByBU] = useState([]);
  const [lowScoresByRegion, setLowScoresByRegion] = useState([]);
  const [lowScoresByBuilding, setLowScoresByBuilding] = useState([]);
  const [averageScores, setAverageScores] = useState([]);
  const [scoreDistribution, setScoreDistribution] = useState(null);

  // Cargar todos los datos cuando cambian filtros o threshold
  useEffect(() => {
    if (currentUser) {
      loadAllAnalytics();
    }
  }, [currentUser, filters, threshold]);

  const loadAllAnalytics = async () => {
    setLoading(true);
    console.log('📊 Loading analytics with filters:', filters, 'threshold:', threshold);

    try {
      const userid = currentUser.userid;

      // Cargar todo en paralelo
      const [
        overviewData,
        lowScoresOverviewData,
        lowScoresByCategoryData,
        lowScoresByBUData,
        lowScoresByRegionData,
        lowScoresByBuildingData,
        averageScoresData,
        scoreDistributionData
      ] = await Promise.all([
        AnalyticsService.getOverview(userid, filters),
        AnalyticsService.getLowScoresOverview(userid, threshold, filters),
        AnalyticsService.getLowScoresByCategory(userid, threshold, 10, filters),
        AnalyticsService.getLowScoresByBusinessUnit(userid, threshold, filters),
        AnalyticsService.getLowScoresByRegion(userid, threshold, filters),
        AnalyticsService.getLowScoresByBuilding(userid, threshold, filters),
        AnalyticsService.getAverageScores(userid, filters),
        AnalyticsService.getScoreDistribution(userid, filters)
      ]);

      setOverview(overviewData);
      setLowScoresOverview(lowScoresOverviewData);
      setLowScoresByCategory(lowScoresByCategoryData);
      setLowScoresByBU(lowScoresByBUData);
      setLowScoresByRegion(lowScoresByRegionData);
      setLowScoresByBuilding(lowScoresByBuildingData);
      setAverageScores(averageScoresData);
      setScoreDistribution(scoreDistributionData);

      console.log('✅ Analytics loaded successfully');
    } catch (error) {
      console.error('❌ Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (filterName, value) => {
    console.log(`🎯 Updating analytics filter ${filterName}:`, value);
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    console.log('🧹 Clearing analytics filters');
    setFilters({
      business_unit: null,
      region: null,
      building: null
    });
  };

  const updateThreshold = (newThreshold) => {
    console.log(`🎯 Updating threshold:`, newThreshold);
    setThreshold(newThreshold);
  };

  return {
    loading,
    threshold,
    filters,
    overview,
    lowScoresOverview,
    lowScoresByCategory,
    lowScoresByBU,
    lowScoresByRegion,
    lowScoresByBuilding,
    averageScores,
    scoreDistribution,
    updateFilter,
    clearFilters,
    updateThreshold,
    refreshAnalytics: loadAllAnalytics
  };
};