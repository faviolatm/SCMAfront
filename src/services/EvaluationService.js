// services/EvaluationService.js
import BaseApiService from './BaseApiService';

/**
 * EvaluationService
 * Maneja operaciones de evaluaciones
 */
class EvaluationService extends BaseApiService {
  /**
   * Get all evaluations
   * @param {string|null} status - Optional status filter
   * @returns {Promise<Array>}
   */
  static async getEvaluations(status = null) {
    const endpoint = status 
      ? `/evaluations?status=${status}`
      : '/evaluations';
    
    return await this.get(endpoint, []);
  }

  /**
   * Get evaluations for a specific user
   * @param {string} userid - User ID
   * @param {string|null} statusFilter - Optional status filter
   * @returns {Promise<Array>}
   */
  static async getUserEvaluations(userid, statusFilter = null) {
    try {
      const endpoint = statusFilter 
        ? `/evaluations/user/${userid}?status_filter=${statusFilter}`
        : `/evaluations/user/${userid}`;
      
      const response = await this.get(endpoint, []);
      console.log('📊 getUserEvaluations response:', response); // ✅ LOG
      return response || [];
    } catch (error) {
      console.error('❌ Error fetching user evaluations:', error);
      return [];
    }
  }

  /**
   * Create new evaluation
   * @param {Object} evaluationData - Evaluation data
   * @returns {Promise<Object|null>}
   */
  static async createEvaluation(evaluationData) {
    return await this.post('/evaluations', evaluationData);
  }

  /**
   * Get evaluation by ID with progress
   * @param {number} id - Evaluation ID
   * @returns {Promise<Object|null>}
   */
  static async getEvaluationById(id) {
    return await this.get(`/evaluations/${id}`);  // ✅ CORREGIDO
  }

  /**
   * Complete evaluation
   * @param {number} id - Evaluation ID
   * @returns {Promise<Object|null>}
   */
  static async completeEvaluation(id) {
    return await this.put(`/evaluations/${id}/complete`, {});  // ✅ CORREGIDO
  }

  /**
   * Update evaluation
   * @param {number} id - Evaluation ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>}
   */
  static async updateEvaluation(id, updateData) {
    return await this.put(`/evaluations/${id}`, updateData);  // ✅ CORREGIDO
  }

  /**
   * Delete evaluation
   * @param {number} id - Evaluation ID
   * @returns {Promise<Object|null>}
   */
  static async deleteEvaluation(id) {
    return await this.delete(`/evaluations/${id}`);  // ✅ CORREGIDO
  }
}

export default EvaluationService;