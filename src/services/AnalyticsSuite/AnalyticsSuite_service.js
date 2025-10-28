import UserService from '../UserService';

class AnalyticsSuiteService {
  static BASE_URL = 'http://127.0.0.1:8000';

  /**
   * Construye URLs completas
   * @param {string} endpoint - Endpoint específico
   * @returns {string} URL completa
   */
  static buildUrl(endpoint) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.BASE_URL}${cleanEndpoint}`;
  }

  /**
   * URLs para imágenes - centralizadas aquí también
   * @returns {Object} URLs de imágenes
   */
  static getImageUrls() {
    return {
      ai: this.buildUrl('/global/images/AI.webp'),
      bi: this.buildUrl('/global/images/BI.webp')
    };
  }

  /**
   * Get allowed dashboards for current user from backend (NEW METHOD)
   * @returns {Promise<Object>} Object with user dashboards access
   */
  static async getUserAllowedDashboards() {
    try {
      const currentUserId = UserService.getCurrentUserId();
      const url = this.buildUrl('/global/analytics-suite/dashboards');   
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('❌ Error fetching dashboards:', response.status);
        return {
          user_id: currentUserId || 'unknown',
          main_access: false,
          main_access_info: null,
          allowed_cards: []
        };
      }
    } catch (error) {
      console.error('💥 Error fetching dashboards:', error);
      return {
        user_id: 'unknown',
        main_access: false,
        main_access_info: null,
        allowed_cards: []
      };
    }
  }

  /**
   * Get Analytics Suite permissions for current user from backend (LEGACY - mantener por compatibilidad)
   * @returns {Promise<Object>} Object with all permissions
   */
  static async getUserAnalyticsPermissions() {
    try {
      const currentUserId = UserService.getCurrentUserId();  
      const url = this.buildUrl('/global/analytics-suite/permissions');
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return {
          analytics_suite: result.analytics_suite,
          bi_card: result.bi_card,
          ai_card: result.ai_card
        };
      } else {
        console.error('❌ Error fetching permissions:', response.status);
        return {
          analytics_suite: false,
          bi_card: false,
          ai_card: false
        };
      }
    } catch (error) {
      console.error('💥 Error fetching permissions:', error);
      return {
        analytics_suite: false,
        bi_card: false,
        ai_card: false
      };
    }
  }

  /**
   * Check if user has access to Analytics Suite main section
   * @returns {Promise<boolean>} Has access
   */
  static async hasAnalyticsSuiteAccess() {
    const dashboards = await this.getUserAllowedDashboards();
    return dashboards.main_access;
  }

  /**
   * Check if user has access to BI card
   * @returns {Promise<boolean>} Has access
   */
  static async hasBIAccess() {
    const dashboards = await this.getUserAllowedDashboards();
    return dashboards.allowed_cards.some(card => card.key === 'bi_card');
  }

  /**
   * Check if user has access to AI card
   * @returns {Promise<boolean>} Has access
   */
  static async hasAIAccess() {
    const dashboards = await this.getUserAllowedDashboards();
    return dashboards.allowed_cards.some(card => card.key === 'ai_card');
  }

  /**
   * Get URLs for a specific section
   * @param {string} section - Section name
   * @returns {Promise<Array>} Array of URLs
   */
  static async getUrlsBySection(section) {
    try {
      const url = this.buildUrl(`/global/analytics-suite/urls/${encodeURIComponent(section)}`);
      const headers = UserService.addUserHeader().headers;
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.urls || [];
      } else {
        const errorText = await response.text();
        console.error('❌ API Error:', response.status, errorText);
        return [];
      }
    } catch (error) {
      console.error('💥 Fetch error:', error);
      return [];
    }
  }

  /**
   * Update URL for a specific option
   * @param {string} section - Section name
   * @param {string} optionName - Option name
   * @param {string} url - New URL
   * @returns {Promise<boolean>} Success status
   */
  static async updateUrl(section, optionName, url) {
    try {
      const requestData = {
        section: section,
        option_name: optionName,
        url: url
      };
          
      const response = await fetch(this.buildUrl('/global/analytics-suite/urls'), {
        method: 'PUT',
        headers: UserService.addUserHeader().headers,
        body: JSON.stringify(requestData)
      });
    
      if (response.ok) {
        return true;
      } else {
        const error = await response.json();
        console.error('❌ Failed to update URL:', error.detail || 'Unknown error');
        return false;
      }
    } catch (error) {
      console.error('💥 Error updating URL:', error);
      return false;
    }
  }

  /**
   * Check if current user is admin
   * @returns {boolean} Is admin user
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
