import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useApp();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Carrito de Compras</h1>
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <button className="btn-primary" onClick={() => navigate('/') }>
              Ir a Comprar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrito de Compras</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p>Talle: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p className="cart-item-price">{formatPrice(item.product.price)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="cart-item-total">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumen del Pedido</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{cartTotal >= 500000 ? 'Gratis' : formatPrice(50000)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(cartTotal >= 500000 ? cartTotal : cartTotal + 50000)}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              Proceder al Pago
            </button>
            <button className="btn-secondary" onClick={() => navigate('/') }>
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
