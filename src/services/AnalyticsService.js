// src/services/AnalyticsService.js
import BaseApiService from './BaseApiService';

class AnalyticsService extends BaseApiService {
  
  /**
   * Get overview statistics with permissions and filters
   * @param {string} userid - User ID (required for permissions)
   * @param {Object} filters - Optional filters {business_unit, region, building}
   */
  static async getOverview(userid, filters = {}) {
    try {
      const params = new URLSearchParams({ userid });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/overview?${params.toString()}`);
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching overview:', error);
      return null;
    }
  }

  /**
   * Get low scores overview
   */
  static async getLowScoresOverview(userid, threshold = 2, filters = {}) {
    try {
      const params = new URLSearchParams({ userid, threshold });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/low-scores/overview?${params.toString()}`);
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching low scores overview:', error);
      return null;
    }
  }

  /**
   * Get low scores by category (top problematic categories)
   */
  static async getLowScoresByCategory(userid, threshold = 2, limit = 10, filters = {}) {
    try {
      const params = new URLSearchParams({ userid, threshold, limit });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/low-scores/by-category?${params.toString()}`);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching low scores by category:', error);
      return [];
    }
  }

  /**
   * Get low scores by business unit
   */
  static async getLowScoresByBusinessUnit(userid, threshold = 2, filters = {}) {
    try {
      const params = new URLSearchParams({ userid, threshold });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/low-scores/by-business-unit?${params.toString()}`);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching low scores by BU:', error);
      return [];
    }
  }

  /**
   * Get low scores by region
   */
  static async getLowScoresByRegion(userid, threshold = 2, filters = {}) {
    try {
      const params = new URLSearchParams({ userid, threshold });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/low-scores/by-region?${params.toString()}`);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching low scores by region:', error);
      return [];
    }
  }

  /**
   * Get low scores by building
   */
  static async getLowScoresByBuilding(userid, threshold = 2, filters = {}) {
    try {
      const params = new URLSearchParams({ userid, threshold });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/low-scores/by-building?${params.toString()}`);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching low scores by building:', error);
      return [];
    }
  }

  /**
   * Get average scores by category
   */
  static async getAverageScores(userid, filters = {}) {
    try {
      const params = new URLSearchParams({ userid });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/average-scores?${params.toString()}`);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching average scores:', error);
      return [];
    }
  }

  /**
   * Get score distribution (0-5)
   */
  static async getScoreDistribution(userid, filters = {}) {
    try {
      const params = new URLSearchParams({ userid });
      
      if (filters.business_unit) params.append('business_unit', filters.business_unit);
      if (filters.region) params.append('region', filters.region);
      if (filters.building) params.append('building', filters.building);
      
      const response = await this.get(`/analytics/score-distribution?${params.toString()}`);
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching score distribution:', error);
      return null;
    }
  }
}

export default AnalyticsService;