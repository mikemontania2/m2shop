import React from "react"
import { useApp } from "../contexts/AppContext"
import DepartmentsMenu from "./DepartmentsMenu"
import HeaderLogo from "./header/HeaderLogo"
import SearchBar from "./header/SearchBar"
import HeaderUser from "./header/HeaderUser"
import CartButton from "./header/CartButton"
import MobileSearchBar from "./header/MobileSearchBar"

const Header: React.FC = () => {
  // 🎯 Obtener categorías directamente del contexto global
  // Ya NO necesitamos useState ni useEffect aquí
  const { categories, categoriesLoading } = useApp()

  return (
    <>
      <header className="header">
        <div className="header-main">
          <div className="container">
            <div className="header-main-content">
              <div className="header-left">
                <HeaderLogo />
                {/* Solo mostrar el menú cuando las categorías ya están cargadas */}
                {!categoriesLoading && <DepartmentsMenu categories={categories} />}
              </div>

              <SearchBar />

              <div className="header-actions">
                <HeaderUser />
                <CartButton />
              </div>
            </div>
          </div>
        </div>

        <div className="header-mobile-line2">
          <div className="container">
            <HeaderLogo />
            <HeaderUser />
          </div>
        </div>
      </header>
            
      <MobileSearchBar />
    </>
  )
}

export default Header