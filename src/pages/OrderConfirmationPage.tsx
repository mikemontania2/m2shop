import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import pedidosServices, { Pedido } from '../services/pedidos.services';

const OrderConfirmationPage: React.FC = () => {
  const [order, setOrder] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const id = params.id ? Number(params.id) : 0;

        if (!id) {
          setError('ID de pedido inválido');
          setLoading(false);
          return;
        }

        const orderData = await pedidosServices.obtenerPedido(id);
        setOrder(orderData || null);
      } catch (err: any) {
        console.error('Error cargando pedido:', err);
        setError(err.message || 'No se pudo cargar el pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('es-PY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="container text-center py-5">
        <p>Cargando pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container text-center py-5">
        <p className="text-danger">{error || 'Pedido no encontrado'}</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="container py-4">
        <div className="confirmation-header text-center mb-4">
          <CheckCircle size={60} className="text-success mb-3" />
          <h1>¡Pedido Realizado con Éxito!</h1>
          <p>
            Tu número de pedido es: <strong>{order.numeroPedido || order.id}</strong>
          </p>
        </div>

        <div className="order-details">
          {/* Información del Pedido */}
          <div className="order-section mb-4">
            <h2>Información del Pedido</h2>
            <p><strong>Fecha:</strong> {formatDate(order.createdAt)}</p>
            <p><strong>Estado:</strong> {pedidosServices.getEstadoLabel(order.estado)}</p>
            <p><strong>Método de pago:</strong> {pedidosServices.getMetodoPagoLabel(order.metodoPago)}</p>
          </div>

          {/* Datos de Envío */}
          <div className="order-section mb-4">
            <h2>Datos de Envío</h2>
            <p><strong>Nombre:</strong> {order.Usuario?.nombre}</p>
            <p><strong>Email:</strong> {order.Usuario?.email}</p>
            <p><strong>Teléfono:</strong> {order.Usuario?.telefono || '—'}</p>
            <p><strong>Dirección:</strong> {order.DireccionEnvio?.calle || order.DireccionEnvio?.barrio || '—'}</p>
          </div>

          {/* Productos */}
          <div className="order-section mb-4">
            <h2>Productos</h2>
            <div className="order-items-list">
              {order.ItemPedidos?.map((item) => (
                <div key={item.id} className="order-item-row d-flex align-items-center mb-3 border-bottom pb-2">
                  <img
                    src={item.imagenUrl}
                    alt={item.nombreProducto}
                    width={70}
                    height={70}
                    className="me-3 rounded"
                  />
                  <div className="item-info flex-grow-1">
                    <h5 className="mb-1">{item.nombreProducto}</h5>
                    <p className="mb-0 text-muted">Cantidad: {item.cantidad}</p>
                  </div>
                  <div className="item-price text-end fw-bold">
                    {formatPrice(item.total)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="order-total-section text-end border-top pt-3 mb-4">
            <h2>Total del Pedido</h2>
            <div className="total-amount fs-4 fw-bold">{formatPrice(order.total)}</div>
            {order.importeDescuento > 0 && (
              <div className="text-success">
                Descuento aplicado: {formatPrice(order.importeDescuento)}
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="order-actions text-center">
            <button className="btn btn-primary px-4" onClick={() => navigate('/')}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
