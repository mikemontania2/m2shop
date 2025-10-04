import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Api } from '../lib/api';

export default function Checkout() {
  const { cart, cartSubtotal, cartDiscount, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await Api.createOrder({
        customer_id: user?.id,
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        shipping_address: formData.shippingAddress,
        items: cart.map((item) => ({ product_id: Number(item.productId), quantity: item.quantity })),
      });

      clearCart();
      navigate('/pedido-confirmado', { state: { orderId: order.id } });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finalizar Compra</h1>

        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Información de Contacto</h2>

              <div className="form-group">
                <label htmlFor="customerName">Nombre Completo *</label>
                <input
                  type="text"
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email *</label>
                <input
                  type="email"
                  id="customerEmail"
                  required
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone">Teléfono *</label>
                <input
                  type="tel"
                  id="customerPhone"
                  required
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, customerPhone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Dirección de Envío</h2>

              <div className="form-group">
                <label htmlFor="shippingAddress">Dirección Completa *</label>
                <textarea
                  id="shippingAddress"
                  required
                  rows={4}
                  value={formData.shippingAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, shippingAddress: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Resumen del Pedido</h2>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.productId} className="summary-item">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>
                    {formatPrice(((item.product.discount_percent ?? 0) > 0
                      ? Math.round(item.product.price * (1 - (item.product.discount_percent as number) / 100))
                      : item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal productos:</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="summary-row">
                <span>Descuentos:</span>
                <span>-{formatPrice(cartDiscount)}</span>
              </div>
            )}

            <div className="summary-total">
              <span>Total:</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
