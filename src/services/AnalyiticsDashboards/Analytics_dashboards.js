// services/AnalyticsDashboardService.js
import UserService from "../UserService";

const API_BASE_URL = 'http://aw01tglappd001.tycoelectronics.net:8001/analytics/analytics-access';

class AnalyticsDashboardService {

  static getHeaders() {
    return {
      ...UserService.addUserHeader().headers,
      'Content-Type': 'application/json'
    };
  }

  // ==================== READ ====================

  static async getUrlsBySection(section) {
    try {
      const response = await fetch(`${API_BASE_URL}/urls/${encodeURIComponent(section)}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (response.ok) {
        const result = await response.json();
        return result.urls || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching URLs:', error);
      return [];
    }
  }

  // ==================== CREATE ====================

  static async createDashboard(section, optionName, url, imageName = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/urls`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          section: section,
          option_name: optionName,
          url: url,
          image_name: imageName
        })
      });

      if (response.ok) {
        const result = await response.json();
        return result.dashboard;
      } else if (response.status === 400) {
        alert('Dashboard already exists');
        return null;
      } else if (response.status === 403) {
        alert('You do not have admin permissions');
        return null;
      }
      return null;
    } catch (error) {
      console.error('Error creating dashboard:', error);
      return null;
    }
  }

  // ==================== UPDATE ====================

  static async updateUrl(section, optionName, url, imageName = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/urls`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({
          section: section,
          option_name: optionName,
          url: url,
          image_name: imageName
        })
      });

      if (response.ok) {
        return true;
      } else if (response.status === 403) {
        alert('You do not have admin permissions');
        return false;
      } else if (response.status === 404) {
        alert('Dashboard not found');
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error updating URL:', error);
      return false;
    }
  }

  // ==================== DELETE ====================

  static async deleteDashboard(section, optionName) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/urls?section=${encodeURIComponent(section)}&option_name=${encodeURIComponent(optionName)}`, 
        {
          method: 'DELETE',
          headers: this.getHeaders()
        }
      );

      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting dashboard:', error);
      return false;
    }
  }
}

export default AnalyticsDashboardService;