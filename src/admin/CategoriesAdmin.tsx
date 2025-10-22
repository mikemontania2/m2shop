import React, { useEffect, useState } from 'react';
import { Category, Subcategory } from '../interfaces/interfaces';
import { useApp } from '../contexts/AppContext';
import * as categoriaService from '../services/categorias.services';

// Categoría vacía para crear una nueva
const emptyCategory = (id: string): Category => ({ 
  id, 
  name: '', 
  description: '', 
  image: '', 
  subcategories: [] 
});

const CategoriesAdmin: React.FC = () => {
  // 🎯 Obtener categorías del contexto y función para refrescar
  const { categories, refreshCategories, showToast } = useApp();
  
  // Estados locales para la edición
  const [editing, setEditing] = useState<Category | null>(null);
  const [originalId, setOriginalId] = useState<string>(''); // Para actualizar
  const [loading, setLoading] = useState(false);

  // Función para iniciar creación de nueva categoría
  const startNew = () => {
    const newId = 'categoria-' + Date.now();
    setEditing(emptyCategory(newId));
    setOriginalId('');
  };

  // Función para iniciar edición de categoría existente
  const startEdit = (c: Category) => {
    setEditing(JSON.parse(JSON.stringify(c)) as Category);
    setOriginalId(c.id); // Guardar el ID original
  };

  // Cancelar edición
  const cancel = () => {
    setEditing(null);
    setOriginalId('');
  };

  // Guardar categoría (crear o actualizar)
  const save = async () => {
    if (!editing) return;

    // Validaciones básicas
    if (!editing.name.trim()) {
      showToast('El nombre es obligatorio', 'error');
      return;
    }

    if (!editing.id.trim()) {
      showToast('El ID/slug es obligatorio', 'error');
      return;
    }

    try {
      setLoading(true);

      if (originalId) {
        // 📝 Actualizar categoría existente
        await categoriaService.actualizarCategoria(originalId, editing);
        showToast('Categoría actualizada correctamente', 'success');
      } else {
        // ➕ Crear nueva categoría
        await categoriaService.crearCategoria(editing);
        showToast('Categoría creada correctamente', 'success');
      }

      // 🔄 Refrescar categorías en el contexto (borra caché y recarga)
      await refreshCategories();
      
      // Limpiar formulario
      setEditing(null);
      setOriginalId('');
    } catch (error: any) {
      console.error('Error al guardar categoría:', error);
      showToast(error.message || 'Error al guardar categoría', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar categoría
  const remove = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar esta categoría?')) return;

    try {
      setLoading(true);
      await categoriaService.eliminarCategoria(id);
      showToast('Categoría eliminada correctamente', 'success');
      
      // 🔄 Refrescar categorías
      await refreshCategories();
    } catch (error: any) {
      console.error('Error al eliminar categoría:', error);
      showToast(error.message || 'Error al eliminar categoría', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Agregar subcategoría
  const addSub = () => {
    if (!editing) return;
    const newSub: Subcategory = { 
      id: 'sub-' + Date.now(), 
      name: '', 
      description: '' 
    };
    setEditing({ 
      ...editing, 
      subcategories: [...(editing.subcategories || []), newSub] 
    });
  };

  // Eliminar subcategoría
  const removeSub = (sid: string) => {
    if (!editing) return;
    setEditing({ 
      ...editing, 
      subcategories: (editing.subcategories || []).filter(s => s.id !== sid) 
    });
  };

  // Generar slug automáticamente desde el nombre
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto-generar ID/slug cuando se escribe el nombre (solo para nuevas categorías)
  const handleNameChange = (name: string) => {
    if (!editing) return;
    
    const slug = generateSlug(name);
    
    // Solo auto-generar si es una categoría nueva (no tiene originalId)
    if (!originalId) {
      setEditing({ ...editing, name, id: slug });
    } else {
      setEditing({ ...editing, name });
    }
  };

  return (
    <div>
      <h2>Gestión de Categorías</h2>
      
      <div style={{ marginBottom: 16 }}>
        <button 
          className="btn-primary" 
          onClick={startNew}
          disabled={loading}
        >
          Nueva Categoría
        </button>
      </div>

      {/* Formulario de edición/creación */}
      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <h3>{originalId ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
          
          <div className="form-grid">
            <label>
              Nombre *
              <input 
                value={editing.name} 
                onChange={e => handleNameChange(e.target.value)}
                placeholder="Ej: Limpieza y Desinfección"
                disabled={loading}
              />
            </label>
            
            <label>
              ID/Slug *
              <input 
                value={editing.id} 
                onChange={e => setEditing({ ...editing, id: e.target.value })}
                placeholder="limpieza-y-desinfeccion"
                disabled={loading || !!originalId} // No editable si es actualización
              />
              {originalId && (
                <small style={{ color: '#666' }}>
                  El ID no se puede modificar en categorías existentes
                </small>
              )}
            </label>
            
            <label>
              Descripción
              <textarea 
                value={editing.description || ''} 
                onChange={e => setEditing({ ...editing, description: e.target.value })}
                placeholder="Descripción de la categoría"
                disabled={loading}
              />
            </label>
            
            <label>
              URL de Imagen
              <input 
                value={editing.image || ''} 
                onChange={e => setEditing({ ...editing, image: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
                disabled={loading}
              />
            </label>
          </div>

          {/* Subcategorías */}
          <div style={{ marginTop: 16 }}>
            <h4>Subcategorías</h4>
            <button 
              className="btn-secondary" 
              onClick={addSub}
              disabled={loading}
            >
              Agregar Subcategoría
            </button>
            
            <div style={{ marginTop: 12 }}>
              {(editing.subcategories || []).map((s, index) => (
                <div key={s.id} className="form-grid" style={{ marginBottom: 12, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                  <label>
                    Nombre *
                    <input 
                      value={s.name} 
                      onChange={e => {
                        const newName = e.target.value;
                        const newSlug = generateSlug(newName);
                        setEditing({ 
                          ...editing, 
                          subcategories: (editing.subcategories || []).map((x, i) => 
                            i === index ? { ...s, name: newName, id: newSlug } : x
                          ) 
                        });
                      }}
                      placeholder="Ej: Bolsas"
                      disabled={loading}
                    />
                  </label>
                  
                  <label>
                    ID/Slug *
                    <input 
                      value={s.id} 
                      onChange={e => setEditing({ 
                        ...editing, 
                        subcategories: (editing.subcategories || []).map((x, i) => 
                          i === index ? { ...s, id: e.target.value } : x
                        ) 
                      })}
                      placeholder="bolsas"
                      disabled={loading}
                    />
                  </label>
                  
                  <label>
                    Descripción
                    <input 
                      value={s.description || ''} 
                      onChange={e => setEditing({ 
                        ...editing, 
                        subcategories: (editing.subcategories || []).map((x, i) => 
                          i === index ? { ...s, description: e.target.value } : x
                        ) 
                      })}
                      placeholder="Descripción opcional"
                      disabled={loading}
                    />
                  </label>
                  
                  <div style={{ display: 'flex', alignItems: 'end' }}>
                    <button 
                      className="btn-secondary" 
                      onClick={() => removeSub(s.id)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button 
              className="btn-primary" 
              onClick={save}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button 
              className="btn-secondary" 
              onClick={cancel}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabla de categorías */}
      <div className="admin-panel">
        <h3>Categorías Existentes</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Subcategorías</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>
                  No hay categorías registradas
                </td>
              </tr>
            )}
            {categories.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{(c.subcategories || []).length}</td>
                <td>
                  <button 
                    className="btn-secondary" 
                    onClick={() => startEdit(c)}
                    disabled={loading}
                  >
                    Editar
                  </button>{' '}
                  <button 
                    className="btn-secondary" 
                    onClick={() => remove(c.id)}
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesAdmin;