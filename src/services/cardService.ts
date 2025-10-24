/**
 * SERVICIO DE CARRITO DE COMPRAS
 *
 * Este servicio maneja todas las operaciones del carrito de compras.
 * Actualmente usa localStorage para persistencia local.
 *
 * PREPARADO PARA INTEGRACIÓN CON BACKEND:
 * - Todos los métodos están listos para ser reemplazados con llamadas API
 * - Las interfaces están definidas en src/types/cart.types.ts
 * - Solo necesitas descomentar las secciones de API y agregar la URL del backend
 */

import type { Product } from "./productService"
import type { CartItem } from "../types/cart.types"

// CONFIGURACIÓN DEL API (descomentar cuando tengas el backend)
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class CartService {
  private cart: CartItem[] = []

  constructor() {
    this.loadCart()
  }

  /**
   * Carga el carrito desde localStorage
   * TODO: Reemplazar con llamada GET /api/cart cuando el backend esté listo
   */
  private loadCart(): void {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      this.cart = JSON.parse(savedCart)
    }
  }

  /**
   * Guarda el carrito en localStorage
   * TODO: Este método no será necesario cuando uses el backend
   */
  private saveCart(): void {
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }

  /**
   * Agrega un producto al carrito
   *
   * @param product - Producto a agregar
   * @param quantity - Cantidad de unidades
   * @param size - Talla/presentación seleccionada
   * @param color - Color/variedad seleccionada
   *
   * INTEGRACIÓN CON BACKEND:
   * Reemplazar con: POST /api/cart/add
   * Body: { productId, variantId, quantity, size, color }
   */
  async addToCart(product: Product, quantity: number, size: string, color: string): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // const request: AddToCartRequest = {
    //   productId: product.id,
    //   quantity,
    //   size,
    //   color
    // };
    // const response = await fetch(`${API_URL}/cart/add`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    //   credentials: 'include' // Para enviar cookies de sesión
    // });
    // const data: CartResponse = await response.json();
    // this.cart = data.items;

    // IMPLEMENTACIÓN LOCAL (actual)
    const existingItem = this.cart.find(
      (item) => item.product.id === product.id && item.size === size && item.color === color,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.cart.push({ product, quantity, size, color })
    }

    this.saveCart()
  }

  /**
   * Elimina un producto del carrito
   *
   * @param productId - ID del producto a eliminar
   * @param size - Talla del producto
   * @param color - Color del producto
   *
   * INTEGRACIÓN CON BACKEND:
   * Reemplazar con: DELETE /api/cart/remove
   * Body: { productId, size, color }
   */
  async removeFromCart(productId: number, size: string, color: string): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // await fetch(`${API_URL}/cart/remove`, {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId, size, color }),
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    this.cart = this.cart.filter(
      (item) => !(item.product.id === productId && item.size === size && item.color === color),
    )
    this.saveCart()
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   *
   * @param productId - ID del producto
   * @param size - Talla del producto
   * @param color - Color del producto
   * @param quantity - Nueva cantidad
   *
   * INTEGRACIÓN CON BACKEND:
   * Reemplazar con: PUT /api/cart/update
   * Body: { productId, size, color, quantity }
   */
  async updateQuantity(productId: number, size: string, color: string, quantity: number): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // await fetch(`${API_URL}/cart/update`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId, size, color, quantity }),
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    const item = this.cart.find((item) => item.product.id === productId && item.size === size && item.color === color)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.removeFromCart(productId, size, color)
      } else {
        this.saveCart()
      }
    }
  }

  /**
   * Obtiene todos los items del carrito
   *
   * INTEGRACIÓN CON BACKEND:
   * Reemplazar con: GET /api/cart
   * Response: CartResponse
   */
  getCart(): CartItem[] {
    return this.cart
  }

  /**
   * Calcula el total del carrito (suma de precio * cantidad de cada item)
   *
   * NOTA: Cuando uses el backend, este cálculo se hará en el servidor
   * para evitar manipulación de precios en el cliente
   */
  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  /**
   * Obtiene la cantidad total de items en el carrito
   */
  getCartCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0)
  }

  /**
   * Vacía completamente el carrito
   * Se usa después de confirmar un pedido
   *
   * INTEGRACIÓN CON BACKEND:
   * Reemplazar con: DELETE /api/cart/clear
   */
  async clearCart(): Promise<void> {
    // TODO: Descomentar cuando tengas el backend
    // await fetch(`${API_URL}/cart/clear`, {
    //   method: 'DELETE',
    //   credentials: 'include'
    // });

    // IMPLEMENTACIÓN LOCAL (actual)
    this.cart = []
    this.saveCart()
  }

  /**
   * Sincroniza el carrito con el backend
   * Útil cuando el usuario inicia sesión y tiene items en localStorage
   *
   * INTEGRACIÓN CON BACKEND:
   * POST /api/cart/sync
   * Body: { items: CartItem[] }
   */
  async syncWithBackend(): Promise<void> {
    // TODO: Implementar cuando tengas el backend
    // const localCart = this.getCart();
    // if (localCart.length > 0) {
    //   await fetch(`${API_URL}/cart/sync`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ items: localCart }),
    //     credentials: 'include'
    //   });
    // }
  }
}

export default new CartService()
export type { CartItem }
