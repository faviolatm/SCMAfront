// services/ResponseService.js

import BaseApiService from './BaseApiService';

/**
 * ResponseService
 * Maneja operaciones de respuestas y resultados
 */
class ResponseService extends BaseApiService {

  // ==================== RESPONSES ====================

  /**
   * Create multiple responses in bulk
   * @param {number} evaluationId - Evaluation ID
   * @param {Array} responsesData - Array of responses
   * @returns {Promise<Array>}
   */
  static async createBulkResponses(evaluationId, responsesData) {
    return await this.post(
      `/responses/bulk?evaluation_id=${evaluationId}`,
      responsesData,
      []
    );
  }

  /**
   * Create single response
   * @param {Object} responseData - Response data
   * @returns {Promise<Object|null>}
   */
  static async createResponse(responseData) {
    return await this.post('/responses', responseData);
  }

  /**
   * Update existing response
   * @param {number} id - Response ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>}
   */
  static async updateResponse(id, updateData) {
    return await this.put(`/responses/${id}`, updateData);
  }

  /**
   * Get all responses for an evaluation
   * @param {number} evaluationId - Evaluation ID
   * @returns {Promise<Array>}
   */
  static async getResponsesByEvaluation(evaluationId) {
    return await this.get(`/responses/evaluation/${evaluationId}`, []);
  }

  /**
   * Delete response
   * @param {number} id - Response ID
   * @returns {Promise<Object|null>}
   */
  static async deleteResponse(id) {
    return await this.delete(`/responses/${id}`);
  }

  // ==================== RESULTS ====================

  /**
   * Get complete results for an evaluation
   * @param {number} evaluationId - Evaluation ID
   * @returns {Promise<Object|null>}
   */
  static async getResults(evaluationId) {
    return await this.get(`/responses/results/${evaluationId}`);
  }

  /**
   * Get results summary
   * @param {number} evaluationId - Evaluation ID
   * @returns {Promise<Object|null>}
   */
  static async getResultsSummary(evaluationId) {
    return await this.get(`/responses/results/${evaluationId}/summary`);
  }

  /**
   * Export results to PDF/Excel
   * @param {number} evaluationId - Evaluation ID
   * @param {string} format - Export format ('pdf' or 'excel')
   * @returns {Promise<Blob|null>}
   */
  static async exportResults(evaluationId, format = 'pdf') {
    try {
      const response = await fetch(
        this.getApiUrl(`/responses/results/${evaluationId}/export?format=${format}`),
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );
      
      if (response.ok) {
        return await response.blob();
      }
      
      console.error(`Error exporting results:`, response.status);
      return null;
    } catch (error) {
      console.error(`Error exporting results:`, error);
      return null;
    }
  }
}

export default ResponseService;