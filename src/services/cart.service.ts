import api from './api';

// ========================================
// INTERFACES
// ========================================

export interface CartItem {
  id: number;
  itemCarritoId: number;
  varianteId: number;
  productoId: number;
  nombre: string;
  slug: string;
  imagen: string;
  precio: number;
  precioOriginal: number;
  cantidad: number;
  stock: number;
  subtotal: number;
}

export interface CartResumen {
  subtotal: number;
  descuentoImporte: number;
  total: number;
  cantidadItems: number;
  cantidadTotal?: number;
}

export interface DescuentoAplicado {
  id: number;
  nombre: string;
  tipo: string;
  valor: number;
}

export interface CartResponse {
  carrito: {
    id: number;
    items: CartItem[];
  };
  resumen: CartResumen;
  descuentoAplicado: DescuentoAplicado | null;
}

// ========================================
// SERVICIO DE CARRITO
// ========================================

class CartService {
  /**
   * Obtener carrito completo
   */
  async getCart(): Promise<CartResponse> {
    try {
      console.log('📞 CartService.getCart() - Llamando a API...');
      const response = await api.get('/carrito');
      console.log('✅ CartService.getCart() - Respuesta recibida:',  JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.getCart() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener solo el resumen del carrito
   */
  async getCartSummary(): Promise<CartResumen & { descuentoAplicado: DescuentoAplicado | null }> {
    try {
      console.log('📞 CartService.getCartSummary() - Llamando a API...');
      const response = await api.get('/carrito/resumen');
      console.log('✅ CartService.getCartSummary() - Respuesta recibida');
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.getCartSummary() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Agregar producto al carrito
   */
  async addToCart(varianteId: number, cantidad: number = 1): Promise<any> {
    try {
      console.log('📞 CartService.addToCart() - Llamando a API:', { varianteId, cantidad });
      const response = await api.post('/carrito/agregar', { varianteId, cantidad });
      console.log('✅ CartService.addToCart() - Respuesta recibida:', {
        mensaje: response.data.mensaje,
        items: response.data.carrito?.items?.length || 0
      });
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.addToCart() - Error:', error.response?.data || error.message);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  }

  /**
   * Actualizar cantidad de un item
   */
  async updateQuantity(itemId: number, cantidad: number): Promise<any> {
    try {
      console.log('📞 CartService.updateQuantity() - Llamando a API:', { itemId, cantidad });
      const response = await api.put(`/carrito/item/${itemId}`, { cantidad });
      console.log('✅ CartService.updateQuantity() - Respuesta recibida');
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.updateQuantity() - Error:', error.response?.data || error.message);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  }

  /**
   * Eliminar item del carrito
   */
  async removeFromCart(itemId: number): Promise<any> {
    try {
      console.log('📞 CartService.removeFromCart() - Llamando a API:', { itemId });
      const response = await api.delete(`/carrito/item/${itemId}`);
      console.log('✅ CartService.removeFromCart() - Respuesta recibida');
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.removeFromCart() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Vaciar carrito completo
   */
  async clearCart(): Promise<any> {
    try {
      console.log('📞 CartService.clearCart() - Llamando a API...');
      const response = await api.post('/carrito/vaciar');
      console.log('✅ CartService.clearCart() - Respuesta recibida');
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.clearCart() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Recalcular carrito (precios y descuentos)
   */
  async recalculateCart(): Promise<CartResponse> {
    try {
      console.log('📞 CartService.recalculateCart() - Llamando a API...');
      const response = await api.post('/carrito/recalcular');
      console.log('✅ CartService.recalculateCart() - Respuesta recibida');
      return response.data;
    } catch (error: any) {
      console.error('❌ CartService.recalculateCart() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener cantidad total de items en el carrito
   */
  async getCartCount(): Promise<number> {
    try {
      const summary = await this.getCartSummary();
      return summary.cantidadTotal || 0;
    } catch (error) {
      console.error('❌ CartService.getCartCount() - Error:', error);
      return 0;
    }
  }

  /**
   * Obtener total del carrito
   */
  async getCartTotal(): Promise<number> {
    try {
      const summary = await this.getCartSummary();
      return summary.total;
    } catch (error) {
      console.error('❌ CartService.getCartTotal() - Error:', error);
      return 0;
    }
  }
}

export default new CartService();