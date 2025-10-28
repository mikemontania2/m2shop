import React, { createContext, useContext, useState, useEffect, useRef } from 'react'; 
import cartService, { CartItem } from '../services/cart.service'; 
import { obtenerCategorias } from '../services/categorias.services';
import { Category } from '../interfaces/Categorias.interface';
import authService, { User } from '../services/auth.service';
import { Product } from '../interfaces/Productos.interface';

interface AppContextType {
  // Usuario y autenticación
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;

  // Carrito de compras
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartLoading: boolean;
  addToCart: (product: Product, cantidad?: number) => Promise<void>;
  removeFromCart: (itemCarritoId: number) => Promise<void>;
  updateQuantity: (itemCarritoId: number, cantidad: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;

  // Categorías
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
  // ========== ESTADOS ==========
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // 🔧 Ref para evitar múltiples llamadas simultáneas
  const isRefreshingCart = useRef(false);
  const isInitialized = useRef(false);

  // ========== FUNCIONES DE CARRITO (BACKEND) ==========
  
  /**
   * Refrescar carrito desde el backend
   */
  const refreshCart = async () => {
    // 🛡️ Evitar llamadas simultáneas
    if (isRefreshingCart.current) {
      console.log('⏳ refreshCart ya está en ejecución, saltando...');
      return;
    }

    try {
      isRefreshingCart.current = true;
      setCartLoading(true);
      
      console.log('🔄 Iniciando refreshCart...');
      const cartData = await cartService.getCart(); 
      console.log('📦 Cart refrescado:', { 
        items: cartData.carrito.items.length,
        total: cartData.resumen.total,
        count: cartData.resumen.cantidadItems 
      });
      
      setCart(cartData.carrito.items);
      setCartTotal(cartData.resumen.total);
      setCartCount(cartData.resumen.cantidadItems || 0);
    } catch (error) {
      console.error('❌ Error refreshing cart:', error);
      // En caso de error, inicializar vacío
      setCart([]);
      setCartTotal(0);
      setCartCount(0);
    } finally {
      setCartLoading(false);
      isRefreshingCart.current = false;
    }
  };

  /**
   * Agregar producto al carrito
   * @param variante - Producto (variante) a agregar
   * @param cantidad - Cantidad a agregar (default: 1)
   */
  const addToCart = async (variante: Product, cantidad: number = 1) => {
    try {
      console.log('🛒 Agregando al carrito:', { 
        varianteId: variante.id, 
        nombre: variante.name,
        cantidad 
      }); 
      
      await cartService.addToCart(variante.id, cantidad);
      
      // 🔧 Refrescar carrito después de agregar
      await refreshCart();
      
      showToast('Producto agregado al carrito', 'success');
    } catch (error: any) {
      console.error('❌ Error adding to cart:', error);
      showToast(error.message || 'Error al agregar al carrito', 'error');
      throw error;
    }
  };

  /**
   * Eliminar item del carrito
   * @param itemCarritoId - ID del item en el carrito
   */
  const removeFromCart = async (itemCarritoId: number) => {
    try {
      await cartService.removeFromCart(itemCarritoId);
      await refreshCart();
      showToast('Producto eliminado del carrito', 'info');
    } catch (error: any) {
      console.error('❌ Error removing from cart:', error);
      showToast(error.message || 'Error al eliminar del carrito', 'error');
      throw error;
    }
  };

  /**
   * Actualizar cantidad de un item
   * @param itemCarritoId - ID del item en el carrito
   * @param cantidad - Nueva cantidad
   */
  const updateQuantity = async (itemCarritoId: number, cantidad: number) => {
    try {
      if (cantidad < 1) {
        await removeFromCart(itemCarritoId);
        return;
      }
      
      await cartService.updateQuantity(itemCarritoId, cantidad);
      await refreshCart();
    } catch (error: any) {
      console.error('❌ Error updating quantity:', error);
      showToast(error.message || 'Error al actualizar cantidad', 'error');
      throw error;
    }
  };

  /**
   * Vaciar carrito completo
   */
  const clearCart = async () => {
    try {
      await cartService.clearCart();
      await refreshCart();
      showToast('Carrito vaciado', 'info');
    } catch (error: any) {
      console.error('❌ Error clearing cart:', error);
      showToast(error.message || 'Error al vaciar carrito', 'error');
      throw error;
    }
  };

  // ========== FUNCIONES DE AUTENTICACIÓN ==========

  /**
   * Iniciar sesión con el nuevo servicio de backend
   */
  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    
    if (result.success && result.user) {
      setUser(result.user);
      showToast('Sesión iniciada correctamente', 'success');
      
      // 🔧 Refrescar carrito después del login (ahora con datos del usuario)
      await refreshCart();
    } else {
      showToast(result.message || 'Error al iniciar sesión', 'error');
    }
    
    return result;
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    authService.logout();
    setUser(null);
    
    // Limpiar carrito localmente
    setCart([]);
    setCartTotal(0);
    setCartCount(0);
    
    // Limpiar sessionId antigua (se generará una nueva automáticamente)
    localStorage.removeItem('sessionId');
    
    showToast('Sesión cerrada', 'info');
    
    // 🔧 Refrescar carrito (ahora será carrito de sesión anónima nueva)
    await refreshCart();
  };

