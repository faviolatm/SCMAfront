// services/BaseApiService.js

const API_BASE_URL =  'http://mxl30gws6wm8sy3.mx.tycoelectronics.com:4003';
const API_PREFIX = '/SCMA';

/**
 * BaseApiService
 * Servicio base con métodos comunes para todos los servicios
 */
class BaseApiService {
  
  /**
   * Get default headers for API requests
   */
  static getHeaders() {
    return {
      'Content-Type': 'application/json',
      // Agrega aquí headers de autenticación si los necesitas
      // 'Authorization': `Bearer ${token}`
    };
  }

  /**
   * Get full API URL
   */
  static getApiUrl(endpoint) {
    return `${API_BASE_URL}${API_PREFIX}${endpoint}`;
  }

  /**
   * Generic GET request
   */
  static async get(endpoint, defaultValue = null) {
    try {
      const response = await fetch(this.getApiUrl(endpoint), {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      console.error(`Error GET ${endpoint}:`, response.status);
      return defaultValue;
    } catch (error) {
      console.error(`Error GET ${endpoint}:`, error);
      return defaultValue;
    }
  }

  /**
   * Generic POST request
   */
  static async post(endpoint, data, defaultValue = null) {
    try {
      const response = await fetch(this.getApiUrl(endpoint), {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      const error = await response.json();
      console.error(`Error POST ${endpoint}:`, error);
      return defaultValue;
    } catch (error) {
      console.error(`Error POST ${endpoint}:`, error);
      return defaultValue;
    }
  }

  /**
   * Generic PUT request
   */
  static async put(endpoint, data, defaultValue = null) {
    try {
      const response = await fetch(this.getApiUrl(endpoint), {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      const error = await response.json();
      console.error(`Error PUT ${endpoint}:`, error);
      return defaultValue;
    } catch (error) {
      console.error(`Error PUT ${endpoint}:`, error);
      return defaultValue;
    }
  }

  /**
   * Generic DELETE request
   */
  static async delete(endpoint, defaultValue = null) {
    try {
      const response = await fetch(this.getApiUrl(endpoint), {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      const error = await response.json();
      console.error(`Error DELETE ${endpoint}:`, error);
      return defaultValue;
    } catch (error) {
      console.error(`Error DELETE ${endpoint}:`, error);
      return defaultValue;
    }
  }
}

export default BaseApiService;