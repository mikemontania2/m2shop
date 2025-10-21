import React, { useMemo, useState } from 'react';
import productService, { Category, Subcategory } from '../services/productService';

const emptyCategory = (id: string): Category => ({ id, name: '', description: '', image: '', subcategories: [] });

const CategoriesAdmin: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(productService.getCategories());
  const [editing, setEditing] = useState<Category | null>(null);

  const startNew = () => setEditing(emptyCategory('nuevo-' + Date.now()));
  const startEdit = (c: Category) => setEditing(JSON.parse(JSON.stringify(c)) as Category);
  const cancel = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    productService.upsertCategory(editing);
    setCategories(productService.getCategories());
    setEditing(null);
  };

  const remove = (id: string) => {
    if (!confirm('Eliminar categoría?')) return;
    productService.deleteCategory(id);
    setCategories(productService.getCategories());
  };

  const addSub = () => {
    if (!editing) return;
    const newSub: Subcategory = { id: 'sub-' + Date.now(), name: '', description: '' };
    setEditing({ ...editing, subcategories: [...editing.subcategories, newSub] });
  };

  const removeSub = (sid: string) => {
    if (!editing) return;
    setEditing({ ...editing, subcategories: editing.subcategories.filter(s => s.id !== sid) });
  };

  return (
    <div>
      <h2>Categorías</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn-primary" onClick={startNew}>Nueva Categoría</button>
      </div>

      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <div className="form-grid">
            <label>ID<input value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value })} /></label>
            <label>Nombre<input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></label>
            <label>Descripción<textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></label>
            <label>Imagen<input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} /></label>
          </div>
          <div style={{ marginTop: 12 }}>
            <h3>Subcategorías</h3>
            <button className="btn-secondary" onClick={addSub}>Agregar Subcategoría</button>
            <div style={{ marginTop: 12 }}>
              {editing.subcategories.map(s => (
                <div key={s.id} className="form-grid" style={{ marginBottom: 8 }}>
                  <label>ID<input value={s.id} onChange={e => setEditing({ ...editing, subcategories: editing.subcategories.map(x => x.id===s.id? { ...s, id: e.target.value } : x) })} /></label>
                  <label>Nombre<input value={s.name} onChange={e => setEditing({ ...editing, subcategories: editing.subcategories.map(x => x.id===s.id? { ...s, name: e.target.value } : x) })} /></label>
                  <label>Descripción<input value={s.description} onChange={e => setEditing({ ...editing, subcategories: editing.subcategories.map(x => x.id===s.id? { ...s, description: e.target.value } : x) })} /></label>
                  <div style={{ display: 'flex', alignItems: 'end' }}>
                    <button className="btn-secondary" onClick={() => removeSub(s.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className="btn-primary" onClick={save}>Guardar</button>
            <button className="btn-secondary" onClick={cancel}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Subcategorías</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.subcategories.length}</td>
                <td>
                  <button className="btn-secondary" onClick={() => startEdit(c)}>Editar</button>{' '}
                  <button className="btn-secondary" onClick={() => remove(c.id)}>Eliminar</button>
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
