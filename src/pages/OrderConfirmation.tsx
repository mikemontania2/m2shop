import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="container">
      <div className="order-confirmation">
        <div className="confirmation-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h1>Pedido Confirmado</h1>
        <p className="confirmation-message">
          ¡Gracias por tu compra! Tu pedido ha sido recibido y está siendo procesado.
        </p>

        {orderId && (
          <p className="order-id">
            Número de pedido: <strong>{orderId}</strong>
          </p>
        )}

        <p className="confirmation-details">
          Recibirás un email de confirmación con los detalles de tu pedido.
          Te contactaremos pronto para coordinar la entrega.
        </p>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            Volver al Inicio
          </Link>
          <Link to="/productos" className="btn btn-secondary">
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
