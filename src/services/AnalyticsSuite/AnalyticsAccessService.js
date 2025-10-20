import UserService from '../UserService';

const API_BASE_URL = 'http://aw01tglappd001.tycoelectronics.net/global/analytics-access';

class AnalyticsAccessService {

  /**
   * Check if Analytics Suite option should appear in main menu
   * @returns {Promise<Object>} Menu access response
   */
  static async checkMenuAccess() {
    try {
      const currentUserId = UserService.getCurrentUserId();
      const url = `${API_BASE_URL}/menu-access`; 
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('❌ Error checking menu access:', response.status);
        return {
          user_id: currentUserId || 'unknown',
          has_access: false,
          show_in_menu: false
        };
      }
    } catch (error) {
      console.error('💥 Error checking menu access:', error);
      return {
        user_id: 'unknown',
        has_access: false,
        show_in_menu: false
      };
    }
  }

  /**
   * Check if user has access to Analytics Suite
   * @returns {Promise<Object>} Access check response
   */
  static async checkAccess() {
    try {
      const currentUserId = UserService.getCurrentUserId();   
      const url = `${API_BASE_URL}/access-check`;
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('❌ Error checking access:', response.status);
        return {
          user_id: currentUserId || 'unknown',
          has_access: false
        };
      }
    } catch (error) {
      console.error('💥 Error checking access:', error);
      return {
        user_id: 'unknown',
        has_access: false
      };
    }
  }

  /**
   * Get complete Analytics Suite information for user
   * @returns {Promise<Object>} Complete suite data
   */
  static async getSuite() {
    try {
      const currentUserId = UserService.getCurrentUserId();    
      const url = `${API_BASE_URL}/suite`;
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('❌ Error getting suite data:', response.status);
        if (response.status === 403) {
          return {
            error: 'Usuario no autorizado para acceder a Analytics Suite',
            user_id: currentUserId || 'unknown',
            main_access: null,
            cards: [],
            total_cards: 0
          };
        }
        return null;
      }
    } catch (error) {
      console.error('💥 Error getting suite data:', error);
      return null;
    }
  }

  /**
   * Get only the cards available for user
   * @returns {Promise<Object>} Cards data
   */
  static async getCards() {
    try {
      const currentUserId = UserService.getCurrentUserId();     
      const url = `${API_BASE_URL}/cards`;
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('❌ Error getting cards:', response.status);
        if (response.status === 403) {
          return {
            error: 'Usuario no autorizado para acceder a Analytics Suite',
            cards: []
          };
        }
        return {
          cards: []
        };
      }
    } catch (error) {
      console.error('💥 Error getting cards:', error);
      return {
        cards: []
      };
    }
  }

  /**
   * Reload configuration on backend
   * @returns {Promise<Object>} Reload response
   */
  static async reloadConfig() {
    try {
      const currentUserId = UserService.getCurrentUserId();    
      const url = `${API_BASE_URL}/config/reload`;
      const headers = UserService.addUserHeader().headers;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: headers
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error('❌ Error reloading config:', response.status);
        return {
          error: 'Error al recargar configuración',
          message: '',
          reloaded_by: currentUserId || 'unknown'
        };
      }
    } catch (error) {
      console.error('💥 Error reloading config:', error);
      return {
        error: 'Error de conexión al recargar configuración',
        message: '',
        reloaded_by: 'unknown'
      };
    }
  }

  /**
   * Quick check if user has access (simpler method)
   * @returns {Promise<boolean>} Has access
   */
  static async hasAccess() {
    const result = await this.checkAccess();
    return result.has_access || false;
  }

  /**
   * Get main access info if user has permission
   * @returns {Promise<Object|null>} Main access info or null
   */
  static async getMainAccessInfo() {
    const suiteData = await this.getSuite();
    return suiteData?.main_access || null;
  }

  /**
   * Get cards array only
   * @returns {Promise<Array>} Array of cards
   */
  static async getCardsArray() {
    const cardsData = await this.getCards();
    return cardsData.cards || [];
  }

  /**
   * Check if user has access to specific card
   * @param {string} cardKey - Key of the card to check
   * @returns {Promise<boolean>} Has access to card
   */
  static async hasCardAccess(cardKey) {
    const cards = await this.getCardsArray();
    return cards.some(card => card.key === cardKey);
  }

  /**
   * Check if user has BI card access
   * @returns {Promise<boolean>} Has BI access
   */
  static async hasBIAccess() {
    return await this.hasCardAccess('bi_card');
  }

  /**
   * Check if user has AI card access
   * @returns {Promise<boolean>} Has AI access
   */
  static async hasAIAccess() {
    return await this.hasCardAccess('ai_card');
  }

  /**
   * Get all access info in one call (most efficient)
   * @returns {Promise<Object>} Complete access information
   */
  static async getAllAccessInfo() {
    const suiteData = await this.getSuite();
    
    if (!suiteData || suiteData.error) {
      return {
        hasAccess: false,
        mainAccess: null,
        cards: [],
        totalCards: 0,
        hasBIAccess: false,
        hasAIAccess: false,
        error: suiteData?.error || 'Error getting access info'
      };
    }

    const cards = suiteData.cards || [];
    
    return {
      hasAccess: true,
      mainAccess: suiteData.main_access,
      cards: cards,
      totalCards: suiteData.total_cards || cards.length,
      hasBIAccess: cards.some(card => card.key === 'bi_card'),
      hasAIAccess: cards.some(card => card.key === 'ai_card'),
      userId: suiteData.user_id
    };
  }
}

export default AnalyticsAccessService;