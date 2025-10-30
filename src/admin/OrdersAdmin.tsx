import React, { useState, useEffect } from 'react'
import pedidosServices from '../services/pedidos.services'

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]) // Estado inicial vacío
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await pedidosServices.obtenerTodosPedidos()
        console.log('*******************',data);
        setOrders(data.pedidos)
      } catch (error) {
        console.error('Error al cargar los pedidos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price)
  }
  if (loading) {
    return <p>Cargando pedidos...</p>
  }

  return (
    <div>
      <h2>Pedidos</h2>
      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th> 
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.Usuario?.nombre || 'Sin cliente'}</td>
                <td>{new Date(o.date).toLocaleString()}</td> 
                <td>{formatPrice(+o.total)}</td>
                <td>{o.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersAdmin
