// services/UserService.js

export class UserService {
  /**
   * Obtiene el ID del usuario actual desde localStorage
   * @returns {string} ID del usuario o 'N/A' si no está disponible
   */
  static getCurrentUserId() {
    const userId = localStorage.getItem('dash_user') || 'N/A';
    console.log('🔍 UserService.getCurrentUserId():', userId);
    return userId;
  }

  /**
   * Obtiene el warehouse actual desde localStorage
   * @returns {string} Warehouse o 'N/A' si no está disponible
   */
  static getCurrentWarehouse() {
    const warehouse = localStorage.getItem('dash_warehouse') || 'N/A';
    console.log('🔍 UserService.getCurrentWarehouse():', warehouse);
    return warehouse;
  }

  /**
   * Obtiene el JWT token del localStorage
   * @returns {string|null} JWT token o null si no está disponible
   */
  static getJwtToken() {
    const token = localStorage.getItem('dash_token');
    console.log('🔍 UserService.getJwtToken():', token ? 'EXISTS (length: ' + token.length + ')' : 'NULL');
    return token;
  }

  /**
   * Agrega el header de usuario y JWT token a las opciones de fetch
   * @param {Object} options - Opciones actuales para fetch (opcional)
   * @returns {Object} Opciones con los headers de usuario y JWT incluidos
   */
  static addUserHeader(options = {}) {
    console.log('🔍 ===== UserService.addUserHeader() =====');
    
    const userId = this.getCurrentUserId();
    const jwtToken = this.getJwtToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'X-User-ID': userId,
      ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
    };
    
    console.log('🔍 Headers created:', {
      'X-User-ID': userId,
      'Authorization': jwtToken ? 'Bearer [TOKEN]' : 'NOT SET',
      'Content-Type': 'application/json'
    });
    
    console.log('🔍 ===== End addUserHeader =====');
    
    return {
      ...options,
      headers: headers
    };
  }
}

export default UserService;