
/**
 * API Configuration
 * Change INSIGHTEDGE_API value for different environments (dev, staging, production)
 */
const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000',
  INSIGHTEDGE_PREFIX: '/insightedge/insightedge/api',
};

/**
 * Build full API URL
 */
const buildUrl = (endpoint) => `${API_CONFIG.BASE_URL}${API_CONFIG.INSIGHTEDGE_PREFIX}${endpoint}`;

/**
 * Part Lookup Service
 * Handles all API calls for the InsightEdge Part Lookup feature
 */
const PartLookupService = {
  /**
   * Health check for InsightEdge API
   * @returns {Promise<Object>} - Health status
   */
  healthCheck: async () => {
    const url = buildUrl('/healthcheck');
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },

  /**
   * Lookup part number from API
   * @param {string} partNumber - The part number to search for
   * @returns {Promise<Object>} - The API response data
   */
  lookupPart: async (partNumber) => {
    const url = buildUrl('/lookup_part');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ part_number: partNumber }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(`API Error: ${data.error}`);
      }

      return data;
    } catch (error) {
      throw new Error(`Error fetching part data: ${error.message}`);
    }
  },

  /**
   * Test connection to backend
   * @returns {Promise<boolean>} - Connection status
   */
  testConnection: async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/docs`, { method: 'GET' });
      return response.ok;
    } catch {
      return false;
    }
  },
};

export default PartLookupService;
