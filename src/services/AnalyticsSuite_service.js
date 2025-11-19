// services/AnalyticsSuite/AnalyticsSuite_service.js

class AnalyticsSuiteService {
  static BASE_URL = process.env.REACT_APP_API_URL || 'http://lms.tycoelectronics.net';

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
   * Get token from localStorage
   * @returns {string|null} Token or null
   */
  static getToken() {
    return localStorage.getItem('analytics_token');
  }

  /**
   * Build headers with token if available
   * @returns {Object} Headers object
   */
  static getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // ==================== PUBLIC ENDPOINTS (No authentication required) ====================

  /**
   * Get Analytics Suite main information - PUBLIC
   * @returns {Promise<Object>} Main info
   */
  static async getAnalyticsSuiteInfo() {
    try {
      const url = this.buildUrl('/analytics/analytics-suite/info');
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('❌ Error fetching analytics info:', response.status);
        return null;
      }
    } catch (error) {
      console.error('💥 Error fetching analytics info:', error);
      return null;
    }
  }

  /**
   * Get all dashboards organized by section - PUBLIC
   * @returns {Promise<Object>} Dashboards by section
   */
  static async getAllDashboards() {
    try {
      const url = this.buildUrl('/analytics/analytics-suite/dashboards');
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('❌ Error fetching dashboards:', response.status);
        return {};
      }
    } catch (error) {
      console.error('💥 Error fetching dashboards:', error);
      return {};
    }
  }

  /**
   * Get all available sections - PUBLIC
   * @returns {Promise<Array>} Array of section names
   */
  static async getAllSections() {
    try {
      const url = this.buildUrl('/analytics/analytics-suite/sections');
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('❌ Error fetching sections:', response.status);
        return [];
      }
    } catch (error) {
      console.error('💥 Error fetching sections:', error);
      return [];
    }
  }

  /**
   * Get URLs for a specific section - PUBLIC
   * @param {string} section - Section name
   * @returns {Promise<Array>} Array of URLs
   */
  static async getUrlsBySection(section) {
    try {
      const url = this.buildUrl(`/analytics/analytics-suite/urls/${encodeURIComponent(section)}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error('❌ Error fetching URLs for section:', response.status);
        return [];
      }
    } catch (error) {
      console.error('💥 Error fetching URLs:', error);
      return [];
    }
  }

  // ==================== ADMIN ENDPOINTS (Authentication required) ====================

  /**
   * Check if current user has admin access
   * @returns {Promise<Object>} Admin info { is_admin: boolean, user_id: string }
   */
  static async checkAdminAccess() {
    try {
      const token = this.getToken();
      
      if (!token) {
        return { is_admin: false, user_id: null };
      }

      const url = this.buildUrl('/analytics/analytics-suite/admin/check');
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 401 || response.status === 403) {
        return { is_admin: false, user_id: null };
      } else {
        console.error('❌ Error checking admin access:', response.status);
        return { is_admin: false, user_id: null };
      }
    } catch (error) {
      console.error('💥 Error checking admin access:', error);
      return { is_admin: false, user_id: null };
    }
  }

  /**
   * Get all dashboards including inactive ones - ADMIN ONLY
   * @returns {Promise<Object>} All dashboards
   */
  static async getAllDashboardsAdmin() {
    try {
      const url = this.buildUrl('/analytics/analytics-suite/admin/dashboards');
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 403) {
        throw new Error('You do not have admin permissions');
      } else {
        console.error('❌ Error fetching admin dashboards:', response.status);
        return {};
      }
    } catch (error) {
      console.error('💥 Error fetching admin dashboards:', error);
      throw error;
    }
  }

  /**
   * Update URL for a specific option - ADMIN ONLY
   * @param {string} section - Section name
   * @param {string} optionName - Option name
   * @param {string} url - New URL
   * @param {string} description - Optional description
   * @param {string} icon - Optional icon
   * @returns {Promise<boolean>} Success status
   */
  static async updateUrl(section, optionName, url, description = null, icon = null) {
    try {
      const requestData = {
        section: section,
        option_name: optionName,
        url: url
      };

      if (description !== null) {
        requestData.description = description;
      }

      if (icon !== null) {
        requestData.icon = icon;
      }

      const response = await fetch(this.buildUrl('/analytics/analytics-suite/admin/dashboard'), {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ URL updated:', result);
        return true;
      } else if (response.status === 403) {
        console.error('❌ You do not have admin permissions');
        alert('You do not have admin permissions to update URLs');
        return false;
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
   * Add a new dashboard - ADMIN ONLY
   * @param {string} section - Section name
   * @param {string} optionName - Option name
   * @param {string} url - URL
   * @param {string} description - Optional description
   * @param {string} icon - Optional icon
   * @returns {Promise<Object>} Result object
   */
  static async addDashboard(section, optionName, url, description = '', icon = '') {
    try {
      const requestData = {
        section: section,
        option_name: optionName,
        url: url,
        description: description,
        icon: icon
      };

      const response = await fetch(this.buildUrl('/analytics/analytics-suite/admin/dashboard'), {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 403) {
        throw new Error('You do not have admin permissions');
      } else {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to add dashboard');
      }
    } catch (error) {
      console.error('💥 Error adding dashboard:', error);
      throw error;
    }
  }

  /**
   * Delete (deactivate) a dashboard - ADMIN ONLY
   * @param {string} section - Section name
   * @param {string} optionName - Option name
   * @returns {Promise<Object>} Result object
   */
  static async deleteDashboard(section, optionName) {
    try {
      const requestData = {
        section: section,
        option_name: optionName
      };

      const response = await fetch(this.buildUrl('/analytics/analytics-suite/admin/dashboard'), {
        method: 'DELETE',
        headers: this.getHeaders(),
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 403) {
        throw new Error('You do not have admin permissions');
      } else {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to delete dashboard');
      }
    } catch (error) {
      console.error('💥 Error deleting dashboard:', error);
      throw error;
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Check if user is currently authenticated
   * @returns {boolean} Is authenticated
   */
  static isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Logout - Remove token
   */
  static logout() {
    localStorage.removeItem('analytics_token');
  }

  /**
   * URLs para imágenes (si las necesitas)
   * @returns {Object} URLs de imágenes
   */
  static getImageUrls() {
    return {
      ai: this.buildUrl('/analytics/images/AI.webp'),
      bi: this.buildUrl('/analytics/images/BI.webp')
    };
  }
}

export default AnalyticsSuiteService;