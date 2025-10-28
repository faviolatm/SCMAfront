// export class UserService {
//     /**
//      * Obtiene el ID del usuario actual desde localStorage
//      * @returns {string} ID del usuario o "No hay" si no está disponible
//      */
//     static getCurrentUserId() {
//       return localStorage.getItem('dash_user') || 'N/A';
//     }

//     static getCurrentWarehouse() {
//       return localStorage.getItem('dash_warehouse') || 'N/A';
//     }

//     /**
//      * Obtiene el JWT token del localStorage
//      * @returns {string} JWT token o null si no está disponible
//      */
//     static getJwtToken() {
//       return localStorage.getItem('dash_token');
//     }
  
//     /**
//      * Agrega el header de usuario y JWT token a las opciones de fetch
//      * @param {Object} options - Opciones actuales para fetch (opcional)
//      * @returns {Object} Opciones con los headers de usuario y JWT incluidos
//      */
//     static addUserHeader(options = {}) {
//       const userId = this.getCurrentUserId();
//       const jwtToken = this.getJwtToken();
      
//       return {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...options.headers,
//           'X-User-ID': userId,
//           ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
//         }
//       };
//     }
//   }
  
//   export default UserService;


export class UserService {
  // ===== Default values for development access =====
  // These are grabbed from localStorage after logging into regular LMS
  static defaultUser = "";
  static defaultUserName = "";
  static defaultToken = "";
  static defaultWarehouse = "";
  static defaultBUCode = "";

  /**
   * Obtiene el ID del usuario actual desde localStorage
   * @returns {string} ID del usuario o valor por defecto si no está disponible
   */
  static getCurrentUserId() {
    return localStorage.getItem('dash_user') || this.defaultUser;
  }

  /**
   * Obtiene el warehouse actual desde localStorage
   * @returns {string} Warehouse o valor por defecto si no está disponible
   */
  static getCurrentWarehouse() {
    return localStorage.getItem('dash_warehouse') || this.defaultWarehouse;
  }

  /**
   * Obtiene el JWT token del localStorage
   * @returns {string} JWT token o token por defecto si no está disponible
   */
  static getJwtToken() {
    return localStorage.getItem('dash_token') || this.defaultToken;
  }

  /**
   * Agrega el header de usuario y JWT token a las opciones de fetch
   * @param {Object} options - Opciones actuales para fetch (opcional)
   * @returns {Object} Opciones con los headers de usuario y JWT incluidos
   */
  static addUserHeader(options = {}) {
    const userId = this.getCurrentUserId();
    const jwtToken = this.getJwtToken();
    
    return {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        'X-User-ID': userId,
        ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
      }
    };
  }
}

export default UserService;