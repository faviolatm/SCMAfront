// services/ItemService.js

import BaseApiService from './BaseApiService';

/**
 * ItemService
 * Maneja operaciones de Items (Categorías, Secciones, Opciones)
 */
class ItemService extends BaseApiService {

  /**
   * Get complete tree: categories > sections > options
   * @returns {Promise<Object>} { success: boolean, data: [] }
   */
  static async getTree() {
    const result = await this.get('/items/tree', { success: false, data: [] });
    return result;
  }

  /**
   * Create new item (category, section, or option)
   * @param {Object} itemData - Data for the new item
   * @returns {Promise<Object|null>}
   */
  static async createItem(itemData) {
    return await this.post('/items', itemData);
  }

  /**
   * Update existing item
   * @param {number} id - Item ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>}
   */
  static async updateItem(id, updateData) {
    return await this.put(`/items/${id}`, updateData);
  }

  /**
   * Delete item
   * @param {number} id - Item ID
   * @returns {Promise<Object|null>}
   */
  static async deleteItem(id) {
    return await this.delete(`/items/${id}`);
  }
}

export default ItemService;