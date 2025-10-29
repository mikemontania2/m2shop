import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { Trash2, Plus, Minus } from 'lucide-react'

const CartPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartSubTotal,
    cartImporteDescuento,
    removeFromCart,
    updateQuantity,
    cartLoading
  } = useApp()
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
        <h2>Tu Carrito</h2>

        <div className='cart-content'>
          <div className='cart-items'>
            {cart.map(item => (
              <div key={item.itemCarritoId} className='cart-item'>
                {/* Imagen del producto */}
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className='cart-item-image'
                />

                {/* Detalles del producto */}
                <div className='cart-item-details'>
                  <h5>{item.nombre}</h5>
                  <p className='text-sm text-gray-500'>
                    Variante ID: {item.varianteId}
                  </p>

                  {/* 🏷️ Precios */}
                  <div className='cart-item-prices'>
                    <span className='cart-item-price-current'>
                      {formatPrice(item.precio)}
                    </span>
                  </div>

                  {/* 💸 Descripción del descuento */}
                  {item.descripcion && (
                    <p className='cart-item-discount'>
                      <i className='bi bi-tag-fill text-success me-1'></i>
                      {item.descripcion}
                    </p>
                  )}
                </div>

                {/* Controles de cantidad y eliminación */}
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

                {/* Total por línea */}
                <div className='cart-item-total-container'>
                  {item.subtotal > item.total ? (
                    <>
                     
                      {/* Total con descuento abajo */}
                      <span className='cart-item-total'>
                        {formatPrice(item.total)}
                      </span>
                       {/* Subtotal tachado arriba */}
                      <span className='cart-item-sub-total'>
                        {formatPrice(item.subtotal)}
                      </span>
                    </>
                  ) : (
                    // Si no hay descuento, solo se muestra el total normal
                    <span className='cart-item-total'>
                      {formatPrice(item.total)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2>Resumen del Pedido</h2>
            <div className='summary-row'>
              <span>Subtotal</span>
              <span>{formatPrice(cartSubTotal)}</span>
            </div>
            {/* <div className='summary-row'>
              <span>Envío</span>
              <span>{cartTotal >= 500000 ? 'Gratis' : formatPrice(50000)}</span>
            </div> */}
          
  {cartImporteDescuento && cartImporteDescuento>0 ? (
                      <div className='summary-row'>
              <span>Total descuento:</span>
              <span>- {  formatPrice(cartImporteDescuento)}</span>
            </div>
                      
                  ) : <></>
                  }


            <div className='summary-row total'>
              <span>Total</span>
              <span>
                {formatPrice(
                  cartTotal
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
