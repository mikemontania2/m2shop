import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductDto as Product } from '../lib/api';

interface CartContextType {
  cart: CartItemWithProduct[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number; // sum of original prices
  cartDiscount: number; // total discount amount (positive number)
  cartTotal: number; // subtotal - discount (sin IVA)
  cartIva: number; // IVA estimado sobre el total con descuentos
  cartTotalWithIva: number; // total + IVA
  cartCount: number;
}

interface CartItemWithProduct {
  productId: number;
  quantity: number;
  product: Product;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemWithProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(current => {
      const existingItem = current.find(item => item.productId === product.id);
      if (existingItem) {
        return current.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { productId: product.id, quantity, product }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(current => current.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(current =>
      current.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getDiscountedUnitPrice = (product: Product): number => {
    const percent = product.discount_percent ?? 0;
    if (percent > 0) {
      const computed = Math.round(product.price * (1 - percent / 100));
      return computed;
    }
    return product.price;
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + getDiscountedUnitPrice(item.product) * item.quantity,
    0
  );
  const cartDiscount = Math.max(0, cartSubtotal - cartTotal);

  const cartIva = cart.reduce((sum, item) => {
    const ivaPercent = item.product.iva ?? 10;
    const discountedLine = getDiscountedUnitPrice(item.product) * item.quantity;
    return sum + discountedLine * (ivaPercent / 100);
  }, 0);

  const cartTotalWithIva = cartTotal + cartIva;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartIva,
        cartTotalWithIva,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