  /**
   * Actualizar datos del usuario desde el servidor
   */
  const refreshUser = async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      return;
    }

    const result = await authService.getProfile();
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      // Si falla, cerrar sesión
      await logout();
    }
  };

  /**
   * Renovar token automáticamente
   */
  const autoRenewToken = async () => {
    if (!authService.isAuthenticated()) return;

    const result = await authService.renewToken();
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      await logout();
    }
  };

  // ========== FUNCIONES DE CATEGORÍAS ==========

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);

      // Intentar cargar desde caché
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

      // Si no hay caché válido, traer del servidor
      const data = await obtenerCategorias();
      setCategories(data);

      // Guardar en caché
      localStorage.setItem('categories_cache', JSON.stringify(data));
      localStorage.setItem('categories_cache_time', Date.now().toString());

    } catch (error) {
      console.error('Error cargando categorías:', error);
      setCategoriesError('No se pudieron cargar las categorías');
      
      // En caso de error, intentar usar caché antiguo si existe
      const cached = localStorage.getItem('categories_cache');
      if (cached) {
        setCategories(JSON.parse(cached));
        showToast('Mostrando categorías en caché', 'info');
      }
    } finally {
      setCategoriesLoading(false);
    }
  };

  const refreshCategories = async () => {
    localStorage.removeItem('categories_cache');
    localStorage.removeItem('categories_cache_time');
    await loadCategories();
  };

  // ========== FUNCIONES DE TOASTS ==========

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  // ========== EFECTOS ==========

  // 🔧 Efecto inicial: cargar datos UNA SOLA VEZ
  useEffect(() => {
    // Prevenir ejecución múltiple en React Strict Mode
    if (isInitialized.current) {
      console.log('⚠️ AppContext ya inicializado, saltando...');
      return;
    }

    const initializeApp = async () => {
      console.log('🚀 Inicializando aplicación...');
      isInitialized.current = true;
      
      // Cargar categorías (no depende de auth)
      await loadCategories();
      
      // Si hay usuario, verificar que el token sea válido
      if (authService.isAuthenticated()) {
        await refreshUser();
      }
      
      // Cargar carrito al final (esto generará sessionId si no existe)
      await refreshCart();
      
      console.log('✅ Aplicación inicializada');
    };

    initializeApp();

    // 🔧 Cleanup en caso de unmount (aunque no debería pasar con AppProvider)
    return () => {
      console.log('🧹 Cleanup AppContext');
    };
  }, []); // 🎯 Array vacío = solo se ejecuta UNA vez

  // Renovar token cada 20 minutos
  useEffect(() => {
    if (!authService.isAuthenticated()) return;

    const interval = setInterval(() => {
      autoRenewToken();
    }, 20 * 60 * 1000); // 20 minutos

    return () => clearInterval(interval);
  }, [user]);

  // ========== PROVIDER ==========

  return (
    <AppContext.Provider
      value={{
        // Usuario
        user,
        isAuthenticated: authService.isAuthenticated(),
        login,
        logout,
        refreshUser,
        
        // Carrito
        cart,
        cartCount,
        cartTotal,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        
        // Categorías
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