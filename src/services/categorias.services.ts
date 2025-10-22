import { API_BASE_URL } from "../Config";
import { Category } from "../interfaces/interfaces";

// ========== INTERFACES PARA EL BACKEND ==========

interface CategoriaBackend {
  nombre: string;
  slug: string;
  descripcion?: string;
  imagenUrl?: string;
  categoriasPadreId?: number | null;
  orden?: number;
  activo?: boolean;
}

interface SubcategoriaBackend {
  nombre: string;
  slug: string;
  descripcion?: string;
  orden?: number;
}

// ========== FUNCIONES AUXILIARES ==========

/**
 * Genera un slug a partir de un nombre
 */
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar espacios y caracteres especiales con -
    .replace(/^-+|-+$/g, ''); // Remover guiones al inicio y final
};

// ========== MÉTODOS DEL SERVICIO ==========

/**
 * Obtener todas las categorías con sus subcategorías
 */
export const obtenerCategorias = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const categorias: Category[] = await response.json();
    return categorias;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

/**
 * Obtener una categoría por su slug
 */
export const obtenerCategoriaPorSlug = async (slug: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    throw error;
  }
};

/**
 * Crear una nueva categoría principal con sus subcategorías
 */
export const crearCategoria = async (categoria: Category): Promise<any> => {
  try {
    // 1. Crear la categoría padre
    const categoriaPadre: CategoriaBackend = {
      nombre: categoria.name,
      slug: categoria.id, // El frontend ya maneja el slug como id
      descripcion: categoria.description || '',
      imagenUrl: categoria.image || '',
      categoriasPadreId: null,
      orden: 0,
      activo: true
    };

    const responsePadre = await fetch(`${API_BASE_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoriaPadre),
    });

    if (!responsePadre.ok) {
      const errorData = await responsePadre.json();
      throw new Error(errorData.mensaje || 'Error al crear categoría');
    }

    const { categoria: categoriaCreadaDB } = await responsePadre.json();

    // 2. Crear las subcategorías si existen
    if (categoria.subcategories && categoria.subcategories.length > 0) {
      const promesasSubcategorias = categoria.subcategories.map((sub, index) => {
        const subcategoria: CategoriaBackend = {
          nombre: sub.name,
          slug: sub.id,
          descripcion: sub.description || '',
          categoriasPadreId: categoriaCreadaDB.id, // ID de la categoría padre creada
          orden: index,
          activo: true
        };

        return fetch(`${API_BASE_URL}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subcategoria),
        });
      });

      await Promise.all(promesasSubcategorias);
    }

    return categoriaCreadaDB;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

/**
 * Actualizar una categoría existente y sus subcategorías
 */
export const actualizarCategoria = async (
  idOriginal: string, 
  categoria: Category
): Promise<any> => {
  try {
    // 1. Obtener la categoría actual del backend para tener su ID numérico
    const categoriaActual = await obtenerCategoriaPorSlug(idOriginal);

    if (!categoriaActual) {
      throw new Error('Categoría no encontrada');
    }

    // 2. Actualizar la categoría padre
    const datosActualizados: Partial<CategoriaBackend> = {
      nombre: categoria.name,
      slug: categoria.id,
      descripcion: categoria.description || '',
      imagenUrl: categoria.image || '',
    };

    const response = await fetch(`${API_BASE_URL}/categorias/${categoriaActual.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al actualizar categoría');
    }

    // 3. Manejar subcategorías (simplificado: eliminar todas y recrear)
    // Nota: En producción, deberías hacer un diff para actualizar/crear/eliminar selectivamente
    
    // Desactivar subcategorías antiguas
    if (categoriaActual.subcategorias && categoriaActual.subcategorias.length > 0) {
      const promesasEliminar = categoriaActual.subcategorias.map((sub: any) =>
        fetch(`${API_BASE_URL}/categorias/${sub.id}`, {
          method: 'DELETE',
        })
      );
      await Promise.all(promesasEliminar);
    }

    // Crear nuevas subcategorías
    if (categoria.subcategories && categoria.subcategories.length > 0) {
      const promesasSubcategorias = categoria.subcategories.map((sub, index) => {
        const subcategoria: CategoriaBackend = {
          nombre: sub.name,
          slug: sub.id,
          descripcion: sub.description || '',
          categoriasPadreId: categoriaActual.id,
          orden: index,
          activo: true
        };

        return fetch(`${API_BASE_URL}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subcategoria),
        });
      });

      await Promise.all(promesasSubcategorias);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    throw error;
  }
};

/**
 * Eliminar una categoría (soft delete)
 */
export const eliminarCategoria = async (slug: string): Promise<void> => {
  try {
    // Primero obtener el ID numérico
    const categoria = await obtenerCategoriaPorSlug(slug);
    
    if (!categoria) {
      throw new Error('Categoría no encontrada');
    }

    const response = await fetch(`${API_BASE_URL}/categorias/${categoria.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al eliminar categoría');
    }
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    throw error;
  }
};

// Exportar también la función auxiliar por si se necesita
export { generateSlug };