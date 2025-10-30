import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Phone } from 'lucide-react';
import pedidosServices, { Pedido } from '../services/pedidos.services';
import { useApp } from '../contexts/AppContext';

const OrderConfirmationPage: React.FC = () => {
  const [order, setOrder] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

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
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando información del pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">⚠️ Error</h4>
          <p>{error || 'Pedido no encontrado'}</p>
        </div>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  // Determinar si es un pedido de invitado o usuario registrado
  const isGuestOrder = !order.usuarioId || order.estadoPago === 'pendiente';

  return (
    <div className="order-confirmation-page">
      <div className="container py-4">
        {/* Header de Confirmación */}
        <div className="confirmation-header text-center mb-5">
          <CheckCircle size={80} className="text-success mb-3" style={{ strokeWidth: 2 }} />
          <h1 className="display-5 fw-bold mb-3">¡Pedido Recibido!</h1>
          <p className="lead text-muted">
            Tu pedido ha sido registrado exitosamente
          </p>
          <div className="order-number-badge bg-light p-3 rounded d-inline-block mt-2">
            <small className="text-muted d-block">Número de pedido</small>
            <h3 className="mb-0 fw-bold text-primary">
              {order.numeroPedido || `#${order.id}`}
            </h3>
          </div>
        </div>

        {/* Mensaje especial para invitados */}
        {isGuestOrder && (
          <div className="alert alert-info mb-4 d-flex align-items-start">
            <Phone size={24} className="me-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="alert-heading mb-2">📞 Nos comunicaremos contigo pronto</h5>
              <p className="mb-0">
                Hemos recibido tu pedido y nos pondremos en contacto dentro de las próximas 24 horas 
                para confirmar los detalles y coordinar el pago y la entrega.
              </p>
            </div>
          </div>
        )}

        {/* Timeline de Estado */}
        <div className="order-timeline mb-5 bg-light p-4 rounded">
          <h5 className="mb-3 fw-bold">Estado del Pedido</h5>
          <div className="d-flex align-items-center">
            <div className="timeline-step active">
              <div className="step-icon">
                <CheckCircle size={24} />
              </div>
              <div className="step-label">Recibido</div>
            </div>
            <div className="timeline-line"></div>
            <div className={`timeline-step ${order.estado !== 'pendiente' ? 'active' : ''}`}>
              <div className="step-icon">
                <Package size={24} />
              </div>
              <div className="step-label">Confirmado</div>
            </div>
            <div className="timeline-line"></div>
            <div className={`timeline-step ${order.estado === 'enviado' || order.estado === 'entregado' ? 'active' : ''}`}>
              <div className="step-icon">
                <Truck size={24} />
              </div>
              <div className="step-label">En camino</div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Información del Pedido */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header bg-white">
                <h4 className="mb-0">Información del Pedido</h4>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted">Fecha de pedido</small>
                    <p className="mb-0 fw-semibold">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Estado actual</small>
                    <p className="mb-0">
                      <span 
                        className="badge" 
                        style={{ backgroundColor: pedidosServices.getEstadoColor(order.estado) }}
                      >
                        {pedidosServices.getEstadoLabel(order.estado)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted">Método de pago</small>
                    <p className="mb-0 fw-semibold">
                      {pedidosServices.getMetodoPagoLabel(order.metodoPago)}
                    </p>
                  </div>
                  {order.fechaEstimadaEntrega && (
                    <div className="col-6">
                      <small className="text-muted">Entrega estimada</small>
                      <p className="mb-0 fw-semibold">
                        {formatDate(order.fechaEstimadaEntrega)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Datos de Envío */}
            <div className="card mb-4">
              <div className="card-header bg-white">
                <h4 className="mb-0">Datos de Envío</h4>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Nombre:</strong> {order.Usuario?.nombre}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {order.Usuario?.email}
                </p>
                <p className="mb-2">
                  <strong>Teléfono:</strong> {order.Usuario?.telefono || '—'}
                </p>
                <p className="mb-0">
                  <strong>Dirección:</strong> {
                    order.DireccionEnvio?.calle || 
                    order.DireccionEnvio?.barrio || 
                    '—'
                  }
                </p>
                {order.notasCliente && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Notas del cliente:</small>
                    <p className="mb-0">{order.notasCliente}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Productos */}
            <div className="card">
              <div className="card-header bg-white">
                <h4 className="mb-0">Productos del Pedido</h4>
              </div>
              <div className="card-body">
                {order.ItemPedidos?.map((item) => (
                  <div 
                    key={item.id} 
                    className="d-flex align-items-center border-bottom pb-3 mb-3"
                  >
                    <img
                      src={item.imagenUrl}
                      alt={item.nombreProducto}
                      width={80}
                      height={80}
                      className="rounded me-3"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.nombreProducto}</h6>
                      <p className="text-muted mb-0 small">
                        Cantidad: {item.cantidad} × {formatPrice(item.precioUnitario)}
                      </p>
                      {item.descuento > 0 && (
                        <p className="text-success mb-0 small">
                          Descuento: -{formatPrice(item.importeDescuento)}
                        </p>
                      )}
                    </div>
                    <div className="text-end fw-bold">
                      {formatPrice(item.total)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Resumen</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                
                {order.importeDescuento > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Descuento:</span>
                    <span>-{formatPrice(order.importeDescuento)}</span>
                  </div>
                )}
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span>
                    {order.costoEnvio === 0 
                      ? <span className="text-success fw-bold">🎉 Gratis</span>
                      : formatPrice(order.costoEnvio)
                    }
                  </span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-0">
                  <span className="fw-bold fs-5">Total:</span>
                  <span className="fw-bold fs-5 text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
              
              <div className="card-footer bg-light text-center">
                <small className="text-muted">🔒 Compra segura</small>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-4 d-grid gap-2">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/')}
              >
                Seguir Comprando
              </button>
              
              {isAuthenticated && (
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/profile')}
                >
                  Ver Mis Pedidos
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional para invitados */}
        {isGuestOrder && (
          <div className="alert alert-light border mt-4">
            <h5 className="mb-3">💡 ¿Quieres hacer seguimiento de tu pedido?</h5>
            <p className="mb-2">
              Crea una cuenta para poder ver el estado de tus pedidos en cualquier momento.
            </p>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate('/register')}
            >
              Crear Cuenta Ahora
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;