import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Api, ProductDto as Product } from '../lib/api';

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
  computedLinesByProductId: Record<number, ComputedLine>;
}

interface CartItemWithProduct {
  productId: number;
  quantity: number;
  product: Product;
}

interface DiscountRule {
  type: 'AMOUNT' | 'PRODUCT';
  qty_from?: number | null;
  qty_to?: number | null;
  value: number;
  start_date: string;
  end_date: string;
  product_id?: number | null;
  sku_from?: number | null;
  sku_to?: number | null;
}

export interface ComputedLine {
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  ivaPercent: number;
  productDiscountPercent: number;
  productDiscountAmount: number;
  amountDiscountPercent: number;
  amountDiscountAmount: number;
  finalLineAmount: number;
  finalIvaAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemWithProduct[]>([]);
  const [discountRules, setDiscountRules] = useState<DiscountRule[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cargar reglas de descuento activas desde la API
  useEffect(() => {
    (async () => {
      try {
        const rules = await Api.listDiscounts();
        setDiscountRules(Array.isArray(rules) ? rules : []);
      } catch {
        setDiscountRules([]);
      }
    })();
  }, []);

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

  const {
    cartSubtotal,
    cartTotal,
    cartDiscount,
    cartIva,
    cartTotalWithIva,
    computedLinesByProductId,
  } = useMemo(() => {
    const lines: ComputedLine[] = [];
    const subtotal = cart.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

    // Paso 1: aplicar descuento PRODUCT por línea (usamos discount_percent del producto)
    let amountEligibleSubtotal = 0;
    for (const item of cart) {
      const unitPrice = Number(item.product.price);
      const ivaPercent = Number(item.product.iva ?? 10);
      const productDiscountPercent = Number(item.product.discount_percent ?? 0);
      const lineSubtotal = unitPrice * item.quantity;
      const afterProduct = productDiscountPercent > 0
        ? lineSubtotal * (1 - productDiscountPercent / 100)
        : lineSubtotal;
      const productDiscountAmount = lineSubtotal - afterProduct;
      if (productDiscountPercent === 0) amountEligibleSubtotal += lineSubtotal;

      lines.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        subtotal: lineSubtotal,
        ivaPercent,
        productDiscountPercent,
        productDiscountAmount,
        amountDiscountPercent: 0,
        amountDiscountAmount: 0,
        finalLineAmount: afterProduct,
        finalIvaAmount: 0,
      });
    }

    // Paso 2: determinar regla AMOUNT según la suma de líneas elegibles
    let amountDiscountPercent = 0;
    let amountDiscountTotal = 0;
    if (amountEligibleSubtotal > 0) {
      const amountRules = (discountRules || []).filter(r => r.type === 'AMOUNT');
      const matched = amountRules.find(r => {
        const from = Number(r.qty_from ?? 0);
        const to = Number(r.qty_to ?? Number.MAX_SAFE_INTEGER);
        return amountEligibleSubtotal >= from && amountEligibleSubtotal <= to;
      });
      if (matched) {
        amountDiscountPercent = Number(matched.value);
        amountDiscountTotal = amountEligibleSubtotal * (amountDiscountPercent / 100);
      }
    }

    // Paso 3: prorratear descuento AMOUNT e incluir IVA
    let totalAfterDiscounts = 0;
    let ivaTotal = 0;
    for (const line of lines) {
      let prorated = 0;
      if (amountDiscountTotal > 0 && amountEligibleSubtotal > 0 && line.productDiscountPercent === 0) {
        const weight = line.subtotal / amountEligibleSubtotal;
        prorated = amountDiscountTotal * weight;
        line.amountDiscountPercent = amountDiscountPercent;
      }
      line.amountDiscountAmount = prorated;
      line.finalLineAmount = Math.max(0, line.finalLineAmount - prorated);
      line.finalIvaAmount = line.finalLineAmount * (line.ivaPercent / 100);
      totalAfterDiscounts += line.finalLineAmount;
      ivaTotal += line.finalIvaAmount;
    }

    const discountTotal = Math.max(0, subtotal - totalAfterDiscounts);
    const totalWithIva = totalAfterDiscounts + ivaTotal;

    const map: Record<number, ComputedLine> = {};
    for (const l of lines) map[l.productId] = l;

    return {
      cartSubtotal: subtotal,
      cartTotal: totalAfterDiscounts,
      cartDiscount: discountTotal,
      cartIva: ivaTotal,
      cartTotalWithIva: totalWithIva,
      computedLinesByProductId: map,
    };
  }, [cart, discountRules]);

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
        computedLinesByProductId,
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
