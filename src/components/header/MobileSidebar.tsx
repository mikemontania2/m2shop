"use client"

import type React from "react"
import { MapPin, Phone, LogOut, User, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../../contexts/AppContext"
import type { Category } from "../../services/productService"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, categories }) => {
  const navigate = useNavigate()
  const { user, logout } = useApp()

  if (!isOpen) return null

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/${categoryId}`)
    onClose()
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    onClose()
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    onClose()
  }

  return (
    <div className="mobile-sidebar-overlay" onClick={onClose}>
      <div className="mobile-sidebar-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header with Logo and Close Button */}
        <div className="mobile-sidebar-header">
          <div className="sidebar-logo" onClick={() => handleNavigation("/")}>
            <img src="https://www.cavallaro.com.py/img/logo-web-blanco.png" alt="Cavallaro" />
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Cerrar menú">
            <X size={24} />
          </button>
        </div>

        {/* User Section */}
        <div className="mobile-sidebar-user">
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                <User size={24} />
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <button className="user-profile-link" onClick={() => handleNavigation("/profile")}>
                  Ver perfil
                </button>
              </div>
            </div>
          ) : (
            <div className="user-auth-buttons">
              <button className="btn-auth btn-login" onClick={() => handleNavigation("/login")}>
                Iniciar Sesión
              </button>
              <button className="btn-auth btn-register" onClick={() => handleNavigation("/register")}>
                Registrarse
              </button>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mobile-sidebar-section">
          <h3 className="sidebar-section-title">Categorías</h3>
          <ul className="sidebar-category-list">
            {categories.map((category) => (
              <li key={category.id}>
                <button className="sidebar-category-item" onClick={() => handleCategoryClick(category.id)}>
                  {category.name}
                </button>
              </li>
            ))}
            <li>
              <button className="sidebar-category-item" onClick={() => handleNavigation("/la-empresa")}>
                LA EMPRESA
              </button>
            </li>
          </ul>
        </div>

        {/* Info Section */}
        <div className="mobile-sidebar-section">
          <h3 className="sidebar-section-title">Información</h3>
          <ul className="sidebar-info-list">
            <li>
              <button className="sidebar-info-item" onClick={() => handleNavigation("/mapa-de-cobertura")}>
                <MapPin size={18} />
                <span>Área de cobertura</span>
              </button>
            </li>
            <li>
              <a className="sidebar-info-item" href="tel:595215889000">
                <Phone size={18} />
                <span>+595 21 588 9000</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Logout Section */}
        {user && (
          <div className="mobile-sidebar-footer">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileSidebar
