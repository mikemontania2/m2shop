import { Product } from './productService';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

class CartService {
  private cart: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(product: Product, quantity: number, size: string, color: string): void {
    const existingItem = this.cart.find(
      item => item.product.id === product.id &&
               item.size === size &&
               item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ product, quantity, size, color });
    }

    this.saveCart();
  }

  removeFromCart(productId: number, size: string, color: string): void {
    this.cart = this.cart.filter(
      item => !(item.product.id === productId && item.size === size && item.color === color)
    );
    this.saveCart();
  }

  updateQuantity(productId: number, size: string, color: string, quantity: number): void {
    const item = this.cart.find(
      item => item.product.id === productId && item.size === size && item.color === color
    );
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId, size, color);
      } else {
        this.saveCart();
      }
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }
}

export default new CartService();
