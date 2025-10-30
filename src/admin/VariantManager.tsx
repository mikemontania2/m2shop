import React, { useState, useEffect } from 'react';
import { AtributoAdmin, createVariante, deleteVariante, generateSKU, ProductoAdmin, updateVariante, validateVarianteData, VarianteAdmin } from '../services/admin/ProductoServices.admin';
import { useApp } from '../contexts/AppContext';
  import "../styles/AdminProduct.css"

interface VariantManagerProps {
  producto: ProductoAdmin;
  atributos: AtributoAdmin[];
  onBack: () => void;
  onVariantsUpdated: () => void;
}

interface VariantFormData {
  sku: string;
  nombre: string;
  slug: string;
  precio: number;
  imagenUrl: string;
  images: string[];
  stock: number;
  destacado: boolean;
  nuevo: boolean;
  bloqueoDescuento: boolean;
  activo: boolean;
  atributos: Array<{
    atributoId: number;
    valorAtributoId: number;
    orden: number;
  }>;
}

const VariantManager: React.FC<VariantManagerProps> = ({
  producto,
  atributos,
  onBack,
  onVariantsUpdated
}) => {
  const { showToast } = useApp();
  
  // Estados
  const [variantes, setVariantes] = useState<VarianteAdmin[]>(producto.variantes || []);
  const [showForm, setShowForm] = useState(false);
  const [editingVariante, setEditingVariante] = useState<VarianteAdmin | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  
  // Estado del formulario
  const [formData, setFormData] = useState<VariantFormData>({
    sku: '',
    nombre: '',
    slug: '',
    precio: 0,
    imagenUrl: '',
    images: [],
    stock: 0,
    destacado: false,
    nuevo: false,
    bloqueoDescuento: false,
    activo: true,
    atributos: []
  });

  // ============================================
  // EFECTOS
  // ============================================

  useEffect(() => {
    if (editingVariante) {
      // Cargar datos de la variante a editar
      const atributosData = editingVariante.atributos?.map(attr => ({
        atributoId: attr.valorAtributo?.atributo?.id || 0,
        valorAtributoId: attr.valorAtributoId,
        orden: attr.orden
      })) || [];

      setFormData({
        sku: editingVariante.sku,
        nombre: editingVariante.nombre,
        slug: editingVariante.slug,
        precio: editingVariante.precio,
        imagenUrl: editingVariante.imagenUrl || '',
        images: editingVariante.images || [],
        stock: editingVariante.stock,
        destacado: editingVariante.destacado,
        nuevo: editingVariante.nuevo,
        bloqueoDescuento: editingVariante.bloqueoDescuento,
        activo: editingVariante.activo,
        atributos: atributosData
      });
    } else {
      resetForm();
    }
  }, [editingVariante]);

  // Auto-generar nombre y slug basado en atributos seleccionados
  useEffect(() => {
    if (formData.atributos.length > 0 && !editingVariante) {
      generateVariantName();
    }
  }, [formData.atributos]);

  // ============================================
  // FUNCIONES
  // ============================================

  const resetForm = () => {
    setFormData({
      sku: '',
      nombre: '',
      slug: '',
      precio: 0,
      imagenUrl: '',
      images: [],
      stock: 0,
      destacado: false,
      nuevo: false,
      bloqueoDescuento: false,
      activo: true,
      atributos: []
    });
    setImageUrlInput('');
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
  const generateVariantName = () => {
    const atributosValues = formData.atributos
      .sort((a, b) => a.orden - b.orden)
      .map(attr => {
        const atributo = atributos.find(a => a.id === attr.atributoId);
        const valor = atributo?.valores?.find(v => v.id === attr.valorAtributoId);
        return valor?.valor || '';
      })
      .filter(v => v);

    const nombreGenerado = `${producto.nombre} - ${atributosValues.join(' - ')}`;
    const slugGenerado = generateSlug(nombreGenerado);
    const skuGenerado = generateSKU(producto.nombre, atributosValues);

    setFormData(prev => ({
      ...prev,
      nombre: nombreGenerado,
      slug: slugGenerado,
      sku: prev.sku || skuGenerado
    }));
  };

  const handleCreateNew = () => {
    setEditingVariante(null);
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (variante: VarianteAdmin) => {
    setEditingVariante(variante);
    setShowForm(true);
  };
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price)
  }
  const handleDelete = async (varianteId: number) => {
    if (!confirm('¿Estás seguro de eliminar esta variante?')) {
      return;
    }

    try {
      await deleteVariante(varianteId);
      setVariantes(prev => prev.filter(v => v.id !== varianteId));
      showToast('Variante eliminada exitosamente', 'success');
      onVariantsUpdated();
    } catch (error: any) {
      showToast(error.message || 'Error al eliminar variante', 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAtributoChange = (atributoId: number, valorAtributoId: number) => {
    setFormData(prev => {
      const existingIndex = prev.atributos.findIndex(a => a.atributoId === atributoId);
      
      if (existingIndex >= 0) {
        // Actualizar valor existente
        const newAtributos = [...prev.atributos];
        newAtributos[existingIndex] = {
          ...newAtributos[existingIndex],
          valorAtributoId
        };
        return { ...prev, atributos: newAtributos };
      } else {
        // Agregar nuevo atributo
        const atributo = atributos.find(a => a.id === atributoId);
        return {
          ...prev,
          atributos: [
            ...prev.atributos,
            {
              atributoId,
              valorAtributoId,
              orden: atributo?.orden || 0
            }
          ]
        };
      }
    });
  };

  const removeAtributo = (atributoId: number) => {
    setFormData(prev => ({
      ...prev,
      atributos: prev.atributos.filter(a => a.atributoId !== atributoId)
    }));
  };

  const addImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    const validation = validateVarianteData({
      ...formData,
      productoId: producto.id
    });

    if (!validation.valid) {
      validation.errors.forEach(error => showToast(error, 'error'));
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        productoId: producto.id,
        ...formData,
        atributos: formData.atributos.map(attr => ({
          valorAtributoId: attr.valorAtributoId,
          orden: attr.orden
        }))
      };

      if (editingVariante) {
        const response = await updateVariante(editingVariante.id, dataToSend);
        setVariantes(prev => prev.map(v => 
          v.id === editingVariante.id ? response.variante : v
        ));
        showToast('Variante actualizada exitosamente', 'success');
      } else {
        const response = await createVariante(dataToSend);
        setVariantes(prev => [...prev, response.variante]);
        showToast('Variante creada exitosamente', 'success');
      }

      setShowForm(false);
      setEditingVariante(null);
      resetForm();
      onVariantsUpdated();
    } catch (error: any) {
      showToast(error.message || 'Error al guardar variante', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingVariante(null);
    resetForm();
  };

  // ============================================
  // RENDERIZADO
  // ============================================

  return (
    <div className="variant-manager">
      <div className="admin-panel">
        <div className="manager-header">
          <div>
            <h3>Variantes de: {producto.nombre}</h3>
            <p className="text-muted">SKU base: {producto.slug}</p>
          </div>
          
          {!showForm && (
            <button className="btn-primary" onClick={handleCreateNew}>
              + Nueva Variante
            </button>
          )}
        </div>

        {/* Formulario de Variante */}
        {showForm ? (
          <form onSubmit={handleSubmit} className="variant-form">
            <div className="form-section">
              <h4>{editingVariante ? 'Editar Variante' : 'Nueva Variante'}</h4>

              {/* Selección de Atributos */}
              <div className="form-subsection">
                <h5>Atributos de la Variante</h5>
                <p className="helper-text">
                  Selecciona los valores de atributos que definen esta variante
                </p>

                <div className="attributes-selector">
                  {atributos.map(atributo => {
                    const selectedValue = formData.atributos.find(
                      a => a.atributoId === atributo.id
                    );

                    return (
                      <div key={atributo.id} className="attribute-group">
                        <label>{atributo.nombre}</label>
                        <div className="attribute-values">
                          <select
                            value={selectedValue?.valorAtributoId || ''}
                            onChange={(e) => 
                              handleAtributoChange(atributo.id, Number(e.target.value))
                            }
                          >
                            <option value="">Sin seleccionar</option>
                            {atributo.valores?.map(valor => (
                              <option key={valor.id} value={valor.id}>
                                {valor.valor}
                              </option>
                            ))}
                          </select>
                          
                          {selectedValue && (
                            <button
                              type="button"
                              className="btn-icon btn-danger"
                              onClick={() => removeAtributo(atributo.id)}
                              title="Quitar atributo"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Información Básica */}
              <div className="form-grid">
                <div className="form-group span-2">
                  <label htmlFor="nombre">
                    Nombre <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                  <small>Se genera automáticamente basado en atributos</small>
                </div>

                <div className="form-group">
                  <label htmlFor="sku">
                    SKU <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="slug">
                    Slug <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="precio">
                    Precio <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              {/* Imágenes */}
              <div className="form-subsection">
                <h5>Imágenes</h5>
                
                <div className="form-group">
                  <label htmlFor="imagenUrl">Imagen Principal</label>
                  <input
                    type="url"
                    id="imagenUrl"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="form-group">
                  <label>Imágenes Adicionales</label>
                  <div className="image-list">
                    {formData.images.map((img, index) => (
                      <div key={index} className="image-item">
                        <span>{img}</span>
                        <button
                          type="button"
                          className="btn-icon btn-danger"
                          onClick={() => removeImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="image-add">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="URL de imagen adicional"
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={addImageUrl}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>

              {/* Opciones */}
              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleChange}
                  />
                  <span>Producto Destacado</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="nuevo"
                    checked={formData.nuevo}
                    onChange={handleChange}
                  />
                  <span>Producto Nuevo</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="bloqueoDescuento"
                    checked={formData.bloqueoDescuento}
                    onChange={handleChange}
                  />
                  <span>Bloquear Descuentos</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleChange}
                  />
                  <span>Activo</span>
                </label>
              </div>

              {/* Acciones */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : editingVariante ? 'Actualizar' : 'Crear Variante'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Lista de Variantes */
          <div className="variants-list">
            {variantes.length === 0 ? (
              <div className="empty-state">
                <p>No hay variantes creadas para este producto</p>
                <button className="btn-primary" onClick={handleCreateNew}>
                  Crear Primera Variante
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variantes.map(variante => (
                      <tr key={variante.id}>
                        <td>
                          <code>{variante.sku}</code>
                        </td>
                        <td>
                          <div className="variant-name">
                            <strong>{variante.nombre}</strong>
                            {variante.atributos && variante.atributos.length > 0 && (
                              <div className="variant-attributes">
                                {variante.atributos.map(attr => (
                                  <span key={attr.id} className="attribute-badge">
                                    {attr.valorAtributo?.atributo?.nombre}: {attr.valorAtributo?.valor}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>${formatPrice(variante.precio)}</td>
                        <td>
                          <span className={`badge ${variante.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                            {variante.stock}
                          </span>
                        </td>
                        <td>
                          <div className="status-badges">
                            {variante.activo && <span className="badge badge-success">Activo</span>}
                            {variante.destacado && <span className="badge badge-info">Destacado</span>}
                            {variante.nuevo && <span className="badge badge-warning">Nuevo</span>}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-icon btn-secondary"
                              onClick={() => handleEdit(variante)}
                              title="Editar"
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-icon btn-danger"
                              onClick={() => handleDelete(variante.id)}
                              title="Eliminar"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .variant-manager {
          max-width: 1200px;
        }

        .manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #eee;
        }

        .manager-header h3 {
          margin: 0;
          color: #333;
        }

        .text-muted {
          color: #888;
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .variant-form {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
        }

        .form-section h4 {
          margin: 0 0 1.5rem 0;
          color: #333;
        }

        .form-subsection {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #ddd;
        }

        .form-subsection h5 {
          margin: 0 0 0.5rem 0;
          color: #555;
          font-size: 1.1rem;
        }

        .helper-text {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .attributes-selector {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .attribute-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .attribute-group label {
          font-weight: 500;
          color: #555;
        }

        .attribute-values {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .attribute-values select {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .image-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .image-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .image-item span {
          font-size: 0.9rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .image-add {
          display: flex;
          gap: 0.5rem;
        }

        .image-add input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-checkboxes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
        }

        .variants-list {
          margin-top: 1rem;
        }

        .variant-name {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .variant-attributes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .attribute-badge {
          display: inline-block;
          padding: 0.15rem 0.5rem;
          background: #e3f2fd;
          color: #1976d2;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .badge-success {
          background: #d4edda;
          color: #155724;
        }

        .badge-danger {
          background: #f8d7da;
          color: #721c24;
        }

        .badge-info {
          background: #d1ecf1;
          color: #0c5460;
        }

        .badge-warning {
          background: #fff3cd;
          color: #856404;
        }

        @media (max-width: 768px) {
          .manager-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .form-checkboxes {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default VariantManager;