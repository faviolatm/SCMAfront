// src/services/AnalyticsService.js
import BaseApiService from './BaseApiService';

class AnalyticsService extends BaseApiService {
  
  static async getOverview() {
    const response = await this.get('/analytics/overview');
    return response?.data || null;
  }

  static async getByBusinessUnit() {
    const response = await this.get('/analytics/by-business-unit');
    return response?.data || [];
  }

  static async getByRegion() {
    const response = await this.get('/analytics/by-region');
    return response?.data || [];
  }

  static async getLowScores(threshold = 2, businessUnit = null, region = null) {
    let endpoint = `/analytics/low-scores?threshold=${threshold}`;
    if (businessUnit) endpoint += `&business_unit=${encodeURIComponent(businessUnit)}`;
    if (region) endpoint += `&region=${encodeURIComponent(region)}`;
    
    const response = await this.get(endpoint);
    return response?.data || [];
  }

  static async getAverageScores(businessUnit = null, region = null) {
    let endpoint = '/analytics/average-scores';
    const params = [];
    if (businessUnit) params.push(`business_unit=${encodeURIComponent(businessUnit)}`);
    if (region) params.push(`region=${encodeURIComponent(region)}`);
    if (params.length > 0) endpoint += `?${params.join('&')}`;
    
    const response = await this.get(endpoint);
    return response?.data || [];
  }

  static async getCompletionTrend(days = 30) {
    const response = await this.get(`/analytics/completion-trend?days=${days}`);
    return response?.data || [];
  }

  static async getTopPerformers(limit = 10) {
    const response = await this.get(`/analytics/top-performers?limit=${limit}`);
    return response?.data || [];
  }
}

export default AnalyticsService;