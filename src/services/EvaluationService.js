// services/EvaluationService.js
import BaseApiService from './BaseApiService';

/**
 * EvaluationService
 * Maneja operaciones de evaluaciones con sistema de permisos y filtros
 */
class EvaluationService extends BaseApiService {
  
  /**
   * Get filter options based on user permissions
   * @param {string} userid - User ID
   * @returns {Promise<Object>} Filter options
   */
  static async getFilterOptions(userid) {
    try {
      console.log('📡 EvaluationService.getFilterOptions:', userid);
      
      const response = await this.get(`/evaluations/filters/options?userid=${userid}`);
      
      console.log('✅ Filter options retrieved:', response);
      
      return response;
    } catch (error) {
      console.error('❌ Error getting filter options:', error);
      throw error;
    }
  }

  /**
   * Get evaluations with filters
   * @param {string} userid - User ID (required)
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>}
   */
  static async getEvaluations(userid, filters = {}) {
      try {
        if (!userid) {
          console.error('❌ userid is required for getEvaluations');
          return [];
        }

        const params = new URLSearchParams({ userid });
        
        console.log('🔍 Building params with filters:', filters);
        
        // Agregar filtros opcionales
        if (filters.status && filters.status !== 'all') {
          params.append('status', filters.status);  // ✅ CAMBIO: Usar 'status'
          console.log('  ✓ Added status filter:', filters.status);
        }
        
        if (filters.business_unit) {
          params.append('business_unit', filters.business_unit);
          console.log('  ✓ Added BU filter:', filters.business_unit);
        }
        
        if (filters.region) {
          params.append('region', filters.region);
          console.log('  ✓ Added region filter:', filters.region);
        }
        
        if (filters.building) {
          params.append('building', filters.building);
          console.log('  ✓ Added building filter:', filters.building);
        }

        const endpoint = `/evaluations?${params.toString()}`;
        
        console.log('📡 Final endpoint:', endpoint);
        
        const response = await this.get(endpoint, []);
        
        console.log('✅ Response:', response?.length || 0, 'evaluations');
        
        return response || [];
      } catch (error) {
        console.error('❌ Error fetching evaluations:', error);
        return [];
      }
    }

  /**
   * @deprecated Use getEvaluations(userid, filters) instead
   */
  static async getUserEvaluations(userid, statusFilter = null) {
    console.warn('⚠️ getUserEvaluations is deprecated, use getEvaluations instead');
    return this.getEvaluations(userid, { status: statusFilter });
  }

  /**
   * Create new evaluation
   */
  static async createEvaluation(evaluationData) {
    try {
      console.log('📝 Creating evaluation:', evaluationData);
      const response = await this.post('/evaluations', evaluationData);
      console.log('✅ Evaluation created:', response);
      return response;
    } catch (error) {
      console.error('❌ Error creating evaluation:', error);
      throw error;
    }
  }

  /**
   * Get evaluation by ID with progress
   */
  static async getEvaluationById(id) {
    try {
      console.log('🔍 Getting evaluation by ID:', id);
      const response = await this.get(`/evaluations/${id}`);
      console.log('✅ Evaluation retrieved:', response);
      return response;
    } catch (error) {
      console.error('❌ Error getting evaluation:', error);
      throw error;
    }
  }

  /**
   * Complete evaluation and calculate results
   */
  static async completeEvaluation(id) {
    try {
      console.log('✔️ Completing evaluation:', id);
      const response = await this.put(`/evaluations/${id}/complete`, {});
      console.log('✅ Evaluation completed:', response);
      return response;
    } catch (error) {
      console.error('❌ Error completing evaluation:', error);
      throw error;
    }
  }

  /**
   * Update evaluation
   */
  static async updateEvaluation(id, updateData) {
    try {
      console.log('📝 Updating evaluation:', id, updateData);
      const response = await this.put(`/evaluations/${id}`, updateData);
      console.log('✅ Evaluation updated:', response);
      return response;
    } catch (error) {
      console.error('❌ Error updating evaluation:', error);
      throw error;
    }
  }

  /**
   * Delete evaluation
   */
  static async deleteEvaluation(id) {
    try {
      console.log('🗑️ Deleting evaluation:', id);
      const response = await this.delete(`/evaluations/${id}`);
      console.log('✅ Evaluation deleted:', response);
      return response;
    } catch (error) {
      console.error('❌ Error deleting evaluation:', error);
      throw error;
    }
  }

  /**
   * Get evaluation results
   */
  static async getEvaluationResults(id) {
    try {
      console.log('📊 Getting evaluation results:', id);
      const response = await this.get(`/evaluations/${id}/results`);
      console.log('✅ Results retrieved:', response);
      return response;
    } catch (error) {
      console.error('❌ Error getting results:', error);
      throw error;
    }
  }
}

export default EvaluationService;