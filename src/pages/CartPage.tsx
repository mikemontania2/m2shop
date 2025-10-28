import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { Trash2, Plus, Minus } from 'lucide-react'

const CartPage: React.FC = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, cartLoading } =
    useApp()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Cart actualizado:', cart)
    console.log('Cart total:', cartTotal)
  }, [cart, cartTotal])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  // Mostrar loading mientras carga
  if (cartLoading) {
    return (
      <div className='cart-page'>
        <div className='container'>
          <h1>Carrito de Compras</h1>
          <div className='empty-cart'>
            <p>Cargando carrito...</p>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className='cart-page'>
        <div className='container'>
          <h1>Carrito de Compras</h1>
          <div className='empty-cart'>
            <p>Tu carrito está vacío</p>
            <button className='btn-primary' onClick={() => navigate('/')}>
              Ir a Comprar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='cart-page'>
      <div className='container'>
        <h1>Carrito de Compras</h1>

        <div className='cart-content'>
          <div className='cart-items'>
            {cart.map(item => (
              <div key={item.itemCarritoId} className='cart-item'>
                <img src={item.imagen} alt={item.nombre} />

                <div className='cart-item-details'>
                  <h3>{item.nombre}</h3>
                  <p className='text-sm text-gray-500'>
                    Variante ID: {item.varianteId}
                  </p>

                  {/* 🏷️ Mostrar precios con descuento */}
                  <div className='cart-item-prices'>
                    <span className='cart-item-price-current'>
                      {formatPrice(item.precio)}
                    </span>
                    {item.precioOriginal &&
                      item.precioOriginal > item.precio && (
                        <span className='cart-item-price-original'>
                          {formatPrice(item.precioOriginal)}
                        </span>
                      )}
                  </div>
                </div>

                <div className='cart-item-actions'>
                  <div className='quantity-controls'>
                    <button
                      onClick={() =>
                        updateQuantity(item.itemCarritoId, item.cantidad - 1)
                      }
                      disabled={item.cantidad <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.itemCarritoId, item.cantidad + 1)
                      }
                      disabled={item.cantidad >= item.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className='btn-remove'
                    onClick={() => removeFromCart(item.itemCarritoId)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className='cart-item-total'>
                  {formatPrice(item.subtotal)}
                </div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2>Resumen del Pedido</h2>
            <div className='summary-row'>
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className='summary-row'>
              <span>Envío</span>
              <span>{cartTotal >= 500000 ? 'Gratis' : formatPrice(50000)}</span>
            </div>
            <div className='summary-row total'>
              <span>Total</span>
              <span>
                {formatPrice(
                  cartTotal >= 500000 ? cartTotal : cartTotal + 50000
                )}
              </span>
            </div>
            <button className='btn-checkout' onClick={handleCheckout}>
              Proceder al Pago
            </button>
            <button className='btn-secondary' onClick={() => navigate('/')}>
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
