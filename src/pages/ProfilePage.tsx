"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../contexts/AppContext" 
import orderService from "../services/orderService"
import { UserIcon, Phone, MapPin, FileText, Save, CreditCard, List, Plus, Trash2 } from "lucide-react"
import addressService, { type Address } from "../services/address.service"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import type L from "leaflet"
import "../styles/profile.css"
import authService from "../services/auth.service"
import cardService, { Card } from "../services/card.service"
 
const ProfilePage: React.FC = () => {
  const { user } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"datos" | "direcciones" | "tarjetas" | "pedidos">("datos")

  // Datos personales
  const [name, setName] = useState(user?.nombre || "")
  const [phone, setPhone] = useState(user?.telefono || "")
  const [address, setAddress] = useState(user?.direccion || "")
  const [documentType, setDocumentType] = useState<"ci" | "ruc" | "ninguno">(user?.tipoDocumento || "ninguno")
  const [documentNumber, setDocumentNumber] = useState(user?.documento || "")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [userOrders, setUserOrders] = useState(orderService.getOrdersByUser(user?.id || 0))

  // Direcciones
  const [addresses, setAddresses] = useState<Address[]>([])
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [loadingAddresses, setLoadingAddresses] = useState(false)

  // Tarjetas
  const [cards, setCards] = useState<Card[]>([])
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [loadingCards, setLoadingCards] = useState(false)

  // Cargar direcciones al montar o cambiar de usuario
  useEffect(() => {
    if (user && activeTab === 'direcciones') {
      loadAddresses()
    }
  }, [user, activeTab])

  // Cargar tarjetas al montar o cambiar de usuario
  useEffect(() => {
    if (user && activeTab === 'tarjetas') {
      loadCards()
    }
  }, [user, activeTab])

  // Cargar pedidos
  useEffect(() => {
    if (user) {
      setUserOrders(orderService.getOrdersByUser(user.id))
    }
  }, [user])

  // 🔹 FUNCIÓN PARA CARGAR DIRECCIONES
  const loadAddresses = async () => {
    if (!user) return
    setLoadingAddresses(true)
    try {
      const data = await addressService.getByUser(user.id)
      setAddresses(data)
    } catch (error) {
      console.error('Error cargando direcciones:', error)
    } finally {
      setLoadingAddresses(false)
    }
  }

  // 🔹 FUNCIÓN PARA CARGAR TARJETAS
  const loadCards = async () => {
    if (!user) return
    setLoadingCards(true)
    try {
      const data = await cardService.getByUser(user.id)
      setCards(data)
    } catch (error) {
      console.error('Error cargando tarjetas:', error)
    } finally {
      setLoadingCards(false)
    }
  }

  // 🔹 GUARDAR DIRECCIÓN
  const handleSaveAddress = async () => {
    if (!editingAddress) return
    
    try {
      await addressService.upsert(editingAddress)
      await loadAddresses() // Recargar lista
      setEditingAddress(null)
      setSuccess('Dirección guardada exitosamente')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al guardar la dirección')
      setTimeout(() => setError(''), 3000)
    }
  }

  // 🔹 ELIMINAR DIRECCIÓN
  const handleDeleteAddress = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta dirección?')) return
    
    try {
      await addressService.delete(id)
      await loadAddresses()
      setSuccess('Dirección eliminada exitosamente')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al eliminar la dirección')
      setTimeout(() => setError(''), 3000)
    }
  }

  // 🔹 GUARDAR TARJETA
  const handleSaveCard = async () => {
    if (!editingCard) return
    
    try {
      await cardService.upsert(editingCard)
      await loadCards() // Recargar lista
      setEditingCard(null)
      setSuccess('Tarjeta guardada exitosamente')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al guardar la tarjeta')
      setTimeout(() => setError(''), 3000)
    }
  }

  // 🔹 ELIMINAR TARJETA
  const handleDeleteCard = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta tarjeta?')) return
    
    try {
      await cardService.delete(id)
      await loadCards()
      setSuccess('Tarjeta eliminada exitosamente')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al eliminar la tarjeta')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const result = await authService.updateProfile({
        nombre: name,
        telefono: phone,
        direccion: address,
        tipoDocumento: documentType === 'ninguno' ? 'ninguno' : documentType,
        documento: documentType === "ninguno" ? "" : documentNumber,
      })

      if (result.success) {
        setSuccess("Perfil actualizado correctamente")
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setError(result.message || "Error al actualizar el perfil")
      }
    } catch (error) {
      setError("Error de conexión")
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.numeroFormat("es-PY", {
      style: "currency",
      currency: "PYG",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-error">
            <h2>Debes iniciar sesión</h2>
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Mi Perfil</h1>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          <aside className="profile-tabs">
            <ul>
              <li>
                <button className={`${activeTab === "datos" ? "active" : ""}`} onClick={() => setActiveTab("datos")}>
                  <UserIcon size={18} /> Mis Datos
                </button>
              </li>
              <li>
                <button
                  className={`${activeTab === "direcciones" ? "active" : ""}`}
                  onClick={() => setActiveTab("direcciones")}
                >
                  <MapPin size={18} /> Mis Direcciones
                </button>
              </li>
              <li>
                <button
                  className={`${activeTab === "tarjetas" ? "active" : ""}`}
                  onClick={() => setActiveTab("tarjetas")}
                >
                  <CreditCard size={18} /> Mis Tarjetas
                </button>
              </li>
              <li>
                <button
                  className={`${activeTab === "pedidos" ? "active" : ""}`}
                  onClick={() => setActiveTab("pedidos")}
                >
                  <List size={18} /> Mis Pedidos
                </button>
              </li>
            </ul>
          </aside>

          <div className="profile-form-section">
            {activeTab === "datos" && (
              <>
                <h2>Información Personal</h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>
                      <UserIcon size={20} />
                      Nombre Completo
                    </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>
                      <Phone size={20} />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0981234567"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <MapPin size={20} />
                      Dirección
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Tu dirección completa"
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FileText size={20} />
                      Tipo de Documento
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value as "ci" | "ruc" | "ninguno")}
                    >
                      <option value="none">Prefiero no dar información</option>
                      <option value="ci">Cédula de Identidad</option>
                      <option value="ruc">RUC</option>
                    </select>
                  </div>

                  {documentType !== "ninguno" && (
                    <div className="form-group">
                      <label>
                        <FileText size={20} />
                        Número de Documento
                      </label>
                      <input
                        type="text"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        placeholder="Número de documento"
                      />
                    </div>
                  )}

                  <button type="submit" className="btn-primary">
                    <Save size={20} />
                    Guardar Cambios
                  </button>
                </form>
              </>
            )}

            {activeTab === "direcciones" && (
              <>
                <h2>Mis Direcciones</h2>
                <div style={{ marginBottom: 12 }}>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      setEditingAddress({
                        id: "addr-" + Date.now(),
                        userId: user.id,
                        calle: "",
                        number: "",
                        transversal: "",
                        ciudad: "",
                        barrio: "",
                        referencia: "",
                        lat: -25.2969,
                        lng: -57.6244,
                      })
                    }
                  >
                    <Plus size={16} /> Agregar nueva dirección
                  </button>
                </div>

                {editingAddress && (
                  <div className="admin-panel" style={{ marginBottom: 12 }}>
                    <div className="form-grid">
                      <label>
                        Calle
                        <input
                          value={editingAddress.calle}
                          onChange={(e) => setEditingAddress({ ...editingAddress, calle: e.target.value })}
                        />
                      </label>
                      <label>
                        Número
                        <input
                          value={editingAddress.numero}
                          onChange={(e) => setEditingAddress({ ...editingAddress, numero: e.target.value })}
                        />
                      </label>
                      <label>
                        Transversal
                        <input
                          value={editingAddress.transversal}
                          onChange={(e) => setEditingAddress({ ...editingAddress, transversal: e.target.value })}
                        />
                      </label>
                      <label>
                        Localidad
                        <input
                          value={editingAddress.ciudad}
                          onChange={(e) => setEditingAddress({ ...editingAddress, ciudad: e.target.value })}
                        />
                      </label>
                      <label>
                        Barrio
                        <input
                          value={editingAddress.barrio}
                          onChange={(e) => setEditingAddress({ ...editingAddress, barrio: e.target.value })}
                        />
                      </label>
                      <label>
                        Referencias
                        <input
                          value={editingAddress.referencia}
                          onChange={(e) => setEditingAddress({ ...editingAddress, referencia: e.target.value })}
                        />
                      </label>
                    </div>
                    <p style={{ margin: "10px 0" }}>Ubique su dirección en el mapa</p>
                    <div style={{ height: 300, borderRadius: 8, overflow: "hidden" }}>
                      <MapContainer
                        center={[editingAddress.lat || -25.2969, editingAddress.lng || -57.6244]}
                        zoom={14}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.opencallemap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={[editingAddress.lat || -25.2969, editingAddress.lng || -57.6244]}
                          draggable
                          eventHandlers={{
                            dragend: (e) => {
                              const m = e.target as L.Marker
                              const pos = m.getLatLng()
                              setEditingAddress({ ...editingAddress, lat: pos.lat, lng: pos.lng })
                            },
                          }}
                        />
                      </MapContainer>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <button className="btn-primary" onClick={handleSaveAddress}>
                        Guardar
                      </button>
                      <button className="btn-secondary" onClick={() => setEditingAddress(null)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {loadingAddresses ? (
                  <p>Cargando direcciones...</p>
                ) : (
                  <div className="orders-list">
                    {addresses.length === 0 ? (
                      <p>No tienes direcciones guardadas</p>
                    ) : (
                      addresses.map((a) => (
                        <div
                          key={a.id}
                          className="order-card"
                          style={{ display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 8 }}
                        >
                          <div>
                            <strong>
                              {a.calle} {a.numero}
                            </strong>
                            <br />
                            {a.barrio}, {a.ciudad}
                            <br />
                            {a.referencia}
                          </div>
                          <button className="btn-secondary" onClick={() => setEditingAddress(a)}>
                            Editar
                          </button>
                          <button className="btn-secondary" onClick={() => handleDeleteAddress(a.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}

            {activeTab === "tarjetas" && (
              <>
                <h2>Mis Tarjetas</h2>
                <div style={{ marginBottom: 12 }}>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      setEditingCard({
                        id: "card-" + Date.now(),
                        userId: user.id,
                        holder: "",
                        last4: "",
                        brand: "",
                        expMonth: 1,
                        expYear: new Date().getFullYear(),
                      })
                    }
                  >
                    <Plus size={16} /> Agregar tarjeta
                  </button>
                </div>

                {editingCard && (
                  <div className="admin-panel" style={{ marginBottom: 12 }}>
                    <div className="form-grid">
                      <label>
                        Nombre en la tarjeta
                        <input
                          value={editingCard.holder}
                          onChange={(e) => setEditingCard({ ...editingCard, holder: e.target.value })}
                        />
                      </label>
                      <label>
                        Marca
                        <input
                          value={editingCard.brand}
                          onChange={(e) => setEditingCard({ ...editingCard, brand: e.target.value })}
                          placeholder="Visa / MasterCard"
                        />
                      </label>
                      <label>
                        Últimos 4
                        <input
                          value={editingCard.last4}
                          onChange={(e) => setEditingCard({ ...editingCard, last4: e.target.value.slice(0, 4) })}
                        />
                      </label>
                      <label>
                        Vencimiento (MM)
                        <input
                          type="number"
                          value={editingCard.expMonth}
                          onChange={(e) =>
                            setEditingCard({ ...editingCard, expMonth: Number.parseInt(e.target.value) || 1 })
                          }
                        />
                      </label>
                      <label>
                        Vencimiento (YYYY)
                        <input
                          type="number"
                          value={editingCard.expYear}
                          onChange={(e) =>
                            setEditingCard({
                              ...editingCard,
                              expYear: Number.parseInt(e.target.value) || new Date().getFullYear(),
                            })
                          }
                        />
                      </label>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <button className="btn-primary" onClick={handleSaveCard}>
                        Guardar
                      </button>
                      <button className="btn-secondary" onClick={() => setEditingCard(null)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {loadingCards ? (
                  <p>Cargando tarjetas...</p>
                ) : (
                  <div className="orders-list">
                    {cards.length === 0 ? (
                      <p>No tienes tarjetas guardadas</p>
                    ) : (
                      cards.map((c) => (
                        <div
                          key={c.id}
                          className="order-card"
                          style={{ display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 8 }}
                        >
                          <div>
                            <strong>{c.brand}</strong> •••• {c.last4}
                            <br />
                            <small>Vence: {c.expMonth.toString().padStart(2, '0')}/{c.expYear}</small>
                          </div>
                          <button className="btn-secondary" onClick={() => setEditingCard(c)}>
                            Editar
                          </button>
                          <button className="btn-secondary" onClick={() => handleDeleteCard(c.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}

            {activeTab === "pedidos" && (
              <>
                <h2>Mis Pedidos</h2>
                {userOrders.length === 0 ? (
                  <div className="empty-orders">
                    <p>No tienes pedidos aún</p>
                    <button className="btn-primary" onClick={() => navigate("/")}>
                      Ir a Comprar
                    </button>
                  </div>
                ) : (
                  <div className="orders-list">
                    {userOrders.map((order:any) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <h3>Pedido #{order.id}</h3>
                          <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                        <p className="order-date">{formatDate(order.date)}</p>
                        <p className="order-total">Total: {formatPrice(order.total)}</p>
                        <p className="order-items-count">
                          {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                        </p>
                        <button className="btn-secondary" onClick={() => navigate(`/orden/${order.id}`)}>
                          Ver Detalles
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage