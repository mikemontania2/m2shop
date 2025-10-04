import { useEffect, useState } from 'react';
import { Api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

interface OrderDto { id: number; total: number; status: string; created_at: string }

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/orders/my/${user.id}`).then(res => res.json()).then(setOrders);
  }, [user]);

  const repeatOrder = async (id: number) => {
    await fetch(`/api/orders/${id}/repeat`, { method: 'POST' });
    alert('Pedido repetido. Puedes verlo en Mis pedidos.');
  };

  if (!user) return <div className="page-content">Debes iniciar sesión para ver tus pedidos.</div>;

  return (
    <div className="page-content">
      <h1>Mis pedidos</h1>
      {orders.length === 0 ? (
        <p>No tienes pedidos.</p>
      ) : (
        <div className="cart-items">
          {orders.map(o => (
            <div key={o.id} className="cart-item">
              <div>Pedido #{o.id}</div>
              <div>Fecha: {new Date(o.created_at).toLocaleString()}</div>
              <div>Total: {new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', minimumFractionDigits: 0 }).format(o.total)}</div>
              <div>Estado: {o.status}</div>
              <button className="btn btn-primary" onClick={() => repeatOrder(o.id)}>Repetir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
