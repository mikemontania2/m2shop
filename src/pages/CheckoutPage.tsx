import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { User, Mail, Phone, MapPin, Lock, Loader, ShoppingBag } from 'lucide-react';
import "../styles/checkout.css";

// Tipos para el formulario de invitado
interface GuestData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  notas: string;
  crearCuenta: boolean;
  password: string;
}

const CheckoutPage: React.FC = () => {
  const { user, isAuthenticated, cart, cartTotal,cartSubTotal,cartImporteDescuento, clearCart, login, showToast } = useApp();
  const navigate = useNavigate();

  // Estados del modo de checkout
  const [checkoutMode, setCheckoutMode] = useState<'guest' | 'login'>('guest');
  const [loading, setLoading] = useState(false);

  // Estados para invitado
  const [guestData, setGuestData] = useState<GuestData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    notas: '',
    crearCuenta: false,
    password: ''
  });

  // Estados para login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados para usuario autenticado
  const [shippingAddress, setShippingAddress] = useState(user?.direccion || '');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia' | 'tarjeta' | 'contacto'>('contacto');

  // Verificar carrito vacío
  useEffect(() => {
    if (cart.length === 0) {
      showToast('Tu carrito está vacío', 'info');
      navigate('/');
    }
  }, [cart, navigate, showToast]);

  // Actualizar dirección si el usuario cambia
  useEffect(() => {
    if (user?.direccion) {
      setShippingAddress(user.direccion);
    }
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  };

  const shippingCost = cartTotal >= 500000 ? 0 : 50000;
  const total = cartTotal + shippingCost;

  // ========== HANDLERS PARA INVITADO ==========
  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestData({
      ...guestData,
      crearCuenta: e.target.checked
    });
  };

  const validateGuestData = (): boolean => {
    if (!guestData.nombre.trim() || guestData.nombre.length < 3) {
      showToast('Por favor ingresa tu nombre completo (mín. 3 caracteres)', 'error');
      return false;
    }
    if (!guestData.email.trim() || !guestData.email.includes('@')) {
      showToast('Por favor ingresa un email válido', 'error');
      return false;
    }
    if (!guestData.telefono.trim() || guestData.telefono.length < 6) {
      showToast('Por favor ingresa un teléfono válido', 'error');
      return false;
    }
    if (!guestData.direccion.trim() || guestData.direccion.length < 10) {
      showToast('Por favor ingresa una dirección completa', 'error');
      return false;
    }
    if (guestData.crearCuenta && (!guestData.password || guestData.password.length < 6)) {
      showToast('La contraseña debe tener al menos 6 caracteres', 'error');
      return false;
    }
    return true;
  };

  const handleGuestCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateGuestData()) return;

    setLoading(true);

    try {
      // Simular creación de pedido (aquí llamarías a tu API)
      const orderData = {
        cliente: {
          tipo: 'invitado',
          nombre: guestData.nombre,
          email: guestData.email,
          telefono: guestData.telefono,
          direccion: guestData.direccion,
          notas: guestData.notas
        },
        items: cart.map(item => ({
          varianteId: item.varianteId,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total: total,
        metodoPago: paymentMethod,
        shippingCost: shippingCost
      };

      console.log('📦 Pedido de invitado:', orderData);

      // TODO: Llamar a API para crear pedido
      // const result = await orderService.createGuestOrder(orderData);

      // Si el usuario quiere crear cuenta
      if (guestData.crearCuenta && guestData.password) {
        try {
          // Crear cuenta con los datos del checkout
          // await authService.register(guestData.email, guestData.password, guestData.nombre);
          showToast('Cuenta creada exitosamente', 'success');
        } catch (error) {
          console.error('Error creando cuenta:', error);
          // No bloquear el pedido si falla el registro
        }
      }

      showToast(
        paymentMethod === 'contacto'
          ? '¡Pedido registrado! Nos contactaremos pronto'
          : '¡Pedido procesado exitosamente!',
        'success'
      );

      clearCart();
      
      // Redirigir a confirmación (con token temporal para invitados)
      setTimeout(() => {
        navigate('/orden/guest-' + Date.now());
      }, 1500);

    } catch (error: any) {
      console.error('❌ Error procesando pedido:', error);
      showToast(error.response?.data?.error || 'Error al procesar el pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ========== HANDLERS PARA LOGIN ==========
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(loginEmail, loginPassword);
      
      if (result.success) {
        showToast('Sesión iniciada correctamente', 'success');
        // El componente se re-renderizará automáticamente con usuario autenticado
      } else {
        showToast(result.message || 'Error al iniciar sesión', 'error');
      }
    } catch (error) {
      showToast('Error de conexión', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ========== HANDLER PARA USUARIO AUTENTICADO ==========
  const handleAuthenticatedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress.trim() || shippingAddress.length < 10) {
      showToast('Por favor ingresa una dirección de envío completa', 'error');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        cliente: {
          tipo: 'registrado',
          usuarioId: user?.id,
          nombre: user?.nombre,
          email: user?.email,
          telefono: user?.telefono,
          direccion: shippingAddress
        },
        items: cart.map(item => ({
          varianteId: item.varianteId,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total: total,
        metodoPago: paymentMethod,
        shippingCost: shippingCost
      };

      console.log('📦 Pedido de usuario autenticado:', orderData);

      // TODO: Llamar a API para crear pedido
      // const result = await orderService.createOrder(orderData);

      showToast('¡Pedido procesado exitosamente!', 'success');
      clearCart();
      
      setTimeout(() => {
        navigate('/orden/' + Date.now());
      }, 1500);

    } catch (error: any) {
      console.error('❌ Error procesando pedido:', error);
      showToast(error.response?.data?.error || 'Error al procesar el pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ========== RENDERIZADO ==========
  return (
    <div className="checkout-page">
      <div className="container">
        <h1>
          <ShoppingBag size={32} style={{ verticalAlign: 'middle', marginRight: '12px' }} />
          Finalizar Compra
        </h1>

        <div className="checkout-content">
          {/* COLUMNA IZQUIERDA: Formulario */}
          <div className="checkout-form">
            
            {!isAuthenticated ? (
              <>
                {/* TABS PARA ELEGIR MODO */}
                <div className="checkout-tabs">
                  <button
                    type="button"
                    className={`tab-button ${checkoutMode === 'guest' ? 'active' : ''}`}
                    onClick={() => setCheckoutMode('guest')}
                  >
                    🚀 Compra Rápida (sin registro)
                  </button>
                  <button
                    type="button"
                    className={`tab-button ${checkoutMode === 'login' ? 'active' : ''}`}
                    onClick={() => setCheckoutMode('login')}
                  >
                    👤 Tengo Cuenta
                  </button>
                </div>

                {/* FORMULARIO INVITADO */}
                {checkoutMode === 'guest' && (
                  <form onSubmit={handleGuestCheckout}>
                    <div className="form-section">
                      <h2>Tus Datos</h2>
                      <p className="section-subtitle">Completa tus datos para procesar el pedido</p>

                      <div className="form-group">
                        <label>
                          <User size={18} />
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={guestData.nombre}
                          onChange={handleGuestChange}
                          placeholder="Juan Pérez"
                          required
                          minLength={3}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <Mail size={18} />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={guestData.email}
                          onChange={handleGuestChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <Phone size={18} />
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={guestData.telefono}
                          onChange={handleGuestChange}
                          placeholder="+595 xxx xxx xxx"
                          required
                          minLength={6}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <MapPin size={18} />
                          Dirección de entrega *
                        </label>
                        <textarea
                          name="direccion"
                          value={guestData.direccion}
                          onChange={handleGuestChange}
                          placeholder="Calle, número, barrio, referencias..."
                          required
                          rows={3}
                          minLength={10}
                        />
                      </div>

                      <div className="form-group">
                        <label>Notas adicionales (opcional)</label>
                        <textarea
                          name="notas"
                          value={guestData.notas}
                          onChange={handleGuestChange}
                          placeholder="Instrucciones especiales para la entrega..."
                          rows={2}
                        />
                      </div>

                      {/* Opción de crear cuenta */}
                      <div className="create-account-option">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={guestData.crearCuenta}
                            onChange={handleCheckboxChange}
                          />
                          <span>✨ Crear cuenta para hacer seguimiento del pedido</span>
                        </label>

                        {guestData.crearCuenta && (
                          <div className="form-group" style={{ marginTop: '12px' }}>
                            <label>
                              <Lock size={18} />
                              Contraseña (mín. 6 caracteres)
                            </label>
                            <input
                              type="password"
                              name="password"
                              value={guestData.password}
                              onChange={handleGuestChange}
                              placeholder="••••••••"
                              minLength={6}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Método de pago para invitados */}
                    <div className="form-section">
                      <h2>Método de Pago</h2>
                      <div className="payment-methods">
                        <label className="payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value="contacto"
                            checked={paymentMethod === 'contacto'}
                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                          />
                          <span>📞 Nos contactamos contigo (Recomendado)</span>
                        </label>
                        <label className="payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value="efectivo"
                            checked={paymentMethod === 'efectivo'}
                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                          />
                          <span>💵 Pago contra entrega</span>
                        </label>
                      </div>

                      {paymentMethod === 'contacto' && (
                        <div className="info-box">
                          <p>💡 <strong>¿Cómo funciona?</strong></p>
                          <p>Registraremos tu pedido y nos comunicaremos contigo dentro de las próximas 24 horas para coordinar el pago y la entrega.</p>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn-primary btn-block" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader size={20} className="spinner" />
                          Procesando...
                        </>
                      ) : (
                        paymentMethod === 'contacto' ? 'Enviar Pedido' : 'Confirmar Pedido'
                      )}
                    </button>
                  </form>
                )}

                {/* FORMULARIO LOGIN */}
                {checkoutMode === 'login' && (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-section">
                      <h2>Inicia Sesión</h2>
                      <p className="section-subtitle">Accede a tu cuenta para un checkout más rápido</p>

                      <div className="form-group">
                        <label>
                          <Mail size={18} />
                          Email
                        </label>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <Lock size={18} />
                          Contraseña
                        </label>
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <button type="submit" className="btn-primary btn-block" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader size={20} className="spinner" />
                            Iniciando...
                          </>
                        ) : (
                          'Iniciar Sesión'
                        )}
                      </button>

                      <p className="text-center" style={{ marginTop: '16px', fontSize: '0.9rem' }}>
                        ¿No tienes cuenta? <button type="button" onClick={() => navigate('/register')} className="link-button">Regístrate aquí</button>
                      </p>
                    </div>
                  </form>
                )}
              </>
            ) : (
              /* FORMULARIO USUARIO AUTENTICADO */
              <form onSubmit={handleAuthenticatedCheckout}>
                <div className="form-section">
                  <h2>Información de Envío</h2>

                  <div className="user-info-display">
                    <p><strong>Nombre:</strong> {user?.nombre}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Teléfono:</strong> {user?.telefono || 'No registrado'}</p>
                  </div>

                  <div className="form-group">
                    <label>
                      <MapPin size={18} />
                      Dirección de Envío *
                    </label>
                    <textarea
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Calle, número, ciudad, referencias..."
                      required
                      rows={3}
                      minLength={10}
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
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                      />
                      <span>💵 Efectivo contra entrega</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="transferencia"
                        checked={paymentMethod === 'transferencia'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                      />
                      <span>🏦 Transferencia bancaria</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="tarjeta"
                        checked={paymentMethod === 'tarjeta'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                      />
                      <span>💳 Tarjeta de crédito/débito</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary btn-block" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader size={20} className="spinner" />
                      Procesando...
                    </>
                  ) : (
                    'Confirmar Pedido'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* COLUMNA DERECHA: Resumen */}
          <div className="checkout-summary">
            <h2>Resumen del Pedido</h2>

            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="order-item-info">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {item.cantidad}</p>
                  </div>
                  <div className="order-item-price">
                    {formatPrice(item.subtotal)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubTotal)}</span>
              </div>
                 { cartImporteDescuento > 0 && (
                <div className="summary-row">
                    <span>Descuento</span>
                <span>-{formatPrice(cartImporteDescuento)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Envío</span>
                <span>{shippingCost === 0 ? '🎉 Gratis' : formatPrice(shippingCost)}</span>
              </div>
                {shippingCost > 0 && (
                <p className="free-shipping-notice">
                  💡 Envío gratis en compras desde {formatPrice(100000)}
                </p>
              )}  


              
              
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="secure-badge">
              🔒 Compra segura y protegida
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;