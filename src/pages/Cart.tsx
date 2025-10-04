import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, cartDiscount, cartTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra</p>
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrito de Compras</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.product.image_url} alt={item.product.name} onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.cavallaro.com.py/productos/300000918.jpg'; }} />

                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-price">
                    {(item.product.discount_percent ?? 0) > 0 ? (
                      <>
                        <span className="price-old">{formatPrice(item.product.price)}</span>
                        <span className="price-new">
                          {formatPrice(Math.round(item.product.price * (1 - (item.product.discount_percent as number) / 100)))}
                        </span>
                        <small className="discount-tag">
                          Oferta {item.product.discount_percent}%
                        </small>
                      </>
                    ) : (
                      <span>{formatPrice(item.product.price)}</span>
                    )}
                  </p>
                </div>

                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  {formatPrice(((item.product.discount_percent ?? 0) > 0
                    ? Math.round(item.product.price * (1 - (item.product.discount_percent as number) / 100))
                    : item.product.price) * item.quantity)}
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="cart-item-remove"
                  aria-label="Eliminar"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

            <div className="cart-summary">
            <h3>Resumen del Pedido</h3>
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
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-large"
            >
              Proceder al Pago
            </button>
            <Link to="/productos" className="btn btn-secondary btn-large">
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
