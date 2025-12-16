// services/AnalyticsSuiteService.js
import UserService from './UserService';

const API_BASE_URL = 'http://aw01tglappd001.tycoelectronics.net:8081/analytics';
const IMAGE_BASE_URL = 'http://aw01tglappd001.tycoelectronics.net:8081/analytics/images';

/**
 * AnalyticsSuiteService
 * Maneja PERMISOS y ACCESO al Analytics Suite
 * Conecta con: /analytics (JSON-based permissions)
 */
class AnalyticsSuiteService {

  static getHeaders() {
    return UserService.addUserHeader().headers;
  }

  // ==================== IMAGE URL HELPER ====================

  /**
   * Get image URL from image name
   * @param {string} imageName - Name of the image file
   * @returns {string|null} Complete image URL or null
   */
  static getImageUrl(imageName) {
    if (!imageName) return null;
    // Si ya es una URL completa, retornarla tal cual
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }
    // Si es solo el nombre del archivo, construir la URL completa
    return `${IMAGE_BASE_URL}/${imageName}`;
  }

  /**
   * Get image URLs for AI and BI cards
   * @returns {Object}
   */
  static getImageUrls() {
    return {
      ai: this.getImageUrl('AI.webp'),
      bi: this.getImageUrl('BI.webp')
    };
  }

  // ==================== PERMISOS Y ACCESO ====================

  /**
   * Get complete Analytics Suite info: main_access + cards
   * @returns {Promise<Object>} { user_id, main_access, main_access_info, cards, total_cards }
   */
  static async getSuite() {
    try {
      const response = await fetch(`${API_BASE_URL}/suite`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      console.error('Error getting suite:', response.status);
      return null;
    } catch (error) {
      console.error('Error getting suite:', error);
      return null;
    }
  }

  /**
   * Get only cards available for user
   * @returns {Promise<Object>} { cards: [] }
   */
  static async getCards() {
    try {
      const response = await fetch(`${API_BASE_URL}/cards`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { cards: [] };
    } catch (error) {
      console.error('Error getting cards:', error);
      return { cards: [] };
    }
  }

  /**
   * Check if user has access to Analytics Suite
   * @returns {Promise<Object>} { user_id, has_access }
   */
  static async checkAccess() {
    try {
      const response = await fetch(`${API_BASE_URL}/access`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { user_id: 'unknown', has_access: false };
    } catch (error) {
      console.error('Error checking access:', error);
      return { user_id: 'unknown', has_access: false };
    }
  }

  /**
   * Check if Analytics Suite should show in menu
   * @returns {Promise<Object>} { user_id, has_access, show_in_menu }
   */
  static async checkMenuAccess() {
    try {
      const response = await fetch(`${API_BASE_URL}/menu-access`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { user_id: 'unknown', has_access: false, show_in_menu: false };
    } catch (error) {
      console.error('Error checking menu access:', error);
      return { user_id: 'unknown', has_access: false, show_in_menu: false };
    }
  }

  /**
   * Check if current user is admin (backend validation)
   * @returns {Promise<Object>} { user_id, is_admin }
   */
  static async checkAdmin() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/check`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { user_id: 'unknown', is_admin: false };
    } catch (error) {
      console.error('Error checking admin:', error);
      return { user_id: 'unknown', is_admin: false };
    }
  }

  /**
   * Check if current user is admin (local validation)
   * @returns {boolean}
   */
  static isAdminUser() {
    const adminUsers = [
      'TE605135',
      'TE407929', 
      'TE589552',
      'TE535073',
      'TE588075'
    ];
    
    return adminUsers.includes(UserService.getCurrentUserId());
  }
}

export default AnalyticsSuiteService;