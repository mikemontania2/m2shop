import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import orderService from '../services/orderService';
import "../styles/checkout.css"

const CheckoutPage: React.FC = () => {
  const { user, cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [error, setError] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  };

  const shippingCost = cartTotal >= 500000 ? 0 : 50000;
  const total = cartTotal + shippingCost;

  const handleRecalculateCart = () => {
    console.log('Recalculando carrito...');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Debes iniciar sesión para realizar una compra');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    if (!shippingAddress.trim()) {
      setError('Debes ingresar una dirección de envío');
      return;
    }

    const order = orderService.createOrder(user, cart, shippingAddress, paymentMethod);
    clearCart();
    navigate(`/orden/${order.id}`);
  };

  if (!user) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-error">
            <h2>Debes iniciar sesión</h2>
            <p>Para realizar una compra, primero debes iniciar sesión en tu cuenta.</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-error">
            <h2>Tu carrito está vacío</h2>
            <button className="btn-primary" onClick={() => navigate('/') }>
              Ir a Comprar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finalizar Compra</h1>

        <div className="checkout-content">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Información de Envío</h2>

                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" value={user.name} disabled />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user.email} disabled />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" value={user.phone} disabled />
                </div>

                <div className="form-group">
                  <label>Dirección de Envío *</label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Calle, número, ciudad, referencias..."
                    required
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Método de Pago</h2>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="efectivo"
                      checked={paymentMethod === 'efectivo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Efectivo contra entrega</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="transferencia"
                      checked={paymentMethod === 'transferencia'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Transferencia bancaria</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="tarjeta"
                      checked={paymentMethod === 'tarjeta'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Tarjeta de crédito/débito</span>
                  </label>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="btn-primary btn-block">
                Confirmar Pedido
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Resumen del Pedido</h2>

            <div className="order-items">
              {cart.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="order-item-info">
                    <h4>{item.product.name}</h4>
                    <p>Talle: {item.size} | Color: {item.color}</p>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                className="btn-recalculate"
                onClick={handleRecalculateCart}
              >
                Recalcular Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
