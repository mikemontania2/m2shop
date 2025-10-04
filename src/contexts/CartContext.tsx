import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
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
  cartLineInfo: Record<number, ComputedLineInfo>;
}

interface CartItemWithProduct {
  productId: number;
  quantity: number;
  product: Product;
}

type ComputedLineInfo = {
  unitPrice: number;
  quantity: number;
  lineSubtotal: number;
  productDiscountPercent: number;
  productDiscountAmount: number;
  amountDiscountPercent: number;
  amountDiscountAmount: number;
  discountPercent: number; // for display
  discountAmount: number; // for display
  discountType: 'producto' | 'importe' | null; // for display
  finalLineAmount: number;
  ivaPercent: number;
  ivaAmount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemWithProduct[]>([]);
  const [discounts, setDiscounts] = useState<any[] | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch active discounts (for AMOUNT rules) once
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const list = await Api.listDiscounts();
        if (isMounted) setDiscounts(list);
      } catch {
        if (isMounted) setDiscounts([]);
      }
    })();
    return () => { isMounted = false; };
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

  // Recalculate cart totals and line info applying PRODUCT and AMOUNT discounts
  const {
    cartSubtotal,
    cartTotal,
    cartDiscount,
    cartIva,
    cartTotalWithIva,
    cartLineInfo,
  } = useMemo(() => {
    const lineInfos: Record<number, ComputedLineInfo> = {};
    let subtotal = 0;
    let amountEligibleSubtotal = 0;

    // First pass: compute per-line subtotal and product discount
    for (const item of cart) {
      const unitPrice = Number(item.product.price);
      const quantity = Number(item.quantity);
      const lineSubtotal = unitPrice * quantity;
      subtotal += lineSubtotal;

      const productDiscountPercent = Number(item.product.discount_percent ?? 0);
      const lineAfterProduct = productDiscountPercent > 0
        ? lineSubtotal * (1 - productDiscountPercent / 100)
        : lineSubtotal;
      const productDiscountAmount = lineSubtotal - lineAfterProduct;

      const ivaPercent = Number(item.product.iva ?? 10);

      lineInfos[item.productId] = {
        unitPrice,
        quantity,
        lineSubtotal,
        productDiscountPercent,
        productDiscountAmount,
        amountDiscountPercent: 0,
        amountDiscountAmount: 0,
        discountPercent: productDiscountPercent > 0 ? productDiscountPercent : 0,
        discountAmount: productDiscountAmount,
        discountType: productDiscountPercent > 0 ? 'producto' : null,
        finalLineAmount: lineAfterProduct,
        ivaPercent,
        ivaAmount: 0,
      };

      // Only lines without PRODUCT discount are eligible for AMOUNT
      if (productDiscountPercent <= 0) {
        amountEligibleSubtotal += lineSubtotal;
      }
    }

    // Determine AMOUNT rule based on eligible subtotal
    let amountDiscountPercent = 0;
    if (amountEligibleSubtotal > 0 && Array.isArray(discounts)) {
      const now = new Date();
      const amountRules = discounts.filter((d: any) =>
        d.type === 'AMOUNT' &&
        new Date(d.start_date) <= now &&
        new Date(d.end_date) >= now &&
        Number(d.qty_from ?? 0) <= amountEligibleSubtotal &&
        Number(d.qty_to ?? Number.MAX_SAFE_INTEGER) >= amountEligibleSubtotal
      );
      if (amountRules.length > 0) {
        // Pick the highest value percent
        amountDiscountPercent = Number(amountRules.sort((a: any, b: any) => Number(b.value) - Number(a.value))[0].value) || 0;
      }
    }

    // Second pass: prorate AMOUNT on eligible lines and compute IVA and totals
    let totalAfterAllDiscounts = 0;
    let totalIva = 0;
    if (amountDiscountPercent > 0 && amountEligibleSubtotal > 0) {
      for (const item of cart) {
        const info = lineInfos[item.productId];
        let proratedAmountDiscount = 0;
        if (info.productDiscountPercent <= 0) {
          // Prorate by line subtotal weight
          const weight = info.lineSubtotal / amountEligibleSubtotal;
          const amountDiscountValue = amountEligibleSubtotal * (amountDiscountPercent / 100);
          proratedAmountDiscount = amountDiscountValue * weight;
          info.amountDiscountPercent = amountDiscountPercent;
          info.amountDiscountAmount = proratedAmountDiscount;

          // For display, AMOUNT discount is the discount to show
          info.discountPercent = amountDiscountPercent;
          info.discountAmount = proratedAmountDiscount;
          info.discountType = 'importe';
        }
        info.finalLineAmount = info.finalLineAmount - proratedAmountDiscount;
        info.ivaAmount = info.finalLineAmount * (info.ivaPercent / 100);
        totalAfterAllDiscounts += info.finalLineAmount;
        totalIva += info.ivaAmount;
      }
    } else {
      // No AMOUNT discount; compute IVA based on product-discounted lines
      for (const item of cart) {
        const info = lineInfos[item.productId];
        info.ivaAmount = info.finalLineAmount * (info.ivaPercent / 100);
        totalAfterAllDiscounts += info.finalLineAmount;
        totalIva += info.ivaAmount;
      }
    }

    const total = totalAfterAllDiscounts;
    const discountTotal = Math.max(0, subtotal - total);
    const totalWithIva = total + totalIva;

    return {
      cartSubtotal: subtotal,
      cartTotal: total,
      cartDiscount: discountTotal,
      cartIva: totalIva,
      cartTotalWithIva: totalWithIva,
      cartLineInfo: lineInfos,
    };
  }, [cart, discounts]);

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
        cartLineInfo,
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
