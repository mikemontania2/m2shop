// hooks/useProductCarousel.ts 
import { useState, useEffect, useCallback, useRef } from 'react';
import { ProductCardData } from '../interfaces/Productos.interface';

interface UseProductCarouselOptions {
  /** Función para cargar productos */
  loadFunction: (limit: number) => Promise<ProductCardData[]>;
  /** Productos por página (debe ser múltiplo de itemsPerView) */
  itemsPerPage?: number;
  /** Cargar automáticamente al montar */
  autoLoad?: boolean;
  /** Clave única para identificar el carrusel (para debug) */
  cacheKey?: string;
}

interface UseProductCarouselReturn {
  /** Productos actuales visibles */
  products: ProductCardData[];
  /** Está cargando */
  isLoading: boolean;
  /** Hubo un error */
  error: string | null;
  /** Página actual */
  currentPage: number;
  /** Total de páginas disponibles */
  totalPages: number;
  /** Hay más productos para cargar */
  hasMore: boolean;
  /** Ir a la siguiente página */
  nextPage: () => void;
  /** Ir a la página anterior */
  prevPage: () => void;
  /** Ir a una página específica */
  goToPage: (page: number) => void;
  /** Recargar los productos */
  reload: () => void;
  /** Total de productos cargados */
  totalProducts: number;
}

/**
 * Hook para manejar carruseles de productos con paginación
 * 
 * Ejemplo de uso:
 * ```tsx
 * const loadDestacados = useCallback(
 *   (limit: number) => productosService.getDestacados(limit),
 *   []
 * );
 * 
 * const destacados = useProductCarousel({
 *   loadFunction: loadDestacados,
 *   itemsPerPage: 8,
 *   autoLoad: true
 * });
 * ```
 */
export function useProductCarousel({
  loadFunction,
  itemsPerPage = 8,
  autoLoad = true,
  cacheKey
}: UseProductCarouselOptions): UseProductCarouselReturn {
  
  const [allProducts, setAllProducts] = useState<ProductCardData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 🔧 Usar ref para evitar dependencias circulares
  const loadFunctionRef = useRef(loadFunction);
  
  // Actualizar ref cuando cambie la función
  useEffect(() => {
    loadFunctionRef.current = loadFunction;
  }, [loadFunction]);

  // Calcular productos visibles según la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = allProducts.slice(startIndex, endIndex);

  // Calcular información de paginación
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const hasMore = endIndex < allProducts.length;

  /**
   * Carga los productos desde el servicio
   */
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (cacheKey) {
        console.log(`🔄 Cargando ${cacheKey}...`);
      }

      // Cargar más productos de los que se muestran por página
      // para tener varias páginas disponibles
      const totalToLoad = itemsPerPage * 3; // 3 páginas de productos
      const loadedProducts = await loadFunctionRef.current(totalToLoad);

      setAllProducts(loadedProducts);
      setCurrentPage(0); // Reset a la primera página

      if (cacheKey) {
        console.log(`✅ ${cacheKey}: ${loadedProducts.length} productos cargados`);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error(`❌ Error cargando productos:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage, cacheKey]); // 👈 Ahora solo depende de itemsPerPage y cacheKey

  /**
   * Navegar a la siguiente página
   */
  const nextPage = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  /**
   * Navegar a la página anterior
   */
  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  /**
   * Ir a una página específica
   */
  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  /**
   * Recargar productos
   */
  const reload = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  // Cargar productos al montar si autoLoad está activo
  useEffect(() => {
    if (autoLoad) {
      loadProducts();
    }
  }, [autoLoad, loadProducts]);

  return {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasMore,
    nextPage,
    prevPage,
    goToPage,
    reload,
    totalProducts: allProducts.length
  };
}

/**
 * Hook simplificado para carruseles que no necesitan paginación
 * Solo carga los productos una vez
 */
export function useSimpleProductCarousel(
  loadFunction: () => Promise<ProductCardData[]>,
  autoLoad: boolean = true
) {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 🔧 Usar ref para evitar dependencias circulares
  const loadFunctionRef = useRef(loadFunction);
  
  useEffect(() => {
    loadFunctionRef.current = loadFunction;
  }, [loadFunction]);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loaded = await loadFunctionRef.current();
      setProducts(loaded);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error cargando productos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []); // 👈 Sin dependencias

  useEffect(() => {
    if (autoLoad) {
      load();
    }
  }, [autoLoad, load]);

  return {
    products,
    isLoading,
    error,
    reload: load
  };
}