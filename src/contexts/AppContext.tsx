import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { User } from '../services/authService';
import cartService, { CartItem } from '../services/cartService';
import { Product } from '../services/productService'; 
import { Category } from '../interfaces/interfaces';
import { obtenerCategorias } from '../services/categorias.services';

interface AppContextType {
  // Usuario y autenticación
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;

  // Carrito de compras
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;

  // Categorías (NUEVO)
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  refreshCategories: () => Promise<void>;

  // Sistema de notificaciones (toasts)
  toasts: { id: number; message: string; type: 'success' | 'error' | 'info' }[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ========== ESTADOS EXISTENTES ==========
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [cart, setCart] = useState<CartItem[]>(cartService.getCart());
  const [cartCount, setCartCount] = useState(cartService.getCartCount());
  const [cartTotal, setCartTotal] = useState(cartService.getCartTotal());
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // ========== ESTADOS NUEVOS PARA CATEGORÍAS ==========
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // ========== FUNCIONES EXISTENTES ==========
  
  // Actualiza el estado del carrito desde el servicio
  const updateCartState = () => {
    setCart(cartService.getCart());
    setCartCount(cartService.getCartCount());
    setCartTotal(cartService.getCartTotal());
  };

  // Maneja el inicio de sesión del usuario
  const login = (email: string, password: string) => {
    const result = authService.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  // Cierra la sesión del usuario
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Muestra notificaciones temporales (toasts)
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto-eliminar el toast después de 2.5 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  // Agrega un producto al carrito
  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    cartService.addToCart(product, quantity, size, color);
    updateCartState();
    showToast('Producto agregado al carrito', 'success');
  };

  // Elimina un producto del carrito
  const removeFromCart = (productId: number, size: string, color: string) => {
    cartService.removeFromCart(productId, size, color);
    updateCartState();
  };

  // Actualiza la cantidad de un producto en el carrito
  const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
    cartService.updateQuantity(productId, size, color, quantity);
    updateCartState();
  };

  // Vacía completamente el carrito
  const clearCart = () => {
    cartService.clearCart();
    updateCartState();
  };

  // ========== FUNCIONES NUEVAS PARA CATEGORÍAS ==========

  /**
   * Carga las categorías desde el backend
   * Incluye caché en localStorage para evitar llamadas innecesarias
   */
  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);

      // 🎯 Intentar cargar desde caché
      const cached = localStorage.getItem('categories_cache');
      const cacheTime = localStorage.getItem('categories_cache_time');

      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        // Si el caché tiene menos de 10 minutos, usarlo
        if (age < 10 * 60 * 1000) {
          setCategories(JSON.parse(cached));
          setCategoriesLoading(false);
          return;
        }
      }

      // 🌐 Si no hay caché válido, traer del servidor
      const data = await obtenerCategorias();
      setCategories(data);

      // 💾 Guardar en caché
      localStorage.setItem('categories_cache', JSON.stringify(data));
      localStorage.setItem('categories_cache_time', Date.now().toString());

    } catch (error) {
      console.error('Error cargando categorías:', error);
      setCategoriesError('No se pudieron cargar las categorías');
      
      // 🔄 En caso de error, intentar usar caché antiguo si existe
      const cached = localStorage.getItem('categories_cache');
      if (cached) {
        setCategories(JSON.parse(cached));
        showToast('Mostrando categorías en caché', 'info');
      }
    } finally {
      setCategoriesLoading(false);
    }
  };

  /**
   * Fuerza la recarga de categorías desde el servidor
   * Útil cuando se agregan/modifican categorías en el admin
   */
  const refreshCategories = async () => {
    // Limpiar caché antes de recargar
    localStorage.removeItem('categories_cache');
    localStorage.removeItem('categories_cache_time');
    await loadCategories();
  };

  // ========== EFECTOS ==========

  // Efecto inicial: cargar carrito y categorías
  useEffect(() => {
    updateCartState();
    loadCategories(); // 🚀 Cargar categorías al iniciar la app
  }, []);

  // ========== PROVIDER ==========

  return (
    <AppContext.Provider
      value={{
        // Usuario
        user,
        login,
        logout,
        
        // Carrito
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        // Categorías (NUEVO)
        categories,
        categoriesLoading,
        categoriesError,
        refreshCategories,
        
        // Toasts
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};