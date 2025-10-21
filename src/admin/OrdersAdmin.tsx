import React, { useState } from 'react';
import orderService from '../services/orderService';

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState(orderService.getOrders());

  return (
    <div>
      <h2>Pedidos</h2>
      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Cliente</th><th>Fecha</th><th>Items</th><th>Total</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user.name}</td>
                <td>{new Date(o.date).toLocaleString()}</td>
                <td>{o.items.length}</td>
                <td>{o.total}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdmin;
