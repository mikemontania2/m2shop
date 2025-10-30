import React, { useState, useEffect } from 'react';
 import * as productosAdminService from '../services/admin/ProductoServices.admin';
 import "../styles/AdminProduct.css"
import { Category } from '../interfaces/Categorias.interface';
import { ProductoAdmin } from '../services/admin/ProductoServices.admin';
import { useApp } from '../contexts/AppContext';
 
interface ProductFormProps {
  producto: ProductoAdmin | null;
  categories: Category[];
  isEdit: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  producto,
  categories,
  isEdit,
  onSave,
  onCancel
}) => {
  const { showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState<Category[]>([]);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    slug: '',
    descripcion: '',
    categoriaId: '',
    subcategoriaId: '',
    activo: true,
    usosRecomendados: [''],
    propiedades: {} as Record<string, any>
  });

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (producto && isEdit) {
      setFormData({
        nombre: producto.nombre || '',
        slug: producto.slug || '',
        descripcion: producto.descripcion || '',
        categoriaId: producto.categoriaId?.toString() || '',
        subcategoriaId: producto.subcategoriaId?.toString() || '',
        activo: producto.activo ?? true,
        usosRecomendados: producto.usosRecomendados || [''],
        propiedades: producto.propiedades || {}
      });
    }
  }, [producto, isEdit]);

  // Cargar subcategorías cuando cambia la categoría
  useEffect(() => {
    if (formData.categoriaId) {
      const categoria = categories.find(c => c.id === Number(formData.categoriaId));
      setSubcategories(categoria?.subcategorias || []);
    } else {
      setSubcategories([]);
    }
  }, [formData.categoriaId, categories]);

  // Auto-generar slug desde el nombre
  useEffect(() => {
    if (formData.nombre && !isEdit) {
      const generatedSlug = productosAdminService.generateSlug(formData.nombre);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.nombre, isEdit]);

  // Manejadores
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUsoChange = (index: number, value: string) => {
    const newUsos = [...formData.usosRecomendados];
    newUsos[index] = value;
    setFormData(prev => ({ ...prev, usosRecomendados: newUsos }));
  };

  const addUso = () => {
    setFormData(prev => ({
      ...prev,
      usosRecomendados: [...prev.usosRecomendados, '']
    }));
  };

  const removeUso = (index: number) => {
    const newUsos = formData.usosRecomendados.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, usosRecomendados: newUsos }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    const validation = productosAdminService.validateProductoData({
      nombre: formData.nombre,
      slug: formData.slug,
      categoriaId: Number(formData.categoriaId)
    });

    if (!validation.valid) {
      validation.errors.forEach(error => showToast(error, 'error'));
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        nombre: formData.nombre,
        slug: formData.slug,
        descripcion: formData.descripcion || undefined,
        categoriaId: Number(formData.categoriaId),
        subcategoriaId: formData.subcategoriaId ? Number(formData.subcategoriaId) : undefined,
        activo: formData.activo,
        usosRecomendados: formData.usosRecomendados.filter(u => u.trim() !== ''),
        propiedades: Object.keys(formData.propiedades).length > 0 ? formData.propiedades : undefined
      };

      if (isEdit && producto) {
        await productosAdminService.updateProducto(producto.id, dataToSend);
        showToast('Producto actualizado exitosamente', 'success');
      } else {
        await productosAdminService.createProducto(dataToSend);
        showToast('Producto creado exitosamente', 'success');
      }

      onSave();
    } catch (error: any) {
      showToast(error.message || 'Error al guardar producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="admin-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Información Básica</h3>
            
            <div className="form-grid">
              <div className="form-group span-2">
                <label htmlFor="nombre">
                  Nombre del Producto <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Lavandina Concentrada"
                  required
                />
              </div>

              <div className="form-group span-2">
                <label htmlFor="slug">
                  Slug (URL) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="lavandina-concentrada"
                  required
                />
                <small>Se genera automáticamente del nombre, pero puedes editarlo</small>
              </div>

              <div className="form-group span-2">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descripción general del producto..."
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Categorización</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="categoriaId">
                  Categoría <span className="required">*</span>
                </label>
                <select
                  id="categoriaId"
                  name="categoriaId"
                  value={formData.categoriaId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subcategoriaId">Subcategoría</label>
                <select
                  id="subcategoriaId"
                  name="subcategoriaId"
                  value={formData.subcategoriaId}
                  onChange={handleChange}
                  disabled={!formData.categoriaId || subcategories.length === 0}
                >
                  <option value="">Sin subcategoría</option>
                  {subcategories.map(subcat => (
                    <option key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Usos Recomendados</h3>
            
            <div className="form-array">
              {formData.usosRecomendados.map((uso, index) => (
                <div key={index} className="form-array-item">
                  <input
                    type="text"
                    value={uso}
                    onChange={(e) => handleUsoChange(index, e.target.value)}
                    placeholder={`Uso recomendado ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => removeUso(index)}
                    disabled={formData.usosRecomendados.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                className="btn-secondary"
                onClick={addUso}
              >
                + Agregar Uso
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3>Estado</h3>
            
            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
              <label htmlFor="activo">
                Producto activo (visible en la tienda)
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : isEdit ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .product-form-container {
          max-width: 900px;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .form-section h3 {
          margin-bottom: 1rem;
          color: #333;
          font-size: 1.25rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.span-2 {
          grid-column: span 2;
        }

        .form-group label {
          font-weight: 500;
          color: #555;
        }

        .required {
          color: #dc3545;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .form-group small {
          color: #888;
          font-size: 0.85rem;
        }

        .form-array {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-array-item {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .form-array-item input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-group-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group-checkbox input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
        }

        .form-group-checkbox label {
          cursor: pointer;
          margin: 0;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.span-2 {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductForm;