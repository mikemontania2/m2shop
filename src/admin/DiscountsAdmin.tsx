import React, { useMemo, useState } from 'react';
import discountService, { Discount } from '../services/discountService';

const emptyDiscount = (id: string): Discount => ({ id, name: '', percentage: 10, active: true, productIds: [] });

const DiscountsAdmin: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>(discountService.getDiscounts());
  const [editing, setEditing] = useState<Discount | null>(null);

  const nextId = useMemo(() => 'desc-' + Date.now(), []);

  const startNew = () => setEditing(emptyDiscount(nextId));
  const startEdit = (d: Discount) => setEditing({ ...d });
  const cancel = () => setEditing(null);

  const save = () => {
    if (!editing) return;
    discountService.upsertDiscount(editing);
    setDiscounts(discountService.getDiscounts());
    setEditing(null);
  };

  const remove = (id: string) => {
    if (!confirm('Eliminar descuento?')) return;
    discountService.deleteDiscount(id);
    setDiscounts(discountService.getDiscounts());
  };

  return (
    <div>
      <h2>Descuentos</h2>
      <div style={{ marginBottom: 16 }}>
        <button className="btn-primary" onClick={startNew}>Nuevo Descuento</button>
      </div>

      {editing && (
        <div className="admin-panel" style={{ marginBottom: 24 }}>
          <div className="form-grid">
            <label>Nombre<input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></label>
            <label>Porcentaje<input type="number" value={editing.percentage} onChange={e => setEditing({ ...editing, percentage: Math.max(0, Math.min(100, parseInt(e.target.value)||0)) })} /></label>
            <label>Activo<select value={editing.active? '1':'0'} onChange={e => setEditing({ ...editing, active: e.target.value==='1' })}><option value="1">Sí</option><option value="0">No</option></select></label>
            <label>Productos (IDs, separados por coma)<input value={(editing.productIds||[]).join(',')} onChange={e => setEditing({ ...editing, productIds: e.target.value.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)) })} /></label>
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
              <th>ID</th><th>Nombre</th><th>%</th><th>Activo</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.percentage}</td>
                <td>{d.active? 'Sí':'No'}</td>
                <td>
                  <button className="btn-secondary" onClick={() => startEdit(d)}>Editar</button>{' '}
                  <button className="btn-secondary" onClick={() => remove(d.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountsAdmin;
