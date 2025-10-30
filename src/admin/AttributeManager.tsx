import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext'; 
import { AtributoAdmin, createAtributo, createValorAtributo } from '../services/admin/ProductoServices.admin';
 import "../styles/AdminProduct.css"

interface AttributeManagerProps {
  atributos: AtributoAdmin[];
  onBack: () => void;
  onAttributesUpdated: () => void;
}

type ViewMode = 'list' | 'create-attribute' | 'add-value';

const AttributeManager: React.FC<AttributeManagerProps> = ({
  atributos,
  onBack,
  onAttributesUpdated
}) => {
  const { showToast } = useApp();
  
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedAtributo, setSelectedAtributo] = useState<AtributoAdmin | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Formulario de atributo
  const [atributoForm, setAtributoForm] = useState({
    nombre: '',
    orden: 0,
    activo: true
  });

  // Formulario de valor de atributo
  const [valorForm, setValorForm] = useState({
    valor: '',
    propiedades: {} as Record<string, any>,
    activo: true
  });

  // Estado para propiedades adicionales (ej: color)
  const [colorValue, setColorValue] = useState('');

  // ============================================
  // MANEJADORES DE ATRIBUTOS
  // ============================================

  const handleCreateAttribute = () => {
    setAtributoForm({
      nombre: '',
      orden: atributos.length,
      activo: true
    });
    setViewMode('create-attribute');
  };

  const handleAtributoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setAtributoForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setAtributoForm(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setAtributoForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitAtributo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!atributoForm.nombre.trim()) {
      showToast('El nombre del atributo es obligatorio', 'error');
      return;
    }

    setLoading(true);

    try {
      await createAtributo(atributoForm);
      showToast('Atributo creado exitosamente', 'success');
      setViewMode('list');
      onAttributesUpdated();
    } catch (error: any) {
      showToast(error.message || 'Error al crear atributo', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // MANEJADORES DE VALORES
  // ============================================

  const handleAddValue = (atributo: AtributoAdmin) => {
    setSelectedAtributo(atributo);
    setValorForm({
      valor: '',
      propiedades: {},
      activo: true
    });
    setColorValue('');
    setViewMode('add-value');
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setValorForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setValorForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setColorValue(color);
    
    // Actualizar propiedades con el color
    setValorForm(prev => ({
      ...prev,
      propiedades: {
        ...prev.propiedades,
        color
      }
    }));
  };

  const handleSubmitValor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAtributo) {
      showToast('No hay atributo seleccionado', 'error');
      return;
    }

    if (!valorForm.valor.trim()) {
      showToast('El valor es obligatorio', 'error');
      return;
    }

    setLoading(true);

    try {
      await createValorAtributo({
        atributoId: selectedAtributo.id,
        valor: valorForm.valor,
        propiedades: Object.keys(valorForm.propiedades).length > 0 
          ? valorForm.propiedades 
          : undefined,
        activo: valorForm.activo
      });
      
      showToast('Valor agregado exitosamente', 'success');
      setViewMode('list');
      onAttributesUpdated();
    } catch (error: any) {
      showToast(error.message || 'Error al agregar valor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedAtributo(null);
  };

  // ============================================
  // RENDERIZADO
  // ============================================

  return (
    <div className="attribute-manager">
      <div className="admin-panel">
        <div className="manager-header">
          <h3>Gestión de Atributos</h3>
          
          {viewMode === 'list' && (
            <button className="btn-primary" onClick={handleCreateAttribute}>
              + Nuevo Atributo
            </button>
          )}
          
          {viewMode !== 'list' && (
            <button className="btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>

        {/* VISTA: Lista de Atributos */}
        {viewMode === 'list' && (
          <div className="attributes-list">
            {atributos.length === 0 ? (
              <div className="empty-state">
                <p>No hay atributos configurados</p>
                <p className="helper-text">
                  Los atributos te permiten crear variantes de productos (ej: Color, Tamaño, Presentación)
                </p>
                <button className="btn-primary" onClick={handleCreateAttribute}>
                  Crear Primer Atributo
                </button>
              </div>
            ) : (
              <div className="attributes-grid">
                {atributos.map(atributo => (
                  <div key={atributo.id} className="attribute-card">
                    <div className="attribute-header">
                      <div>
                        <h4>{atributo.nombre}</h4>
                        <span className="attribute-meta">
                          Orden: {atributo.orden} | {atributo.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <button
                        className="btn-primary btn-sm"
                        onClick={() => handleAddValue(atributo)}
                      >
                        + Valor
                      </button>
                    </div>

                    <div className="attribute-values">
                      {atributo.valores && atributo.valores.length > 0 ? (
                        <div className="values-list">
                          {atributo.valores.map(valor => (
                            <div key={valor.id} className="value-chip">
                              {valor.propiedades?.color && (
                                <span
                                  className="color-indicator"
                                  style={{ backgroundColor: valor.propiedades.color }}
                                />
                              )}
                              <span>{valor.valor}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-values">Sin valores configurados</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VISTA: Crear Atributo */}
        {viewMode === 'create-attribute' && (
          <form onSubmit={handleSubmitAtributo} className="attribute-form">
            <h4>Nuevo Atributo</h4>
            
            <div className="form-group">
              <label htmlFor="nombre">
                Nombre del Atributo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={atributoForm.nombre}
                onChange={handleAtributoChange}
                placeholder="Ej: Color, Tamaño, Presentación"
                required
              />
              <small>
                Este nombre aparecerá como etiqueta para seleccionar valores
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="orden">Orden de Concatenación</label>
              <input
                type="number"
                id="orden"
                name="orden"
                value={atributoForm.orden}
                onChange={handleAtributoChange}
                min="0"
              />
              <small>
                Define el orden en que los atributos se concatenarán en el nombre de la variante
              </small>
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={atributoForm.activo}
                onChange={handleAtributoChange}
              />
              <label htmlFor="activo">Atributo activo</label>
            </div>

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
                {loading ? 'Creando...' : 'Crear Atributo'}
              </button>
            </div>
          </form>
        )}

        {/* VISTA: Agregar Valor */}
        {viewMode === 'add-value' && selectedAtributo && (
          <form onSubmit={handleSubmitValor} className="attribute-form">
            <h4>Agregar Valor a: {selectedAtributo.nombre}</h4>
            
            <div className="form-group">
              <label htmlFor="valor">
                Valor <span className="required">*</span>
              </label>
              <input
                type="text"
                id="valor"
                name="valor"
                value={valorForm.valor}
                onChange={handleValorChange}
                placeholder="Ej: Rojo, XL, 500ml"
                required
              />
            </div>

            {/* Propiedades Adicionales */}
            <div className="form-section">
              <h5>Propiedades Adicionales (Opcional)</h5>
              
              <div className="form-group">
                <label htmlFor="color">Color (para visualización)</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    id="color"
                    value={colorValue}
                    onChange={handleColorChange}
                  />
                  <input
                    type="text"
                    value={colorValue}
                    onChange={(e) => {
                      setColorValue(e.target.value);
                      handleColorChange(e as any);
                    }}
                    placeholder="#000000"
                  />
                  {colorValue && (
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => {
                        setColorValue('');
                        setValorForm(prev => ({
                          ...prev,
                          propiedades: {}
                        }));
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <small>
                  Si es un atributo de color, puedes seleccionar el color para mostrarlo visualmente
                </small>
              </div>
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                id="valor-activo"
                name="activo"
                checked={valorForm.activo}
                onChange={handleValorChange}
              />
              <label htmlFor="valor-activo">Valor activo</label>
            </div>

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
                {loading ? 'Agregando...' : 'Agregar Valor'}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .attribute-manager {
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

        .attributes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .attribute-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          transition: box-shadow 0.2s;
        }

        .attribute-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .attribute-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .attribute-header h4 {
          margin: 0;
          color: #333;
          font-size: 1.2rem;
        }

        .attribute-meta {
          display: block;
          color: #666;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }

        .attribute-values {
          min-height: 60px;
        }

        .values-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .value-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f0f0f0;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #333;
        }

        .color-indicator {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #ddd;
        }

        .no-values {
          color: #999;
          font-style: italic;
          font-size: 0.9rem;
          margin: 0;
        }

        .attribute-form {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
          max-width: 600px;
        }

        .attribute-form h4 {
          margin: 0 0 1.5rem 0;
          color: #333;
        }

        .attribute-form h5 {
          margin: 1.5rem 0 1rem 0;
          color: #555;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #555;
        }

        .required {
          color: #dc3545;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .form-group small {
          display: block;
          margin-top: 0.5rem;
          color: #666;
          font-size: 0.85rem;
        }

        .color-input-group {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .color-input-group input[type="color"] {
          width: 60px;
          height: 40px;
          padding: 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .color-input-group input[type="text"] {
          flex: 1;
        }

        .form-group-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1.5rem 0;
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
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #ddd;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        .empty-state p {
          margin-bottom: 1rem;
        }

        .helper-text {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .attributes-grid {
            grid-template-columns: 1fr;
          }

          .attribute-header {
            flex-direction: column;
            gap: 1rem;
          }

          .manager-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AttributeManager;